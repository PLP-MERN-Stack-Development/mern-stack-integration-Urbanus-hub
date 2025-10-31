// pages/Bookmarks.js
import React, { useState, useEffect } from 'react';
import { Bookmark, Search, Filter, ExternalLink, Heart, MessageCircle, Calendar, X } from 'lucide-react';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockBookmarks = [
        {
          id: 1,
          title: "Understanding React's useEffect Hook",
          excerpt: "A deep dive into one of React's most powerful hooks and how to use it effectively.",
          featuredImage: "https://picsum.photos/seed/react-useeffect/400/250.jpg",
          author: {
            name: "Sarah Johnson",
            avatar: "https://picsum.photos/seed/sarah/40/40.jpg"
          },
          category: "Technology",
          tags: ["React", "JavaScript", "Frontend"],
          publishedAt: "2023-11-15",
          readTime: "8 min read",
          bookmarkedAt: "2023-11-16"
        },
        {
          id: 2,
          title: "The Future of Web Development",
          excerpt: "Exploring emerging trends and technologies that will shape the future of web development.",
          featuredImage: "https://picsum.photos/seed/web-future/400/250.jpg",
          author: {
            name: "Michael Chen",
            avatar: "https://picsum.photos/seed/michael/40/40.jpg"
          },
          category: "Technology",
          tags: ["Web Dev", "Trends", "Future"],
          publishedAt: "2023-11-10",
          readTime: "12 min read",
          bookmarkedAt: "2023-11-11"
        },
        {
          id: 3,
          title: "Minimalist Design Principles",
          excerpt: "How to apply minimalist design principles to create clean and effective user interfaces.",
          featuredImage: "https://picsum.photos/seed/minimalist-design/400/250.jpg",
          author: {
            name: "Emily Rodriguez",
            avatar: "https://picsum.photos/seed/emily/40/40.jpg"
          },
          category: "Design",
          tags: ["Design", "UI/UX", "Minimalism"],
          publishedAt: "2023-11-05",
          readTime: "6 min read",
          bookmarkedAt: "2023-11-07"
        },
        {
          id: 4,
          title: "Building Responsive Layouts with CSS Grid",
          excerpt: "A comprehensive guide to creating responsive layouts using CSS Grid.",
          featuredImage: "https://picsum.photos/seed/css-grid/400/250.jpg",
          author: {
            name: "David Kim",
            avatar: "https://picsum.photos/seed/david/40/40.jpg"
          },
          category: "Design",
          tags: ["CSS", "Grid", "Responsive"],
          publishedAt: "2023-10-28",
          readTime: "10 min read",
          bookmarkedAt: "2023-10-30"
        },
        {
          id: 5,
          title: "Introduction to Machine Learning",
          excerpt: "A beginner-friendly introduction to the concepts and applications of machine learning.",
          featuredImage: "https://picsum.photos/seed/ml-intro/400/250.jpg",
          author: {
            name: "Alex Thompson",
            avatar: "https://picsum.photos/seed/alex/40/40.jpg"
          },
          category: "Technology",
          tags: ["Machine Learning", "AI", "Data Science"],
          publishedAt: "2023-10-20",
          readTime: "15 min read",
          bookmarkedAt: "2023-10-22"
        },
        {
          id: 6,
          title: "Healthy Eating Habits for Busy Professionals",
          excerpt: "Simple and practical tips for maintaining a healthy diet despite a busy schedule.",
          featuredImage: "https://picsum.photos/seed/healthy-eating/400/250.jpg",
          author: {
            name: "Jessica Williams",
            avatar: "https://picsum.photos/seed/jessica/40/40.jpg"
          },
          category: "Lifestyle",
          tags: ["Health", "Nutrition", "Lifestyle"],
          publishedAt: "2023-10-15",
          readTime: "7 min read",
          bookmarkedAt: "2023-10-18"
        }
      ];
      
      setBookmarks(mockBookmarks);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(mockBookmarks.map(item => item.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = bookmarks;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(bookmark => 
        bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (filterCategory !== 'all') {
      result = result.filter(bookmark => bookmark.category === filterCategory);
    }
    
    setFilteredBookmarks(result);
  }, [bookmarks, searchQuery, filterCategory]);

  const handleRemoveBookmark = (id) => {
    if (window.confirm("Are you sure you want to remove this bookmark?")) {
      setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookmarks</h1>
          <p className="mt-2 text-gray-600">Articles you've saved for later reading.</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700 mr-2">Category:</span>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bookmarks Grid */}
        {filteredBookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks.map(bookmark => (
              <div key={bookmark.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={bookmark.featuredImage} 
                    alt={bookmark.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button 
                      onClick={() => handleRemoveBookmark(bookmark.id)}
                      className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      title="Remove bookmark"
                    >
                      <Bookmark className="h-4 w-4 text-green-600 fill-current" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                      {bookmark.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {bookmark.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {bookmark.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {bookmark.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {bookmark.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={bookmark.author.avatar} 
                        alt={bookmark.author.name} 
                        className="h-8 w-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{bookmark.author.name}</p>
                        <p className="text-xs text-gray-500">{bookmark.publishedAt}</p>
                      </div>
                    </div>
                    
                    <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>Bookmarked on {bookmark.bookmarkedAt}</span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        42
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        8
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || filterCategory !== 'all' 
                ? "Try adjusting your search or filter criteria." 
                : "You haven't bookmarked any articles yet."}
            </p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Discover Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;