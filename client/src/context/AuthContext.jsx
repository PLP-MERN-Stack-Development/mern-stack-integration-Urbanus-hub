// context/AuthContext.js - Updated with Role Support
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
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
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        setUser(userData);
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  const signIn = (email, password) => {
    // Simulate API call to authenticate user
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock user database - in a real app, this would be an API call
        const users = [
          { 
            id: 'user1', 
            email: 'reader@example.com', 
            password: 'password123',
            firstName: 'John', 
            lastName: 'Doe',
            role: 'reader',
            avatar: 'https://picsum.photos/seed/reader/40/40.jpg'
          },
          { 
            id: 'user2', 
            email: 'creator@example.com', 
            password: 'password123',
            firstName: 'Jane', 
            lastName: 'Smith',
            role: 'creator',
            avatar: 'https://picsum.photos/seed/creator/40/40.jpg'
          }
        ];
        
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          setIsSignedIn(true);
          localStorage.setItem('isSignedIn', 'true');
          localStorage.setItem('userData', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const signOut = () => {
    setUser(null);
    setIsSignedIn(false);
    localStorage.removeItem('isSignedIn');
    localStorage.removeItem('userData');
    toast.success('Successfully signed out!');
  };

  const value = {
    isSignedIn,
    user,
    isLoading,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
