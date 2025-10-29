// components/DiscoverPage.js - Discover Page Component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Calendar, Search, Filter, Heart, MessageCircle, Eye, Bookmark, Share2, User, Tag, ArrowRight, Star, Zap, Flame } from 'lucide-react';

const DiscoverPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  // Mock posts data
  const mockPosts = [
    {
      id: 1,
      title: "The Future of AI in Web Development",
      excerpt: "How artificial intelligence is revolutionizing the way we build and interact with web applications.",
      author: { name: "Alex Chen", avatar: "https://picsum.photos/seed/alex/40/40.jpg" },
      category: "Technology",
      tags: ["AI", "Web Development", "JavaScript"],
      readTime: 8,
      likes: 342,
      comments: 56,
      views: 5420,
      date: "2023-11-15",
      image: "https://picsum.photos/seed/ai-web/400/250.jpg",
      trending: true,
      featured: true
    },
    {
      id: 2,
      title: "Building a Sustainable Morning Routine",
      excerpt: "Create a morning routine that energizes you and sets you up for a productive day.",
      author: { name: "Emma Wilson", avatar: "https://picsum.photos/seed/emma/40/40.jpg" },
      category: "Lifestyle",
      tags: ["Morning Routine", "Productivity", "Wellness"],
      readTime: 6,
      likes: 287,
      comments: 34,
      views: 3210,
      date: "2023-11-14",
      image: "https://picsum.photos/seed/morning-routine/400/250.jpg",
      trending: true,
      featured: false
    },
    {
      id: 3,
      title: "10 Essential JavaScript Tips for Beginners",
      excerpt: "Master these fundamental JavaScript concepts to become a better developer.",
      author: { name: "Sarah Johnson", avatar: "https://picsum.photos/seed/sarah/40/40.jpg" },
      category: "Technology",
      tags: ["JavaScript", "Programming", "Tips"],
      readTime: 10,
      likes: 456,
      comments: 78,
      views: 6780,
      date: "2023-11-13",
      image: "https://picsum.photos/seed/javascript-tips/400/250.jpg",
      trending: false,
      featured: true
    },
    {
      id: 4,
      title: "The Art of Minimalist Living",
      excerpt: "Discover how less can be more with these practical tips for minimalist living.",
      author: { name: "Mike Chen", avatar: "https://picsum.photos/seed/mike/40/40.jpg" },
      category: "Lifestyle",
      tags: ["Minimalism", "Organization", "Simplicity"],
      readTime: 7,
      likes: 198,
      comments: 23,
      views: 2340,
      date: "2023-11-12",
      image: "https://picsum.photos/seed/minimalist/400/250.jpg",
      trending: false,
      featured: false
    },
    {
      id: 5,
      title: "Healthy Meal Prep for Busy Professionals",
      excerpt: "Save time and eat well with these simple meal prep strategies for your busy schedule.",
      author: { name: "Jamie Smith", avatar: "https://picsum.photos/seed/jamie/40/40.jpg" },
      category: "Food & Cooking",
      tags: ["Meal Prep", "Healthy Eating", "Time Management"],
      readTime: 9,
      likes: 267,
      comments: 41,
      views: 4560,
      date: "2023-11-11",
      image: "https://picsum.photos/seed/meal-prep/400/250.jpg",
      trending: true,
      featured: false
    },
    {
      id: 6,
      title: "Remote Work Best Practices",
      excerpt: "Maximize your productivity and maintain work-life balance while working from home.",
      author: { name: "David Lee", avatar: "https://picsum.photos/seed/david/40/40.jpg" },
      category: "Business",
      tags: ["Remote Work", "Productivity", "Work-Life Balance"],
      readTime: 8,
      likes: 389,
      comments: 62,
      views: 7890,
      date: "2023-11-10",
      image: "https://picsum.photos/seed/remote-work/400/250.jpg",
      trending: false,
      featured: true
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getFilteredPosts = () => {
    switch (activeTab) {
      case 'trending':
        return filteredPosts.filter(post => post.trending);
      case 'featured':
        return filteredPosts.filter(post => post.featured);
      case 'recent':
        return [...filteredPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'popular':
        return [...filteredPosts].sort((a, b) => b.views - a.views);
      default:
        return filteredPosts;
    }
  };

  const PostCard = ({ post }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
      <div className="relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        {post.trending && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
              <Flame className="h-3 w-3 mr-1" />
              Trending
            </div>
          </div>
        )}
        {post.featured && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-3">
          <img 
            src={post.author.avatar} 
            alt={post.author.name} 
            className="w-10 h-10 rounded-full mr-3" 
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
            <p className="text-xs text-gray-500">{post.date}</p>
          </div>
        </div>
        
        <div className="mb-3">
          <span className="inline-block px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full mb-2">
            {post.category}
          </span>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <button className="flex items-center hover:text-red-500 transition-colors">
              <Heart className="h-4 w-4 mr-1" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center hover:text-green-600 transition-colors">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>{post.comments}</span>
            </button>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              <span>{post.views.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="hover:text-green-600 transition-colors">
              <Bookmark className="h-4 w-4" />
            </button>
            <button className="hover:text-green-600 transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-responsive py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore trending content, featured articles, and personalized recommendations tailored just for you.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, tags, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-2 mb-8">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'trending', label: 'Trending', icon: Flame, color: 'orange' },
            { id: 'featured', label: 'Featured', icon: Star, color: 'purple' },
            { id: 'recent', label: 'Recent', icon: Clock, color: 'blue' },
            { id: 'popular', label: 'Popular', icon: TrendingUp, color: 'green' }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? `bg-${tab.color}-100 text-${tab.color}-700 border-${tab.color}-300`
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredPosts().map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Load More */}
      {!loading && getFilteredPosts().length > 0 && (
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;