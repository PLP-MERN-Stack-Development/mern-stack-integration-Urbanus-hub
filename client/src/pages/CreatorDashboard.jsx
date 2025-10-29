// pages/CreatorDashboard.js - Improved Creator Dashboard
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { 
  FileText, Users, FolderPlus, BarChart3, Plus, Edit, Trash2, 
  Eye, EyeOff, Search, Filter, Calendar, TrendingUp, UserPlus,
  BookOpen, Settings, LogOut, Menu, X, ChevronDown, Upload,
  Save, XCircle, CheckCircle, AlertCircle, Clock, Tag,
  Home, Layout, Grid3x3, MessageCircle, Archive,Bell
} from 'lucide-react';

const CreatorDashboard = () => {
  const { user, isSignedIn } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Mock data
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React Hooks",
      slug: "getting-started-react-hooks",
      excerpt: "Learn the fundamentals of React Hooks and how to use them effectively in your applications.",
      content: "Full content here...",
      featuredImage: "https://picsum.photos/seed/react-hooks/800/500.jpg",
      category: { id: 1, name: "Technology", slug: "technology" },
      tags: ["React", "JavaScript", "Frontend"],
      isPublished: true,
      viewCount: 1250,
      createdAt: "2023-11-15",
      updatedAt: "2023-11-15",
      comments: 23
    },
    {
      id: 2,
      title: "Building Scalable Node.js Applications",
      slug: "building-scalable-nodejs-applications",
      excerpt: "Best practices for creating Node.js applications that can handle growth and increased load.",
      content: "Full content here...",
      featuredImage: "https://picsum.photos/seed/nodejs/800/500.jpg",
      category: { id: 1, name: "Technology", slug: "technology" },
      tags: ["Node.js", "Backend", "JavaScript"],
      isPublished: true,
      viewCount: 980,
      createdAt: "2023-11-10",
      updatedAt: "2023-11-10",
      comments: 15
    },
    {
      id: 3,
      title: "Introduction to TypeScript",
      slug: "introduction-typescript",
      excerpt: "A comprehensive guide to TypeScript for JavaScript developers looking to level up their skills.",
      content: "Full content here...",
      featuredImage: "https://picsum.photos/seed/typescript/800/500.jpg",
      category: { id: 1, name: "Technology", slug: "technology" },
      tags: ["TypeScript", "JavaScript", "Programming"],
      isPublished: false,
      viewCount: 0,
      createdAt: "2023-11-12",
      updatedAt: "2023-11-12",
      comments: 0
    }
  ]);
  
  const [categories, setCategories] = useState([
    { id: 1, name: "Technology", slug: "technology", description: "All things tech" },
    { id: 2, name: "Lifestyle", slug: "lifestyle", description: "Living your best life" },
    { id: 3, name: "Business", slug: "business", description: "Business insights and tips" },
    { id: 4, name: "Health", slug: "health", description: "Health and wellness" }
  ]);
  
  const [users, setUsers] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@example.com", avatar: "https://picsum.photos/seed/alex/40/40.jpg", joinedAt: "2023-10-15", postCount: 5 },
    { id: 2, name: "Sarah Williams", email: "sarah@example.com", avatar: "https://picsum.photos/seed/sarah/40/40.jpg", joinedAt: "2023-10-20", postCount: 3 },
    { id: 3, name: "Mike Chen", email: "mike@example.com", avatar: "https://picsum.photos/seed/mike/40/40.jpg", joinedAt: "2023-11-01", postCount: 8 },
    { id: 4, name: "Emma Davis", email: "emma@example.com", avatar: "https://picsum.photos/seed/emma/40/40.jpg", joinedAt: "2023-11-05", postCount: 2 }
  ]);
  
  const [stats, setStats] = useState({
    totalPosts: 3,
    publishedPosts: 2,
    draftPosts: 1,
    totalViews: 2230,
    totalComments: 38,
    totalUsers: 4
  });
  
  // Form states
  const [showPostForm, setShowPostForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    category: '',
    tags: '',
    isPublished: false
  });
  
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: ''
  });
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  // Handle post operations
  const handleCreatePost = () => {
    if (!postForm.title || !postForm.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const newPost = {
      id: posts.length + 1,
      title: postForm.title,
      slug: postForm.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      excerpt: postForm.excerpt,
      content: postForm.content,
      featuredImage: postForm.featuredImage || `https://picsum.photos/seed/${postForm.title}/800/500.jpg`,
      category: categories.find(c => c.id === parseInt(postForm.category)) || categories[0],
      tags: postForm.tags.split(',').map(tag => tag.trim()),
      isPublished: postForm.isPublished,
      viewCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      comments: 0
    };
    
    setPosts([newPost, ...posts]);
    setStats({
      ...stats,
      totalPosts: stats.totalPosts + 1,
      draftPosts: postForm.isPublished ? stats.draftPosts : stats.draftPosts + 1,
      publishedPosts: postForm.isPublished ? stats.publishedPosts + 1 : stats.publishedPosts
    });
    
    setPostForm({
      title: '',
      content: '',
      excerpt: '',
      featuredImage: '',
      category: '',
      tags: '',
      isPublished: false
    });
    
    setShowPostForm(false);
    toast.success('Post created successfully!');
  };
  
  const handleUpdatePost = () => {
    if (!postForm.title || !postForm.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const updatedPosts = posts.map(post => {
      if (post.id === editingPost.id) {
        return {
          ...post,
          title: postForm.title,
          slug: postForm.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
          excerpt: postForm.excerpt,
          content: postForm.content,
          featuredImage: postForm.featuredImage || post.featuredImage,
          category: categories.find(c => c.id === parseInt(postForm.category)) || post.category,
          tags: postForm.tags.split(',').map(tag => tag.trim()),
          isPublished: postForm.isPublished,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setPostForm({
      title: '',
      content: '',
      excerpt: '',
      featuredImage: '',
      category: '',
      tags: '',
      isPublished: false
    });
    
    setEditingPost(null);
    setShowPostForm(false);
    toast.success('Post updated successfully!');
  };
  
  const handleDeletePost = (postId) => {
    const postToDelete = posts.find(post => post.id === postId);
    setPosts(posts.filter(post => post.id !== postId));
    setStats({
      ...stats,
      totalPosts: stats.totalPosts - 1,
      draftPosts: postToDelete.isPublished ? stats.draftPosts : stats.draftPosts - 1,
      publishedPosts: postToDelete.isPublished ? stats.publishedPosts - 1 : stats.publishedPosts
    });
    toast.success('Post deleted successfully!');
  };
  
  const handleTogglePublish = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newPublishedState = !post.isPublished;
        return {
          ...post,
          isPublished: newPublishedState
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    
    const post = posts.find(p => p.id === postId);
    setStats({
      ...stats,
      publishedPosts: post.isPublished ? stats.publishedPosts - 1 : stats.publishedPosts + 1,
      draftPosts: post.isPublished ? stats.draftPosts + 1 : stats.draftPosts - 1
    });
    
    toast.success(`Post ${post.isPublished ? 'unpublished' : 'published'} successfully!`);
  };
  
  const openEditPost = (post) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      featuredImage: post.featuredImage,
      category: post.category.id.toString(),
      tags: post.tags.join(', '),
      isPublished: post.isPublished
    });
    setShowPostForm(true);
  };
  
  // Handle category operations
  const handleCreateCategory = () => {
    if (!categoryForm.name) {
      toast.error('Please provide a category name');
      return;
    }
    
    const newCategory = {
      id: categories.length + 1,
      name: categoryForm.name,
      slug: categoryForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      description: categoryForm.description
    };
    
    setCategories([...categories, newCategory]);
    setCategoryForm({ name: '', description: '' });
    setShowCategoryForm(false);
    toast.success('Category created successfully!');
  };
  
  const handleUpdateCategory = () => {
    if (!categoryForm.name) {
      toast.error('Please provide a category name');
      return;
    }
    
    const updatedCategories = categories.map(category => {
      if (category.id === editingCategory.id) {
        return {
          ...category,
          name: categoryForm.name,
          slug: categoryForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
          description: categoryForm.description
        };
      }
      return category;
    });
    
    setCategories(updatedCategories);
    setCategoryForm({ name: '', description: '' });
    setEditingCategory(null);
    setShowCategoryForm(false);
    toast.success('Category updated successfully!');
  };
  
  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(category => category.id !== categoryId));
    toast.success('Category deleted successfully!');
  };
  
  const openEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description
    });
    setShowCategoryForm(true);
  };
  
  // Filter posts based on search and status
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && post.isPublished) ||
                         (filterStatus === 'draft' && !post.isPublished);
    
    return matchesSearch && matchesStatus;
  });
  
  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-xl transition-all duration-300 ease-in-out relative z-20`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className={`flex items-center ${!sidebarOpen && 'justify-center w-full'}`}>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              {sidebarOpen && <span className="ml-3 text-xl font-bold text-gray-800">Notely</span>}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-gray-700 focus:outline-none transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Layout className={`${sidebarOpen ? 'mr-3' : ''} h-5 w-5`} />
              {sidebarOpen && 'Dashboard'}
            </button>
            
            <button
              onClick={() => setActiveTab('posts')}
              className={`w-full flex items-center ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === 'posts' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <FileText className={`${sidebarOpen ? 'mr-3' : ''} h-5 w-5`} />
              {sidebarOpen && 'Posts'}
            </button>
            
            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === 'categories' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <FolderPlus className={`${sidebarOpen ? 'mr-3' : ''} h-5 w-5`} />
              {sidebarOpen && 'Categories'}
            </button>
            
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === 'users' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Users className={`${sidebarOpen ? 'mr-3' : ''} h-5 w-5`} />
              {sidebarOpen && 'Users'}
            </button>
            
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === 'analytics' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <BarChart3 className={`${sidebarOpen ? 'mr-3' : ''} h-5 w-5`} />
              {sidebarOpen && 'Analytics'}
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === 'settings' 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Settings className={`${sidebarOpen ? 'mr-3' : ''} h-5 w-5`} />
              {sidebarOpen && 'Settings'}
            </button>
          </nav>
          
          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-100">
            <div className={`flex items-center ${sidebarOpen ? '' : 'justify-center'}`}>
              <div className="relative">
                <img 
                  src={user?.avatar || "https://picsum.photos/seed/user/40/40.jpg"} 
                  alt="Profile" 
                  className="h-10 w-10 rounded-full ring-2 ring-green-500 ring-offset-2" 
                />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              {sidebarOpen && (
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-gray-500">Creator</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'posts' && 'Content Management'}
                {activeTab === 'categories' && 'Categories'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'analytics' && 'Analytics & Insights'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === 'dashboard' && 'Welcome back! Here\'s what\'s happening with your content.'}
                {activeTab === 'posts' && 'Manage and organize all your blog posts.'}
                {activeTab === 'categories' && 'Create and manage content categories.'}
                {activeTab === 'users' && 'View and manage your platform users.'}
                {activeTab === 'analytics' && 'Track your content performance and engagement.'}
                {activeTab === 'settings' && 'Manage your account and preferences.'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button className="relative p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Posts</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalPosts}</p>
                      <p className="text-xs text-green-600 mt-2">+12% from last month</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Views</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalViews.toLocaleString()}</p>
                      <p className="text-xs text-green-600 mt-2">+23% from last month</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                      <Eye className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
                      <p className="text-xs text-green-600 mt-2">+8% from last month</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Comments</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalComments}</p>
                      <p className="text-xs text-green-600 mt-2">+15% from last month</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Posts */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
                  <button 
                    onClick={() => setActiveTab('posts')}
                    className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center"
                  >
                    View All
                    <ChevronDown className="h-4 w-4 ml-1 rotate-270" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {posts.slice(0, 3).map(post => (
                      <div key={post.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={post.featuredImage} 
                            alt={post.title} 
                            className="h-14 w-14 rounded-xl object-cover shadow-sm" 
                          />
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">{post.title}</h3>
                            <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                              <span className="flex items-center">
                                <FolderPlus className="h-3 w-3 mr-1" />
                                {post.category.name}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {post.createdAt}
                              </span>
                              <span className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {post.viewCount}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {post.isPublished ? (
                            <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Published</span>
                          ) : (
                            <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Draft</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      filterStatus === 'all' 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    All ({posts.length})
                  </button>
                  <button
                    onClick={() => setFilterStatus('published')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      filterStatus === 'published' 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Published ({stats.publishedPosts})
                  </button>
                  <button
                    onClick={() => setFilterStatus('draft')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      filterStatus === 'draft' 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Drafts ({stats.draftPosts})
                  </button>
                </div>
                
                <button
                  onClick={() => setShowPostForm(true)}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Post
                </button>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {filteredPosts.map(post => (
                        <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img 
                                src={post.featuredImage} 
                                alt={post.title} 
                                className="h-12 w-12 rounded-xl object-cover mr-4 shadow-sm" 
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{post.title}</div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">{post.excerpt}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {post.category.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {post.isPublished ? (
                              <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Published
                              </span>
                            ) : (
                              <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Draft
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.viewCount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.comments}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {post.createdAt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleTogglePublish(post.id)}
                                className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                                title={post.isPublished ? 'Unpublish' : 'Publish'}
                              >
                                {post.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                              <button
                                onClick={() => openEditPost(post)}
                                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
                <button
                  onClick={() => setShowCategoryForm(true)}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Category
                </button>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {categories.map(category => (
                        <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">/{category.slug}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">{category.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => openEditCategory(category)}
                                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                title="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Users</h2>
                <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Invite User
                </button>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="h-10 w-10 rounded-full mr-4 ring-2 ring-gray-200" 
                              />
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.postCount}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.joinedAt}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                title="View Profile"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                title="Block User"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Analytics & Insights</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Views Over Time</h3>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Analytics Chart</p>
                      <p className="text-sm text-gray-400 mt-1">Integration with chart library needed</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Posts</h3>
                  <div className="space-y-4">
                    {posts.slice(0, 5).sort((a, b) => b.viewCount - a.viewCount).map((post, index) => (
                      <div key={post.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center text-sm font-bold mr-3">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{post.title}</p>
                            <p className="text-xs text-gray-500">{post.category.name}</p>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">{post.viewCount.toLocaleString()} views</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Categories Distribution</h3>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <div className="text-center">
                      <Grid3x3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Distribution Chart</p>
                      <p className="text-sm text-gray-400 mt-1">Visual breakdown of categories</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Engagement Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <span className="text-sm text-gray-600">Average Time on Page</span>
                      <span className="text-sm font-semibold text-gray-900">3m 24s</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <span className="text-sm text-gray-600">Bounce Rate</span>
                      <span className="text-sm font-semibold text-gray-900">42%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <span className="text-sm text-gray-600">New vs Returning</span>
                      <span className="text-sm font-semibold text-gray-900">65% / 35%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <span className="text-sm text-gray-600">Comments per Post</span>
                      <span className="text-sm font-semibold text-gray-900">12.6</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900">Profile Settings</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      defaultValue={`${user?.firstName} ${user?.lastName}`}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={user?.email}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      defaultValue="Passionate writer and content creator sharing insights and stories."
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="button"
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-500 mt-1">Receive email updates about new comments and interactions.</p>
                    </div>
                    <button
                      type="button"
                      className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Public Profile</h4>
                      <p className="text-sm text-gray-500 mt-1">Make your profile visible to other users.</p>
                    </div>
                    <button
                      type="button"
                      className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                    </button>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="button"
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Post Form Modal */}
      {showPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h3>
              <button
                onClick={() => {
                  setShowPostForm(false);
                  setEditingPost(null);
                  setPostForm({
                    title: '',
                    content: '',
                    excerpt: '',
                    featuredImage: '',
                    category: '',
                    tags: '',
                    isPublished: false
                  });
                }}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={postForm.title}
                  onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter post title..."
                />
              </div>
              
              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  rows={3}
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Brief description of your post..."
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  rows={8}
                  value={postForm.content}
                  onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Write your post content here..."
                />
              </div>
              
              <div>
                <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  id="featuredImage"
                  value={postForm.featuredImage}
                  onChange={(e) => setPostForm({...postForm, featuredImage: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={postForm.category}
                  onChange={(e) => setPostForm({...postForm, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  value={postForm.tags}
                  onChange={(e) => setPostForm({...postForm, tags: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="react, javascript, webdev (comma separated)"
                />
              </div>
              
              <div className="flex items-center p-4 rounded-xl bg-gray-50">
                <input
                  id="isPublished"
                  type="checkbox"
                  checked={postForm.isPublished}
                  onChange={(e) => setPostForm({...postForm, isPublished: e.target.checked})}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublished" className="ml-3 block text-sm text-gray-900">
                  Publish immediately
                </label>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowPostForm(false);
                    setEditingPost(null);
                    setPostForm({
                      title: '',
                      content: '',
                      excerpt: '',
                      featuredImage: '',
                      category: '',
                      tags: '',
                      isPublished: false
                    });
                  }}
                  className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={editingPost ? handleUpdatePost : handleCreatePost}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-sm font-medium"
                >
                  {editingPost ? 'Update Post' : 'Create Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Category Form Modal */}
      {showCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button
                onClick={() => {
                  setShowCategoryForm(false);
                  setEditingCategory(null);
                  setCategoryForm({ name: '', description: '' });
                }}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter category name..."
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Brief description of the category..."
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowCategoryForm(false);
                    setEditingCategory(null);
                    setCategoryForm({ name: '', description: '' });
                  }}
                  className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-200 text-sm font-medium"
                >
                  {editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorDashboard;