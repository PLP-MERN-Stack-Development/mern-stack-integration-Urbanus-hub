// components/PostCard.js - Individual Post Card Component
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePost } from '../context/PostContext';
import AuthPromptModal from './AuthPromptModal';
import { Heart, MessageCircle, Bookmark, Clock, Calendar } from 'lucide-react';

const PostCard = ({ post }) => {
  const { isSignedIn } = useAuth();
  const { handleLike, handleBookmark } = usePost();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLikeClick = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }
    
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    handleLike(post.id);
  };

  const handleBookmarkClick = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }
    
    setIsBookmarked(!isBookmarked);
    handleBookmark(post.id);
  };

  const handleCommentClick = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }
    // Handle comment click
  };

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
        <div className="relative overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium text-white bg-green-600/90 backdrop-blur-sm rounded-full">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-center mb-3">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-10 h-10 rounded-full mr-3 flex-shrink-0" 
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{post.author.name}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                <span className="truncate">{post.date}</span>
                <span className="mx-1">·</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{post.readTime} min</span>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button 
                onClick={handleLikeClick}
                className={`flex items-center space-x-1 text-sm ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current heart-animation' : ''}`} />
                <span className="hidden sm:inline">{likeCount}</span>
                <span className="sm:hidden">{likeCount}</span>
              </button>
              <button 
                onClick={handleCommentClick}
                className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-600 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="hidden sm:inline">{post.comments}</span>
                <span className="sm:hidden">{post.comments}</span>
              </button>
            </div>
            <button 
              onClick={handleBookmarkClick}
              className={`text-sm ${isBookmarked ? 'text-green-600' : 'text-gray-500'} hover:text-green-600 transition-colors`}
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      
      {showAuthModal && (
        <AuthPromptModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
};

export default PostCard;