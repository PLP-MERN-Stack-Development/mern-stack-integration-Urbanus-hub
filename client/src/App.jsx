// App.js - Main Application Component
import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryFilter from './components/CategoryFilter';
import PostGrid from './components/PostGrid';
import Footer from './components/Footer';
import {AuthProvider} from './context/AuthContext';
import { PostProvider } from './context/PostContext';

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <HeroSection />
          <CategoryFilter />
          <PostGrid />
          <Footer />
        </div>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;