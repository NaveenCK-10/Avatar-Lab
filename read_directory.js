const fs = require('fs');
const path = require('path');

// Statistics tracking
const stats = {
  totalFiles: 0,
  totalDirectories: 0,
  totalSize: 0,
  filesByExtension: {},
  errors: 0
};

// Binary file extensions that should be skipped for content display
const binaryExtensions = [
  '.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.ico', '.webp',
  '.mp3', '.wav', '.ogg', '.mp4', '.avi', '.mov', '.wmv', '.flv',
  '.zip', '.tar', '.gz', '.rar', '.7z', '.exe', '.dll', '.so', '.dylib',
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'
];

// Function to check if a file is likely binary based on extension
function isBinaryFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return binaryExtensions.includes(ext);
}

// Function to get file size in human-readable format
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  const bytes = stats.size;
  
  if (bytes < 1024) return bytes + ' bytes';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  else return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
}

// Function to read all files in a directory
function readAllFiles(directoryPath, options = {}) {
  const { recursive = false, filter = null, maxDepth = Infinity, currentDepth = 0 } = options;
  
  try {
    // Check if the directory exists
    if (!fs.existsSync(directoryPath)) {
      console.error(`Directory does not exist: ${directoryPath}`);
      process.exit(1);
    }

    // Get all files in the directory
    const items = fs.readdirSync(directoryPath);
    
    console.log(`\nReading directory: ${directoryPath} (${items.length} items)`);
    
    // Process each item (file or directory)
    items.forEach(item => {
      const itemPath = path.join(directoryPath, item);
      
      try {
        const itemStats = fs.statSync(itemPath);
        
        if (itemStats.isFile()) {
          stats.totalFiles++;
          stats.totalSize += itemStats.size;
          
          // Track file extensions
          const ext = path.extname(item).toLowerCase() || '(no extension)';
          stats.filesByExtension[ext] = (stats.filesByExtension[ext] || 0) + 1;
          
          // Check if file matches filter
          if (filter && !item.match(filter)) {
            return;
          }
          
          // Display file info
          const fileSize = getFileSize(itemPath);
          console.log(`\n===== File: ${item} (${fileSize}) =====`);
          
          // Read and display file content if not binary
          if (!isBinaryFile(itemPath)) {
            try {
              const content = fs.readFileSync(itemPath, 'utf8');
              console.log(content);
            } catch (err) {
              console.error(`Error reading file content: ${err.message}`);
              stats.errors++;
            }
          } else {
            console.log(`[Binary file - content not displayed]`);
          }
          
          console.log(`===== End of ${item} =====\n`);
        }
        else if (itemStats.isDirectory()) {
          stats.totalDirectories++;
          
          console.log(`\n${item}/ is a directory`);
          
          // Recursively process subdirectories if enabled and not at max depth
          if (recursive && currentDepth < maxDepth) {
            readAllFiles(itemPath, {
              recursive,
              filter,
              maxDepth,
              currentDepth: currentDepth + 1
            });
          }
        }
      } catch (err) {
        console.error(`Error processing ${item}: ${err.message}`);
        stats.errors++;
      }
    });
    
  } catch (err) {
    console.error(`Error reading directory: ${err.message}`);
    stats.errors++;
    if (currentDepth === 0) process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
let directoryPath = '.';
let recursive = false;
let filter = null;
let maxDepth = Infinity;

// Simple argument parsing
for (let i = 0; i < args.length; i++) {
  if (args[i] === '-r' || args[i] === '--recursive') {
    recursive = true;
  }
  else if (args[i] === '--depth' && i + 1 < args.length) {
    maxDepth = parseInt(args[i + 1], 10);
    i++;
  }
  else if (args[i] === '--filter' && i + 1 < args.length) {
    filter = new RegExp(args[i + 1]);
    i++;
  }
  else if (!args[i].startsWith('-')) {
    directoryPath = args[i];
  }
}

// Display usage information if requested
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node read_directory.js [options] [directory_path]

Options:
  -r, --recursive       Read files recursively in subdirectories
  --depth <number>      Maximum depth for recursive reading
  --filter <pattern>    Only include files matching the regex pattern
  -h, --help            Display this help message

Examples:
  node read_directory.js                     # Read current directory
  node read_directory.js ./src               # Read the src directory
  node read_directory.js -r ./src            # Read src directory recursively
  node read_directory.js --filter "\\.js$"   # Only read JavaScript files
  node read_directory.js -r --depth 2 ./src  # Recursive with max depth of 2
  `);
  process.exit(0);
}

console.log(`Reading files in ${directoryPath}${recursive ? ' recursively' : ''}`);
if (filter) console.log(`Filtering files by: ${filter}`);
if (maxDepth !== Infinity) console.log(`Maximum depth: ${maxDepth}`);

// Call the function to read all files
readAllFiles(directoryPath, { recursive, filter, maxDepth });

// Print summary statistics
console.log('\n===== SUMMARY =====');
console.log(`Total files: ${stats.totalFiles}`);
console.log(`Total directories: ${stats.totalDirectories}`);
console.log(`Total size: ${(stats.totalSize / (1024 * 1024)).toFixed(2)} MB`);
console.log('\nFiles by extension:');
Object.entries(stats.filesByExtension)
  .sort((a, b) => b[1] - a[1])
  .forEach(([ext, count]) => {
    console.log(`  ${ext}: ${count} files`);
  });
console.log(`\nErrors encountered: ${stats.errors}`);