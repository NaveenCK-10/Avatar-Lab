# Avatar Lab - Talking Head Generation

This project integrates Zonos TTS (Text-to-Speech) and LatentSync (Lip Sync) APIs to generate talking head videos from text input.

## Project Structure

- `avatar_lab backend/` - Node.js backend server
- `Avatar_Lab frontend/` - React frontend application
- `avatar_lab backend/TTS_api/` - Zonos TTS API (Python/Flask)
- `avatar_lab backend/LatentSync/` - LatentSync API (Python/Flask)

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd "avatar_lab backend"

# Install dependencies
npm install

# Create necessary directories
mkdir -p assets outputs tmp uploads

# Copy a default speaker audio file
# You can use any WAV file as a reference for the TTS voice
cp "TTS_api/outputs/d402c132-863a-4b0e-b421-8be9e6554473.wav" "assets/default_speaker.wav"
```

> **Important**: The TTS system requires a reference audio file to clone the voice. Make sure you have a valid WAV file in the `assets/default_speaker.wav` location or specify a custom path when making API calls.

### 2. TTS API Setup

```bash
# Navigate to TTS API directory
cd "avatar_lab backend/TTS_api"

# Install Python dependencies
pip install -r requirements.txt

# Start the TTS API server
python app.py
```

### 3. LatentSync API Setup

```bash
# Navigate to LatentSync API directory
cd "avatar_lab backend/LatentSync"

# Start the LatentSync API server
python api/app.py
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd "Avatar_Lab frontend"

# Install dependencies
npm install
```

## Running the Application

### 1. Start the Backend Server

```bash
# Navigate to backend directory
cd "avatar_lab backend"

# Start the server
npm start
```

### 2. Start the Frontend Development Server

```bash
# Navigate to frontend directory
cd "Avatar_Lab frontend"

# Start the development server
npm start
```

## API Endpoints

### Backend API (Node.js)

- `POST /api/tts` - Generate speech from text
- `POST /api/latentsync/latentsync` - Generate lip-synced video

### TTS API (Flask)

- `POST /api/generate_speech` - Generate speech from text

### LatentSync API (Flask)

- `POST /api/lipsync` - Generate lip-synced video from image and audio

## Environment Variables

### Backend (.env)

```
TTS_API_URL=http://localhost:8000
LATENTSYNC_API_URL=http://localhost:6900
DEFAULT_SPEAKER_AUDIO=./assets/default_speaker.wav
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_TTS_API_URL=http://localhost:8000
REACT_APP_LATENTSYNC_API_URL=http://localhost:6900
```

## Workflow

1. User selects a template image and enters text
2. Text is sent to TTS API to generate speech audio
3. Template image and speech audio are sent to LatentSync API
4. LatentSync generates a lip-synced video
5. Video is displayed to the user

## Troubleshooting

- Ensure all servers are running on the correct ports
- Check the console for error messages
- Verify that the environment variables are set correctly
- Make sure the necessary directories exist and are writable