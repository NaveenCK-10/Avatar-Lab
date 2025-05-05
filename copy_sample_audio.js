const fs = require('fs');
const path = require('path');

// Source and destination paths
const sourcePath = path.join(__dirname, 'Avatar_Lab frontend', 'public', 'assets', 'audio', 'demo1_audio.wav');
const destPath = path.join(__dirname, 'avatar_lab backend', 'assets', 'default_speaker.wav');

// Create the assets directory if it doesn't exist
const assetsDir = path.join(__dirname, 'avatar_lab backend', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
  console.log(`Created directory: ${assetsDir}`);
}

// Copy the file
try {
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Successfully copied sample audio from ${sourcePath} to ${destPath}`);
} catch (error) {
  console.error(`Error copying file: ${error.message}`);
  
  // If the source file doesn't exist, create a placeholder file
  if (error.code === 'ENOENT') {
    try {
      // Check if any audio file exists in the public/assets/audio directory
      const audioDir = path.join(__dirname, 'Avatar_Lab frontend', 'public', 'assets', 'audio');
      if (fs.existsSync(audioDir)) {
        const files = fs.readdirSync(audioDir);
        const audioFiles = files.filter(file => file.endsWith('.wav') || file.endsWith('.mp3'));
        
        if (audioFiles.length > 0) {
          const alternativeSource = path.join(audioDir, audioFiles[0]);
          fs.copyFileSync(alternativeSource, destPath);
          console.log(`Used alternative audio file: ${alternativeSource}`);
        } else {
          throw new Error('No audio files found in the assets directory');
        }
      } else {
        throw new Error('Audio directory not found');
      }
    } catch (innerError) {
      console.error(`Could not find any audio files: ${innerError.message}`);
      console.log('Creating an empty audio file as a placeholder');
      
      // Create an empty file as a placeholder
      fs.writeFileSync(destPath, '');
      console.log(`Created empty placeholder file at ${destPath}`);
      console.log('WARNING: You need to replace this with a real audio file for the TTS to work properly');
    }
  }
}