// components/HeroSection.js - Hero Section with Glassmorphism
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePost } from '../context/PostContext';
import { ArrowRight, Clock, User, Calendar } from 'lucide-react';

const HeroSection = () => {
  const { isSignedIn, user } = useAuth();
  const { posts } = usePost();
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    // Set the first post as featured
    if (posts.length > 0) {
      setFeaturedPost(posts[0]);
    }
  }, [posts]);

  if (!featuredPost) return <div className="h-96 bg-gray-200 animate-pulse"></div>;

  return (
    <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://picsum.photos/seed/hero/1920/1080.jpg" 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/70 to-green-700/60"></div>
      </div>
      
      {/* Content with Glassmorphism */}
      <div className="relative container-responsive h-full flex items-center">
        <div className="w-full lg:w-2/3 xl:w-1/2">
          <div className="glass-effect rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="text-center lg:text-left">
              {isSignedIn ? (
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                  Welcome back, {user?.firstName || user?.first_name || 'there'}!
                </h1>
              ) : (
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                  Discover Thoughtful Content
                </h1>
              )}
              <p className="text-base sm:text-lg text-white/90 mb-6">
                Explore articles from writers who have something genuine to say
              </p>
              
              <div className="glass-effect-dark rounded-xl p-4 sm:p-6">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 text-xs font-medium text-white bg-green-600/80 rounded-full backdrop-blur-sm">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-white/80 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
                
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 line-clamp-2">
                  {featuredPost.title}
                </h2>
                
                <p className="text-white/80 mb-4 line-clamp-2 sm:line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <img 
                      src={featuredPost.author.avatar} 
                      alt={featuredPost.author.name} 
                      className="w-10 h-10 rounded-full mr-3 border-2 border-white/50 flex-shrink-0" 
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{featuredPost.author.name}</p>
                      <p className="text-xs text-white/70">Author</p>
                    </div>
                  </div>
                  
                  <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-all duration-200 flex items-center group">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;