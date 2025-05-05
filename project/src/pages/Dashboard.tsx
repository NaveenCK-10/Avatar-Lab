import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Plus, Download, Trash2, Play } from 'lucide-react';

// Mock data for generated avatars
const mockAvatars = [
  {
    id: '1',
    previewUrl: 'https://images.pexels.com/photos/7876708/pexels-photo-7876708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Product Introduction',
    duration: '00:32',
    date: '2025-01-15',
    emotion: 'Professional'
  },
  {
    id: '2',
    previewUrl: 'https://images.pexels.com/photos/8438951/pexels-photo-8438951.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Customer Support Avatar',
    duration: '00:45',
    date: '2025-01-10',
    emotion: 'Friendly'
  },
  {
    id: '3',
    previewUrl: 'https://images.pexels.com/photos/8090137/pexels-photo-8090137.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Training Module Intro',
    duration: '01:12',
    date: '2025-01-05',
    emotion: 'Enthusiastic'
  },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [avatars, setAvatars] = useState(mockAvatars);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    document.title = 'Dashboard - Avatar Lab';
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleDelete = (id: string) => {
    setAvatars(avatars.filter(avatar => avatar.id !== id));
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Avatars
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Create, manage, and download your AI-generated avatars
              </p>
            </div>
            
            <Link to="/generate" className="mt-4 sm:mt-0">
              <Button icon={<Plus size={16} />}>
                Create New Avatar
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="ml-3 text-gray-600 dark:text-gray-400">Loading your avatars...</p>
            </div>
          ) : avatars.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
              <div className="mb-4 w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto">
                <Plus size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No avatars yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your first AI avatar with our easy-to-use generator.
              </p>
              <Link to="/generate">
                <Button>
                  Create your first avatar
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {avatars.map((avatar) => (
                <div 
                  key={avatar.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img 
                      src={avatar.previewUrl} 
                      alt={avatar.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link to={`/result/${avatar.id}`} className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 mr-2">
                        <Play size={20} />
                      </Link>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {avatar.title}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded text-xs">
                            {avatar.emotion}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{avatar.duration}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {new Date(avatar.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        icon={<Download size={14} />}
                        onClick={() => alert('Download started')}
                      >
                        Download
                      </Button>
                      
                      <button 
                        onClick={() => handleDelete(avatar.id)}
                        className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;