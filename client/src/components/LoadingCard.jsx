// components/LoadingCard.js - Loading Skeleton Card
import React from 'react';

const LoadingCard = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-4 sm:p-6">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse mr-3"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-1 w-full"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-5/6"></div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-3 sm:space-x-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-4"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;