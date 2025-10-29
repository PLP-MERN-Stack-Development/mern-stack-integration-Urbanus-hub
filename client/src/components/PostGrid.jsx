// components/PostGrid.js - Post Grid Component
import React from 'react';
import { usePost } from '../context/PostContext';
import PostCard from './PostCard';
import LoadingCard from './LoadingCard';

const PostGrid = () => {
  const { filteredPosts, loading } = usePost();

  if (loading) {
    return (
      <div className="container-responsive pb-8 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="container-responsive pb-8 sm:pb-12">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive pb-8 sm:pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostGrid;