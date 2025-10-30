// components/PostCard.js - Updated to use custom AuthPromptModal
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Eye,
  Clock,
  Calendar,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import AuthPromptModal from "./AuthPromptModal";

const PostCard = ({ post }) => {
  const { isSignedIn } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentCount, setCommentCount] = useState(post.comments);

  const handleLike = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }

    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    // Here you would typically make an API call to update the like status
  };

  const handleBookmark = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }

    setIsBookmarked(!isBookmarked);
    // Here you would typically make an API call to update the bookmark status
  };

  const handleComment = () => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }
    // Here you would typically navigate to the post detail page or open a comment modal
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
        <div className="relative">
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

        <div className="p-6">
          <div className="flex items-center mb-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {post.author.name}
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{post.date}</span>
                <span className="mx-1">•</span>
                <Clock className="h-3 w-3 mr-1" />
                <span>{post.readTime} min</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center hover:text-red-500 transition-colors ${
                  isLiked ? "text-red-500" : ""
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                <span>{likeCount}</span>
              </button>
              <button
                onClick={handleComment}
                className="flex items-center hover:text-green-600 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{commentCount}</span>
              </button>
              <div className="flex items-center">
                <Eye className="h-5 w-5 mr-1" />
                <span>{post.views.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBookmark}
                className={`hover:text-green-600 transition-colors ${
                  isBookmarked ? "text-green-600" : ""
                }`}
              >
                <Bookmark
                  className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`}
                />
              </button>
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="hover:text-green-600 transition-colors relative"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Menu */}
      {showShareMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 max-w-xs w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-900">
                Share this article
              </h3>
              <button
                onClick={() => setShowShareMenu(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-2">
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12c0-6.627-5.373-12-12-12S5.373 0 12 5.373 0 12 12 5.373 0 12-5.373 0-12-5.373zm0 10.16l-4.2-4.2a1 1 0 0 0-1.414 1.414l4.2 4.2a1 1 0 0 0 1.414-1.414l-4.2-4.2a1 1 0 0 0-1.414 1.414z" />
                </svg>
                Twitter
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.676 0H1.324C0.592 0 0 .592.592 0 1.324v21.152C0 23.224.592 24 1.324 24h21.152C23.408 24 24 23.408 24 22.676zM12 10.236a8 8 0 1 0 0-16 8 8 0 0 0 16 0z" />
                  <path d="M12 16l-4-4v4h8v-4z" />
                </svg>
                Facebook
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452H16.89l-2.523-2.523a1 1 0 0 0-1.414-1.414l2.523 2.523a1 1 0 0 0 1.414-1.414l-2.523-2.523zM12 16l-4-4v4h8v-4z" />
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10S17.514 2 12 2z" />
                </svg>
                LinkedIn
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 12-12S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8z" />
                  <path d="M12 16v-1a1 1 0 0 1-1h-1a1 1 0 0 1-1v1a1 1 0 0 1 1h1a1 1 0 0 1 1v-1z" />
                </svg>
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Prompt Modal */}
      {showAuthModal && (
        <AuthPromptModal
          onClose={() => setShowAuthModal(false)}
          action="like"
        />
      )}
    </>
  );
};

export default PostCard;
