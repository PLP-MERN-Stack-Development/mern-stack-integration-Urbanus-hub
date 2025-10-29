// context/AuthContext.js - Updated to use Clerk
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth as useClerkAuth } from '@clerk/clerk-react';
import api from '../services/api';
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

  // When Clerk reports signed in, call server to sync/create local user record
  useEffect(() => {
    const sync = async () => {
      try {
        if (isSignedIn && !isLoading) {
          await api.get('/users/sync');
        }
      } catch (err) {
        // non-fatal: show a toast in dev only
        console.error('Error syncing user with server:', err?.response?.data || err.message);
      }
    };

    sync();
  }, [isSignedIn, isLoading]);

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