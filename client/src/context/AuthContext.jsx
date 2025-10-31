// context/AuthContext.js - Real API Integration
import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import { authService } from "../services/api";

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

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get current user from backend (using cookie)
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setIsSignedIn(true);

        // Also update localStorage for consistency
        localStorage.setItem("isSignedIn", "true");
        localStorage.setItem("userData", JSON.stringify(userData));
      } catch (error) {
        // User is not authenticated, clear local storage
        setUser(null);
        setIsSignedIn(false);
        localStorage.removeItem("isSignedIn");
        localStorage.removeItem("userData");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await authService.login({ email, password });

      // Extract user data from response
      const userData = response.data || response;

      setUser(userData);
      setIsSignedIn(true);

      // Store in localStorage
      localStorage.setItem("isSignedIn", "true");
      localStorage.setItem("userData", JSON.stringify(userData));

      toast.success("Successfully signed in!");
      return userData;
    } catch (error) {
      toast.error(error.message || "Failed to sign in");
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Call logout endpoint to clear cookie
      await authService.logout();

      setUser(null);
      setIsSignedIn(false);
      localStorage.removeItem("isSignedIn");
      localStorage.removeItem("userData");

      toast.success("Successfully signed out!");
    } catch (error) {
      // Still clear local state even if API call fails
      setUser(null);
      setIsSignedIn(false);
      localStorage.removeItem("isSignedIn");
      localStorage.removeItem("userData");

      console.error("Logout error:", error);
      toast.success("Signed out");
    }
  };

  const value = {
    isSignedIn,
    user,
    isLoading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
