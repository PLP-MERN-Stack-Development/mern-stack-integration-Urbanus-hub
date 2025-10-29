// components/Navbar.js - Updated with Profile Section
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  Bell,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Bookmark,
  FileText,
  ChevronDown,
  Home,
  Compass,
  Grid3x3,
  Info,
  PenTool,
  Heart,
  MessageCircle,
  TrendingUp,
  Archive,
  HelpCircle
} from "lucide-react";

const Navbar = () => {
  const { isSignedIn, user, isLoading, signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasNotifications, setHasNotifications] = useState(true);
  const navigate = useNavigate();
  
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
    {
      id: 1,
      user: "Alex Chen",
      action: "liked your article",
      time: "2 hours ago",
      avatar: "https://picsum.photos/seed/user1/32/32.jpg",
      read: false
    },
    {
      id: 2,
      user: "Jamie Smith",
      action: "commented on your post",
      time: "5 hours ago",
      avatar: "https://picsum.photos/seed/user2/32/32.jpg",
      read: false
    },
    {
      id: 3,
      user: "Sam Lee",
      action: "started following you",
      time: "1 day ago",
      avatar: "https://picsum.photos/seed/user3/32/32.jpg",
      read: true
    },
  ];

  const handleSignOut = () => {
    signOut();
    setShowUserMenu(false);
    navigate("/");
  };

  const handleNotificationClick = (notifId) => {
    // Mark notification as read
    console.log(`Notification ${notifId} clicked`);
    setShowNotifications(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigationItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Discover", href: "/discover", icon: Compass },
    { label: "Categories", href: "/categories", icon: Grid3x3 },
    { label: "About", href: "/about", icon: Info },
  ];

  const userMenuItems = [
    {
      label: "My Profile",
      href: "/profile",
      icon: User,
      description: "View and edit your profile"
    },
    {
      label: "My Articles",
      href: user?.role === "creator" ? "/creator-dashboard" : "/my-articles",
      icon: FileText,
      description: user?.role === "creator" ? "Manage your content" : "View your posts"
    },
    {
      label: "Bookmarks",
      href: "/bookmarks",
      icon: Bookmark,
      description: "Saved articles"
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      description: "Account preferences"
    },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-xl font-bold text-gray-800 hidden sm:block">
                Notely
              </span>
              <span className="text-lg font-bold text-gray-800 sm:hidden">
                N
              </span>
            </Link>
            <div className="hidden lg:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                    >
                      <Icon className="h-4 w-4 mr-1" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Search and Auth */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 px-3 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            ) : (
              <>
                {isSignedIn ? (
                  <>
                    {/* Notifications */}
                    <div className="relative" ref={notificationRef}>
                      <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 rounded-full text-gray-600 hover:text-green-600 focus:outline-none transition-colors"
                      >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                        )}
                      </button>
                      {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl p-4 z-10 max-h-96 overflow-y-auto">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-800">Notifications</h3>
                            <button className="text-xs text-green-600 hover:text-green-700">
                              Mark all as read
                            </button>
                          </div>
                          <div className="space-y-2">
                            {notifications.map((notif) => (
                              <div
                                key={notif.id}
                                onClick={() => handleNotificationClick(notif.id)}
                                className={`flex items-start p-2 rounded-lg cursor-pointer transition-colors ${
                                  !notif.read ? 'bg-blue-50' : 'hover:bg-gray-50'
                                }`}
                              >
                                <img
                                  src={notif.avatar}
                                  alt={notif.user}
                                  className="w-8 h-8 rounded-full mr-3 flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm">
                                    <span className="font-medium">
                                      {notif.user}
                                    </span>{" "}
                                    {notif.action}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {notif.time}
                                  </p>
                                </div>
                                {!notif.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <Link 
                              to="/notifications" 
                              className="text-sm text-green-600 hover:text-green-700 font-medium"
                            >
                              View all notifications
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* User Profile Section */}
                    <div className="relative" ref={userMenuRef}>
                      <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-gray-50 px-2 py-1 transition-colors"
                      >
                        <div className="relative">
                          <img
                            className="h-8 w-8 rounded-full ring-2 ring-green-500 ring-offset-2"
                            src={user?.avatar || "https://picsum.photos/seed/user/40/40.jpg"}
                            alt="Profile"
                          />
                          <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="hidden md:block text-left">
                          <p className="text-sm font-medium text-gray-900 truncate max-w-[100px]">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {user?.role}
                          </p>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                          showUserMenu ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl py-2 z-10">
                          {/* User Info Header */}
                          <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center">
                              <img
                                className="h-10 w-10 rounded-full mr-3"
                                src={user?.avatar || "https://picsum.photos/seed/user/40/40.jpg"}
                                alt="Profile"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                  {user?.email}
                                </p>
                                <div className="flex items-center mt-1">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 capitalize">
                                    {user?.role}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Menu Items */}
                          <div className="py-1">
                            {userMenuItems.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.label}
                                  to={item.href}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                                  onClick={() => setShowUserMenu(false)}
                                >
                                  <Icon className="h-4 w-4 mr-3 text-gray-400 group-hover:text-green-600" />
                                  <div className="flex-1">
                                    <p className="font-medium">{item.label}</p>
                                    <p className="text-xs text-gray-500">{item.description}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          
                          {/* Creator-specific options */}
                          {user?.role === 'creator' && (
                            <div className="py-1 border-t border-gray-100">
                              <Link
                                to="/creator-dashboard/analytics"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                                onClick={() => setShowUserMenu(false)}
                              >
                                <TrendingUp className="h-4 w-4 mr-3 text-gray-400 group-hover:text-green-600" />
                                <div className="flex-1">
                                  <p className="font-medium">Analytics</p>
                                  <p className="text-xs text-gray-500">View your stats</p>
                                </div>
                              </Link>
                              <Link
                                to="/creator-dashboard"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                                onClick={() => setShowUserMenu(false)}
                              >
                                <PenTool className="h-4 w-4 mr-3 text-gray-400 group-hover:text-green-600" />
                                <div className="flex-1">
                                  <p className="font-medium">Creator Dashboard</p>
                                  <p className="text-xs text-gray-500">Manage content</p>
                                </div>
                              </Link>
                            </div>
                          )}
                          
                          {/* Sign Out */}
                          <div className="py-1 border-t border-gray-100">
                            <button
                              onClick={handleSignOut}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                            >
                              <LogOut className="h-4 w-4 mr-3 text-gray-400 group-hover:text-red-600" />
                              <span className="font-medium">Sign Out</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  /* Auth Buttons for Non-Authenticated Users */
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigate("/login")}
                      className="px-3 lg:px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-full hover:bg-green-50 transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => navigate("/signup")}
                      className="px-3 lg:px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            {/* Mobile Search */}
            <div className="px-2 mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-3 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* Mobile Auth Section */}
            {isSignedIn ? (
              <div className="px-2 space-y-2">
                {/* Mobile User Profile */}
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <img
                    className="h-10 w-10 rounded-full mr-3"
                    src={user?.avatar || "https://picsum.photos/seed/user/40/40.jpg"}
                    alt="Profile"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                </div>
                
                {/* Mobile Menu Items */}
                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Link>
                  );
                })}
                
                {/* Mobile Sign Out */}
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors rounded-lg"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-2">
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-green-600 border border-green-600 hover:bg-green-50 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;