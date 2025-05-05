import React, { createContext, useContext, useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'standard' | 'professional' | 'enterprise';
  credits: number;
  avatarsGenerated: number;
  joinDate: Date;
  isVerified: boolean;
  twoFactorEnabled: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, code?: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  enableTwoFactor: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, code?: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual API call
      const userData: User = {
        id: '1',
        name: 'Demo User',
        email: email,
        plan: 'professional',
        credits: 100,
        avatarsGenerated: 25,
        joinDate: new Date('2024-01-01'),
        isVerified: true,
        twoFactorEnabled: true
      };
      
      if (userData.twoFactorEnabled && !code) {
        toast.error('2FA code required');
        setIsLoading(false);
        return false;
      }
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Welcome back!');
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: User = {
        id: '1',
        name: name,
        email: email,
        plan: 'standard',
        credits: 50,
        avatarsGenerated: 0,
        joinDate: new Date(),
        isVerified: false,
        twoFactorEnabled: false
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Account created successfully!');
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error('Signup failed. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    // Simulate 2FA verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    return code === '123456';
  };

  const enableTwoFactor = async (): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (user) {
        const updatedUser = { ...user, twoFactorEnabled: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('2FA enabled successfully');
        return true;
      }
      return false;
    } catch (error) {
      toast.error('Failed to enable 2FA');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        signup, 
        logout,
        verifyTwoFactor,
        enableTwoFactor
      }}
    >
      <Toaster richColors position="top-right" />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};