// context/AuthContext.js - Authentication Context
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth status
    setTimeout(() => {
      const signedIn = localStorage.getItem('isSignedIn') === 'true';
      setIsSignedIn(signedIn);
      if (signedIn) {
        setUser({
          id: 'user123',
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah@example.com',
          avatar: 'https://picsum.photos/seed/sarah/40/40.jpg'
        });
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  const signIn = () => {
    setIsSignedIn(true);
    setUser({
      id: 'user123',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      avatar: 'https://picsum.photos/seed/sarah/40/40.jpg'
    });
    localStorage.setItem('isSignedIn', 'true');
    toast.success('Successfully signed in!');
  };

  const signOut = () => {
    setIsSignedIn(false);
    setUser(null);
    localStorage.removeItem('isSignedIn');
    toast.success('Successfully signed out!');
  };

  const value = {
    isSignedIn,
    user,
    isLoading,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};