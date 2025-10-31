// pages/MyArticles.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FileText, Eye, Heart, MessageCircle, Calendar, Filter, Search, Edit, Trash2, Plus } from 'lucide-react';

const MyArticles = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArticles([
        {
          id: 1,
          title: "Getting Started with React Hooks",
          excerpt: "Learn the fundamentals of React Hooks and how to use them effectively in your applications.",
          featuredImage: "https://picsum.photos/seed/react-hooks/400/250.jpg",
          category: "Technology",
          tags: ["React", "JavaScript", "Frontend"],
          published: true,
          views: 1250,
          likes: 42,
          comments: 8,
          createdAt: "2023-11-15",
          updatedAt: "2023-11-15"
        },
        {
          id: 2,
          title: "Building Scalable Node.js Applications",
          excerpt: "Best practices for creating Node.js applications that can handle growth and increased load.",
          featuredImage: "https://picsum.photos/seed/nodejs/400/250.jpg",
          category: "Technology",
          tags: ["Node.js", "Backend", "JavaScript"],
          published: true,
          views: 980,
          likes: 35,
          comments: 12,
          createdAt: "2023-11-10",
          updatedAt: "2023-11-10"
        },
        {
          id: 3,
          title: "Introduction to TypeScript",
          excerpt: "A comprehensive guide to TypeScript for JavaScript developers looking to level up their skills.",
          featuredImage: "https://picsum.photos/seed/typescript/400/250.jpg",
          category: "Technology",
          tags: ["TypeScript", "JavaScript", "Programming"],
          published: false,
          views: 0,
          likes: 0,
          comments: 0,
          createdAt: "2023-11-12",
          updatedAt: "2023-11-12"
        },
        {
          id: 4,
          title: "CSS Grid vs Flexbox: When to Use Which",
          excerpt: "A comparison of CSS Grid and Flexbox layouts with examples of when to use each one.",
          featuredImage: "https://picsum.photos/seed/css-grid/400/250.jpg",
          category: "Design",
          tags: ["CSS", "Frontend", "Design"],
          published: true,
          views: 756,
          likes: 28,
          comments: 5,
          createdAt: "2023-10-28",
          updatedAt: "2023-10-28"
        },
        {
          id: 5,
          title: "Modern JavaScript Features You Should Know",
          excerpt: "Explore the latest JavaScript features that can improve your development workflow.",
          featuredImage: "https://picsum.photos/seed/modern-js/400/250.jpg",
          category: "Technology",
          tags: ["JavaScript", "ES6+", "Programming"],
          published: false,
          views: 0,
          likes: 0,
          comments: 0,
          createdAt: "2023-11-05",
          updatedAt: "2023-11-05"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = articles;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(article => {
        if (filterStatus === 'published') return article.published;
        if (filterStatus === 'draft') return !article.published;
        return true;
      });
    }
    
    setFilteredArticles(result);
  }, [articles, searchQuery, filterStatus]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0);
  const totalComments = articles.reduce((sum, article) => sum + article.comments, 0);
  const publishedCount = articles.filter(article => article.published).length;
  const draftCount = articles.filter(article => !article.published).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading your articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Articles</h1>
          <p className="mt-2 text-gray-600">Manage and view all your articles in one place.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Articles</p>
                <p className="text-xl font-semibold text-gray-900">{articles.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-xl font-semibold text-gray-900">{totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg mr-3">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Likes</p>
                <p className="text-xl font-semibold text-gray-900">{totalLikes}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Comments</p>
                <p className="text-xl font-semibold text-gray-900">{totalComments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Published</p>
                <p className="text-xl font-semibold text-gray-900">{publishedCount}</p>
              </div>
            </div>
          </div>
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
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-700 mr-2">Filter:</span>
              </div>
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  filterStatus === 'all' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All ({articles.length})
              </button>
              <button
                onClick={() => setFilterStatus('published')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  filterStatus === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Published ({publishedCount})
              </button>
              <button
                onClick={() => setFilterStatus('draft')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  filterStatus === 'draft' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Drafts ({draftCount})
              </button>
            </div>
            
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              <Plus className="h-5 w-5 mr-1" />
              New Article
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <div key={article.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={article.featuredImage} 
                    alt={article.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      article.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                      {article.category}
                    </span>
                    <div className="flex space-x-1">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(article.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {article.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {article.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {article.comments}
                      </span>
                    </div>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || filterStatus !== 'all' 
                ? "Try adjusting your search or filter criteria." 
                : "You haven't created any articles yet."}
            </p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Create Your First Article
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArticles;