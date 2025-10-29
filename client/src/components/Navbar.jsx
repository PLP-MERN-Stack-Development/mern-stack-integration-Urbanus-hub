// components/Navbar.js - Updated with Clerk Components
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { Search, Bell, Menu, X, User, Settings, LogOut, Bookmark, FileText } from 'lucide-react';

const Navbar = () => {
  const { isSignedIn, user, isLoading } = useAuth();
  const { user: clerkUser } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, user: 'Alex Chen', action: 'liked your article', time: '2 hours ago', avatar: 'https://picsum.photos/seed/user1/32/32.jpg' },
    { id: 2, user: 'Jamie Smith', action: 'commented on your post', time: '5 hours ago', avatar: 'https://picsum.photos/seed/user2/32/32.jpg' },
    { id: 3, user: 'Sam Lee', action: 'started following you', time: '1 day ago', avatar: 'https://picsum.photos/seed/user3/32/32.jpg' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-xl font-bold text-gray-800 hidden sm:block">Notely</span>
              <span className="text-lg font-bold text-gray-800 sm:hidden">N</span>
            </div>
            <div className="hidden lg:block ml-10">
              <div className="flex items-baseline space-x-4">
                <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Discover</a>
                <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Categories</a>
                <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
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
                    <div className="relative">
                      <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 rounded-full text-gray-600 hover:text-green-600 focus:outline-none transition-colors"
                      >
                        <Bell className="h-5 w-5" />
                        {hasNotifications && (
                          <span className="notification-dot absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                        )}
                      </button>
                      {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl p-4 z-10 max-h-96 overflow-y-auto">
                          <h3 className="font-semibold text-gray-800 mb-3">Notifications</h3>
                          <div className="space-y-3">
                            {notifications.map(notif => (
                              <div key={notif.id} className="flex items-start p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                                <img src={notif.avatar} alt={notif.user} className="w-8 h-8 rounded-full mr-3 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm"><span className="font-medium">{notif.user}</span> {notif.action}</p>
                                  <p className="text-xs text-gray-500">{notif.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Clerk UserButton */}
                    <div className="relative">
                      <UserButton 
                        appearance={{
                          elements: {
                            avatarBox: "h-8 w-8",
                            userButtonPopoverCard: "shadow-xl",
                            userButtonPopoverActionButton: "hover:bg-gray-50 transition-colors"
                          }
                        }}
                        afterSignOutUrl="/"
                      >
                        <UserButton.MenuItems>
                          <UserButton.Link 
                            label="My Profile" 
                            href="/profile" 
                            labelIcon={<User className="h-4 w-4" />}
                          />
                          <UserButton.Link 
                            label="My Articles" 
                            href="/my-articles" 
                            labelIcon={<FileText className="h-4 w-4" />}
                          />
                          <UserButton.Link 
                            label="Bookmarks" 
                            href="/bookmarks" 
                            labelIcon={<Bookmark className="h-4 w-4" />}
                          />
                          <UserButton.Action 
                            label="Settings" 
                            onClick={() => console.log('Settings clicked')}
                            labelIcon={<Settings className="h-4 w-4" />}
                          />
                        </UserButton.MenuItems>
                      </UserButton>
                    </div>
                  </>
                ) : (
                    <div className="flex space-x-2">
                      <SignInButton mode="modal">
                        <button className="px-3 lg:px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-full hover:bg-green-50 transition-colors">
                          Sign In
                        </button>
                      </SignInButton>
                      <SignInButton mode="modal">
                        <button className="px-3 lg:px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors">
                          Sign Up
                        </button>
                      </SignInButton>
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
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors">Home</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors">Discover</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors">Categories</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors">About</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
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
            {!isSignedIn && (
              <div className="px-2 space-y-2">
                <SignInButton mode="modal">
                  <button className="block w-full px-3 py-2 rounded-md text-base font-medium text-green-600 border border-green-600 hover:bg-green-50 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button className="block w-full px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700 transition-colors">
                    Sign Up
                  </button>
                </SignInButton>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;