// components/CategoryFilter.js - Category Filter Component
import React from 'react';
import { usePost } from '../context/PostContext';

const CategoryFilter = () => {
  const { categories, selectedCategory, setSelectedCategory } = usePost();

  return (
    <div className="container-responsive py-4 sm:py-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-green-600 text-white shadow-md transform scale-105'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-sm'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;