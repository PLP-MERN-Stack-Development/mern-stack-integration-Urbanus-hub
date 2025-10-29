// App.js - Updated with Clerk Integration
import React from 'react';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryFilter from './components/CategoryFilter';
import PostGrid from './components/PostGrid';
import Footer from './components/Footer';
import { PostProvider } from './context/PostContext';

// Your Clerk Publishable Key
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || 'pk_test_your-key-here';

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <PostProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <HeroSection />
          <CategoryFilter />
          <PostGrid />
          <Footer />
        </div>
      </PostProvider>
    </ClerkProvider>
  );
}

export default App;