import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { Download, Share2, Edit, ArrowLeft, Copy } from 'lucide-react';
import Loader from '../components/ui/Loader';

// Mock data for the video result
const mockVideoData = {
  id: 'new',
  title: 'Professional Introduction',
  videoUrl: 'https://player.vimeo.com/external/573204775.hd.mp4?s=7aee80922afdf01c5fd4d0f03e1f79f89fdefad5&profile_id=174',
  thumbnail: 'https://images.pexels.com/photos/7563687/pexels-photo-7563687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  createdAt: new Date().toISOString(),
  duration: '00:45',
  emotion: 'Professional',
  avatarName: 'Business Woman',
  transcript: 'Hello, I am your professional AI assistant created with Avatar Lab. I can help you with presentations, customer support, and more. This is a demonstration of the advanced capabilities of Avatar Lab technology, which combines neural speech synthesis with state-of-the-art diffusion models for realistic avatars.'
};

const VideoResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState<typeof mockVideoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  useEffect(() => {
    // Simulate fetching video data
    const timer = setTimeout(() => {
      setVideoData({
        ...mockVideoData,
        id: id || 'unknown'
      });
      setIsLoading(false);
      document.title = `${mockVideoData.title} - Avatar Lab`;
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleDownload = () => {
    alert('Download started. Your video will be saved to your device.');
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      })
      .catch(() => {
        alert('Failed to copy link.');
      });
  };
  
  if (isLoading || !videoData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[80vh]">
          <Loader size="large" message="Loading your avatar..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Dashboard
            </button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="bg-black rounded-lg overflow-hidden shadow-lg relative aspect-video">
                <video 
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={videoData.thumbnail}
                >
                  <source src={videoData.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {videoData.title}
                </h1>
                
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                    {videoData.emotion}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    Duration: {videoData.duration}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    {videoData.avatarName}
                  </span>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Transcript:
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {videoData.transcript}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                  Video Actions
                </h3>
                
                <div className="space-y-3">
                  <Button 
                    fullWidth 
                    icon={<Download size={16} />}
                    onClick={handleDownload}
                  >
                    Download Video
                  </Button>
                  
                  <div className="relative">
                    <Button 
                      fullWidth 
                      variant="secondary"
                      icon={<Share2 size={16} />}
                      onClick={() => setShowShareOptions(!showShareOptions)}
                    >
                      Share
                    </Button>
                    
                    {showShareOptions && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 z-10">
                        <button
                          onClick={handleCopyLink}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center text-gray-700 dark:text-gray-300"
                        >
                          <Copy size={16} className="mr-2" />
                          {copySuccess ? 'Link copied!' : 'Copy link'}
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    fullWidth 
                    variant="outline"
                    icon={<Edit size={16} />}
                    onClick={() => navigate('/generate')}
                  >
                    Create New Avatar
                  </Button>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                  Did you know?
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Your avatar was created using our advanced LatentSync model which synchronizes lip movements with audio with exceptional accuracy.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The speech was generated using Zonos TTS, a state-of-the-art text-to-speech system capable of producing natural, expressive speech.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoResult;