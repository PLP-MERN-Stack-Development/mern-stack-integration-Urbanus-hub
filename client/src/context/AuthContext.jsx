// context/AuthContext.js - Updated to use Clerk
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth as useClerkAuth } from '@clerk/clerk-react';
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
  const { isSignedIn, user, isLoading } = useClerkAuth();
  
  // Transform Clerk user to our format
  const formattedUser = user ? {
    id: user.id,
    firstName: user.firstName || 'User',
    lastName: user.lastName || '',
    email: user.primaryEmailAddress?.emailAddress || '',
    avatar: user.imageUrl || `https://picsum.photos/seed/${user.id}/40/40.jpg`
  } : null;

  const value = {
    isSignedIn: !!isSignedIn,
    user: formattedUser,
    isLoading,
    // Clerk handles sign in/out automatically
    signIn: () => {
      // Clerk handles this through SignInButton component
      toast.info('Please use the Sign In button');
    },
    signOut: () => {
      // Clerk handles this through UserButton component
      toast.info('Please use the profile menu to sign out');
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};