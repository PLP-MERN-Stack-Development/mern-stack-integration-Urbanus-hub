// components/CategoriesPage.js - Categories Page Component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid3x3, TrendingUp, Calendar, Filter, Search, BookOpen, Users, Eye, Heart, MessageCircle, Clock, ChevronRight, ArrowRight } from 'lucide-react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);

  // Mock categories data
  const mockCategories = [
    {
      id: 1,
      name: 'Technology',
      slug: 'technology',
      description: 'Latest in tech, programming, and digital innovation',
      icon: '💻',
      color: 'bg-blue-500',
      postCount: 156,
      followerCount: 2340,
      trending: true
    },
    {
      id: 2,
      name: 'Lifestyle',
      slug: 'lifestyle',
      description: 'Living well, personal growth, and everyday inspiration',
      icon: '🌿',
      color: 'bg-green-500',
      postCount: 89,
      followerCount: 1876,
      trending: true
    },
    {
      id: 3,
      name: 'Business',
      slug: 'business',
      description: 'Entrepreneurship, leadership, and industry insights',
      icon: '💼',
      color: 'bg-purple-500',
      postCount: 124,
      followerCount: 3210,
      trending: false
    },
    {
      id: 4,
      name: 'Health & Wellness',
      slug: 'health',
      description: 'Physical and mental health, fitness, and wellness tips',
      icon: '🏃',
      color: 'bg-red-500',
      postCount: 67,
      followerCount: 1567,
      trending: false
    },
    {
      id: 5,
      name: 'Food & Cooking',
      slug: 'food',
      description: 'Recipes, cooking tips, and culinary adventures',
      icon: '🍳',
      color: 'bg-orange-500',
      postCount: 98,
      followerCount: 2890,
      trending: true
    },
    {
      id: 6,
      name: 'Travel',
      slug: 'travel',
      description: 'Destinations, travel guides, and adventure stories',
      icon: '✈️',
      color: 'bg-teal-500',
      postCount: 143,
      followerCount: 4123,
      trending: false
    },
    {
      id: 7,
      name: 'Education',
      slug: 'education',
      description: 'Learning, teaching, and educational resources',
      icon: '📚',
      color: 'bg-indigo-500',
      postCount: 76,
      followerCount: 987,
      trending: false
    },
    {
      id: 8,
      name: 'Entertainment',
      slug: 'entertainment',
      description: 'Movies, music, games, and pop culture',
      icon: '🎬',
      color: 'bg-pink-500',
      postCount: 201,
      followerCount: 5678,
      trending: true
    },
    {
      id: 9,
      name: 'Science',
      slug: 'science',
      description: 'Scientific discoveries, research, and innovations',
      icon: '🔬',
      color: 'bg-cyan-500',
      postCount: 45,
      followerCount: 1234,
      trending: false
    }
  ];

  // Mock posts for each category
  const mockPosts = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      excerpt: "Learn the fundamentals of React Hooks and how to use them effectively.",
      author: { name: "Emma Wilson", avatar: "https://picsum.photos/seed/emma/40/40.jpg" },
      category: "Technology",
      readTime: 5,
      likes: 142,
      comments: 23,
      date: "2023-11-15",
      image: "https://picsum.photos/seed/react-hooks/400/250.jpg"
    },
    {
      id: 2,
      title: "10 Healthy Breakfast Ideas",
      excerpt: "Start your day with these nutritious and delicious breakfast options.",
      author: { name: "Alex Johnson", avatar: "https://picsum.photos/seed/alex/40/40.jpg" },
      category: "Food & Cooking",
      readTime: 8,
      likes: 98,
      comments: 15,
      date: "2023-11-14",
      image: "https://picsum.photos/seed/breakfast/400/250.jpg"
    },
    {
      id: 3,
      title: "The Future of Remote Work",
      excerpt: "How remote work is changing the way we think about careers and collaboration.",
      author: { name: "Sarah Chen", avatar: "https://picsum.photos/seed/sarah/40/40.jpg" },
      category: "Business",
      readTime: 6,
      likes: 187,
      comments: 42,
      date: "2023-11-13",
      image: "https://picsum.photos/seed/remote-work/400/250.jpg"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCategories = [...filteredCategories].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.followerCount - a.followerCount;
    } else if (sortBy === 'recent') {
      return b.id - a.id;
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const CategoryCard = ({ category }) => (
    <Link 
      to={`/categories/${category.slug}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-2xl mr-3`}>
              {category.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {category.postCount} articles
              </p>
            </div>
          </div>
          {category.trending && (
            <div className="flex items-center text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {category.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{category.followerCount.toLocaleString()} followers</span>
          </div>
          <div className="flex items-center text-green-600 group-hover:text-green-700">
            <span className="mr-1">Explore</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );

  const FeaturedPost = ({ post }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-32 object-cover rounded-lg mb-3"
      />
      <div className="flex items-center mb-2">
        <img 
          src={post.author.avatar} 
          alt={post.author.name} 
          className="w-8 h-8 rounded-full mr-2" 
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{post.author.name}</p>
          <p className="text-xs text-gray-500">{post.date}</p>
        </div>
      </div>
      <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h4>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3">
          <span className="flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            {post.likes}
          </span>
          <span className="flex items-center">
            <MessageCircle className="h-3 w-3 mr-1" />
            {post.comments}
          </span>
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime} min
          </span>
        </div>
        <span className="text-xs text-green-600 font-medium">{post.category}</span>
      </div>
    </div>
  );

  return (
    <div className="container-responsive py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover content organized by topics that matter to you. Find your favorite categories and follow them for personalized recommendations.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="popular">Popular</option>
                <option value="recent">Recent</option>
                <option value="name">Name</option>
              </select>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sortedCategories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {/* Featured Posts */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockPosts.map(post => (
                <FeaturedPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoriesPage;