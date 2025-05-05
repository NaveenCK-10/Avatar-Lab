import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  fullPage?: boolean;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'medium', 
  fullPage = false,
  message
}) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };
  
  const loader = (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`${sizeClasses[size]} rounded-full border-t-transparent border-purple-600 animate-spin`}
        role="status"
        aria-label="Loading"
      ></div>
      {message && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{message}</p>
      )}
    </div>
  );
  
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 z-50">
        {loader}
      </div>
    );
  }
  
  return loader;
};

export default Loader;