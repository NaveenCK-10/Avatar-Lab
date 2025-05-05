import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { Mic, MicOff, Film, Upload, Check, ChevronDown, Clock, Wand2 } from 'lucide-react';
import Loader from '../components/ui/Loader';

// Mock template data
const audioTemplates = [
  { id: 'happy', name: 'Happy', description: 'Cheerful and upbeat tone' },
  { id: 'professional', name: 'Professional', description: 'Clear, neutral business tone' },
  { id: 'friendly', name: 'Friendly', description: 'Warm and approachable tone' },
  { id: 'excited', name: 'Excited', description: 'Enthusiastic and energetic' },
  { id: 'calm', name: 'Calm', description: 'Peaceful and soothing tone' },
  { id: 'sad', name: 'Sad', description: 'Melancholic and emotional tone' },
];

const imageTemplates = [
  { 
    id: 'avatar1', 
    name: 'Professional Woman', 
    gender: 'female',
    imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  { 
    id: 'avatar2', 
    name: 'Business Man', 
    gender: 'male',
    imageUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800' 
  },
  { 
    id: 'avatar3', 
    name: 'Casual Woman', 
    gender: 'female',
    imageUrl: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800' 
  },
  { 
    id: 'avatar4', 
    name: 'Casual Man', 
    gender: 'male',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800' 
  },
  { 
    id: 'avatar5', 
    name: 'Creative Woman', 
    gender: 'female',
    imageUrl: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=800' 
  },
  { 
    id: 'avatar6', 
    name: 'Creative Man', 
    gender: 'male',
    imageUrl: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=800' 
  },
];

const backgroundTemplates = [
  { id: 'office', name: 'Office', imageUrl: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'studio', name: 'Studio', imageUrl: 'https://images.pexels.com/photos/1092364/pexels-photo-1092364.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'nature', name: 'Nature', imageUrl: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'gradient', name: 'Gradient', imageUrl: 'https://images.pexels.com/photos/4100130/pexels-photo-4100130.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

enum InputType {
  TEXT = 'text',
  AUDIO = 'audio',
}

enum GenerationStage {
  IDLE = 'idle',
  PROCESSING_TTS = 'processing_tts',
  PROCESSING_AVATAR = 'processing_avatar',
  FINALIZING = 'finalizing',
  COMPLETED = 'completed',
  ERROR = 'error',
}

const GenerateAvatar: React.FC = () => {
  const navigate = useNavigate();
  const [inputType, setInputType] = useState<InputType>(InputType.TEXT);
  const [textInput, setTextInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedAudioTemplate, setSelectedAudioTemplate] = useState<string | null>(null);
  
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  
  const [generationStage, setGenerationStage] = useState<GenerationStage>(GenerationStage.IDLE);
  const [generationProgress, setGenerationProgress] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  useEffect(() => {
    document.title = 'Generate Avatar - Avatar Lab';
  }, []);

  // Clean up audio URL when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);
  
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setRecordedAudio(audioBlob);
        
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Stop all tracks after recording
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check your permissions.');
    }
  };
  
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        setAudioUrl(url);
        setRecordedAudio(file);
      } else {
        alert('Please upload an audio file');
      }
    }
  };
  
  const handleGenerate = () => {
    // Validation
    if (inputType === InputType.TEXT && !textInput.trim()) {
      alert('Please enter some text for your avatar to speak');
      return;
    }
    
    if (inputType === InputType.AUDIO && !recordedAudio) {
      alert('Please record or upload audio');
      return;
    }
    
    if (!selectedAvatar) {
      alert('Please select an avatar template');
      return;
    }
    
    if (!selectedBackground) {
      alert('Please select a background');
      return;
    }
    
    // Start generation process
    setGenerationStage(GenerationStage.PROCESSING_TTS);
    
    // Simulate generation process
    const simulateProgress = () => {
      let progress = 0;
      
      const interval = setInterval(() => {
        progress += 5;
        setGenerationProgress(progress);
        
        if (progress === 30) {
          setGenerationStage(GenerationStage.PROCESSING_AVATAR);
        } else if (progress === 70) {
          setGenerationStage(GenerationStage.FINALIZING);
        } else if (progress >= 100) {
          clearInterval(interval);
          setGenerationStage(GenerationStage.COMPLETED);
          
          // Navigate to result page after completion
          setTimeout(() => {
            navigate('/result/new');
          }, 1500);
        }
      }, 300);
    };
    
    simulateProgress();
  };
  
  const filteredAvatars = genderFilter === 'all' 
    ? imageTemplates 
    : imageTemplates.filter(avatar => avatar.gender === genderFilter);
  
  const renderInputSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Step 1: Add Voice Input
      </h2>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setInputType(InputType.TEXT)}
          className={`flex-1 py-2 rounded-lg ${
            inputType === InputType.TEXT 
              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Text to Speech
        </button>
        <button
          onClick={() => setInputType(InputType.AUDIO)}
          className={`flex-1 py-2 rounded-lg ${
            inputType === InputType.AUDIO 
              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Audio Upload/Record
        </button>
      </div>
      
      {inputType === InputType.TEXT ? (
        <div>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter the text you want your avatar to speak..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white h-32 resize-none"
          />
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Voice Emotion
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {audioTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedAudioTemplate(template.id)}
                  className={`p-3 rounded-lg border text-left ${
                    selectedAudioTemplate === template.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {template.name}
                    </span>
                    {selectedAudioTemplate === template.id && (
                      <Check size={16} className="text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {template.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {audioUrl ? (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Audio Preview:
                </span>
                <button
                  onClick={() => {
                    setAudioUrl(null);
                    setRecordedAudio(null);
                  }}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                >
                  Remove
                </button>
              </div>
              <audio controls className="w-full">
                <source src={audioUrl} />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`flex-1 py-3 rounded-lg flex items-center justify-center ${
                  isRecording 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff size={20} className="mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic size={20} className="mr-2" />
                    Start Recording
                  </>
                )}
              </button>
              
              <label className="flex-1">
                <div className="w-full py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Upload size={20} className="mr-2" />
                  Upload Audio
                </div>
                <input 
                  type="file" 
                  accept="audio/*" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
              </label>
            </div>
          )}
          
          {audioUrl && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Emotion Detection (Optional)
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                value={selectedAudioTemplate || ''}
                onChange={(e) => setSelectedAudioTemplate(e.target.value || null)}
              >
                <option value="">Auto-detect from audio</option>
                {audioTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Our AI will analyze your audio and detect the emotion, or you can manually select one.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
  const renderAvatarSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Step 2: Select Avatar Template
      </h2>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setGenderFilter('all')}
            className={`px-3 py-1 rounded-lg text-sm ${
              genderFilter === 'all' 
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setGenderFilter('male')}
            className={`px-3 py-1 rounded-lg text-sm ${
              genderFilter === 'male' 
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Male
          </button>
          <button
            onClick={() => setGenderFilter('female')}
            className={`px-3 py-1 rounded-lg text-sm ${
              genderFilter === 'female' 
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Female
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredAvatars.map((avatar) => (
          <div 
            key={avatar.id}
            onClick={() => setSelectedAvatar(avatar.id)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              selectedAvatar === avatar.id 
                ? 'border-purple-500 shadow-lg scale-[1.02]' 
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="relative">
              <img 
                src={avatar.imageUrl} 
                alt={avatar.name}
                className="w-full h-40 object-cover"
              />
              {selectedAvatar === avatar.id && (
                <div className="absolute top-2 right-2 bg-purple-600 text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
            </div>
            <div className="p-2 bg-white dark:bg-gray-800">
              <p className="text-sm font-medium text-center text-gray-900 dark:text-white">
                {avatar.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderBackgroundSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Step 3: Choose Background
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {backgroundTemplates.map((background) => (
          <div 
            key={background.id}
            onClick={() => setSelectedBackground(background.id)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              selectedBackground === background.id 
                ? 'border-purple-500 shadow-lg scale-[1.02]' 
                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="relative">
              <img 
                src={background.imageUrl} 
                alt={background.name}
                className="w-full h-24 object-cover"
              />
              {selectedBackground === background.id && (
                <div className="absolute top-2 right-2 bg-purple-600 text-white rounded-full p-1">
                  <Check size={16} />
                </div>
              )}
            </div>
            <div className="p-2 bg-white dark:bg-gray-800">
              <p className="text-sm font-medium text-center text-gray-900 dark:text-white">
                {background.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderGenerationProcess = () => {
    if (generationStage === GenerationStage.IDLE) {
      return null;
    }
    
    let stageMessage = '';
    let stageIcon = <></>;
    
    switch (generationStage) {
      case GenerationStage.PROCESSING_TTS:
        stageMessage = 'Generating speech with Zonos TTS model...';
        stageIcon = <Mic size={20} className="text-purple-600 dark:text-purple-400" />;
        break;
      case GenerationStage.PROCESSING_AVATAR:
        stageMessage = 'Animating avatar with LatentSync...';
        stageIcon = <Film size={20} className="text-indigo-600 dark:text-indigo-400" />;
        break;
      case GenerationStage.FINALIZING:
        stageMessage = 'Finalizing video and processing effects...';
        stageIcon = <Wand2 size={20} className="text-blue-600 dark:text-blue-400" />;
        break;
      case GenerationStage.COMPLETED:
        stageMessage = 'Avatar generated successfully!';
        stageIcon = <Check size={20} className="text-green-600 dark:text-green-400" />;
        break;
      case GenerationStage.ERROR:
        stageMessage = 'An error occurred during generation.';
        stageIcon = <div className="text-red-500">❌</div>;
        break;
    }
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Generating Your Avatar
            </h3>
            
            <div className="mb-6">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {generationProgress}% Complete
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 mb-2">
              {stageIcon}
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                {stageMessage}
              </span>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
              <Clock size={14} className="mr-1" />
              Estimated time remaining: {Math.max(0, Math.round((100 - generationProgress) / 10))} seconds
            </div>
            
            {generationStage === GenerationStage.ERROR && (
              <Button 
                variant="danger" 
                className="mt-4"
                onClick={() => setGenerationStage(GenerationStage.IDLE)}
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create New Avatar
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Create a realistic AI avatar using our advanced neural models
              </p>
            </div>
          </div>
          
          {renderInputSection()}
          {renderAvatarSection()}
          {renderBackgroundSection()}
          
          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleGenerate}
              size="lg"
              disabled={
                (inputType === InputType.TEXT && !textInput.trim()) ||
                (inputType === InputType.AUDIO && !recordedAudio) ||
                !selectedAvatar ||
                !selectedBackground
              }
            >
              Generate Avatar
            </Button>
          </div>
          
          {renderGenerationProcess()}
        </div>
      </div>
    </div>
  );
};

export default GenerateAvatar;