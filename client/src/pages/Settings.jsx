// pages/Settings.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Bell, Shield, Palette, Globe, HelpCircle, Save, Check, X } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState('');
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: '',
    location: '',
    website: '',
    language: 'en',
    timezone: 'UTC'
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    newFollowers: true,
    articleComments: true,
    weeklyDigest: true
  });
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showActivity: true,
    allowMessages: 'followers'
  });
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    sidebarCollapsed: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'advanced', label: 'Advanced', icon: Globe }
  ];

  const handleSave = (section) => {
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);
  };

  const handleInputChange = (section, field, value) => {
    switch (section) {
      case 'profile':
        setProfileData({...profileData, [field]: value});
        break;
      case 'notifications':
        setNotificationSettings({...notificationSettings, [field]: value});
        break;
      case 'privacy':
        setPrivacySettings({...privacySettings, [field]: value});
        break;
      case 'appearance':
        setAppearanceSettings({...appearanceSettings, [field]: value});
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account settings and preferences.</p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 mr-2" />
                      {tab.label}
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('profile', 'firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('profile', 'lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('profile', 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>
                    <input
                      type="text"
                      id="website"
                      value={profileData.website}
                      onChange={(e) => handleInputChange('profile', 'website', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <select
                      id="language"
                      value={profileData.language}
                      onChange={(e) => handleInputChange('profile', 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      value={profileData.timezone}
                      onChange={(e) => handleInputChange('profile', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="MST">Mountain Time (MST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleSave('profile')}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    {saveStatus === 'saving' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : saveStatus === 'saved' ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === 'account' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Email Address</h3>
                    <div className="flex items-center">
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <button className="ml-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Change Password</h3>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        Update Password
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-md font-medium text-gray-900 mb-3 text-red-600">Danger Zone</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive email updates about your account activity</p>
                        </div>
                        <button
                          onClick={() => handleInputChange('notifications', 'emailNotifications', !notificationSettings.emailNotifications)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notificationSettings.emailNotifications ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Marketing Emails</p>
                          <p className="text-sm text-gray-500">Receive emails about new features and updates</p>
                        </div>
                        <button
                          onClick={() => handleInputChange('notifications', 'marketingEmails', !notificationSettings.marketingEmails)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notificationSettings.marketingEmails ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notificationSettings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">New Followers</p>
                          <p className="text-sm text-gray-500">Get notified when someone follows you</p>
                        </div>
                        <button
                          onClick={() => handleInputChange('notifications', 'newFollowers', !notificationSettings.newFollowers)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notificationSettings.newFollowers ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notificationSettings.newFollowers ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Article Comments</p>
                          <p className="text-sm text-gray-500">Get notified when someone comments on your articles</p>
                        </div>
                        <button
                          onClick={() => handleInputChange('notifications', 'articleComments', !notificationSettings.articleComments)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notificationSettings.articleComments ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notificationSettings.articleComments ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Weekly Digest</p>
                          <p className="text-sm text-gray-500">Receive a weekly summary of popular articles</p>
                        </div>
                        <button
                          onClick={() => handleInputChange('notifications', 'weeklyDigest', !notificationSettings.weeklyDigest)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notificationSettings.weeklyDigest ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notificationSettings.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Push Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-700">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                      </div>
                      <button
                        onClick={() => handleInputChange('notifications', 'pushNotifications', !notificationSettings.pushNotifications)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notificationSettings.pushNotifications ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleSave('notifications')}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    {saveStatus === 'saving' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : saveStatus === 'saved' ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Profile Visibility</h3>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-700 mb-1">
                          Who can see your profile?
                        </label>
                        <select
                          id="profileVisibility"
                          value={privacySettings.profileVisibility}
                          onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="public">Everyone</option>
                          <option value="followers">Followers Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Show Email Address</p>
                          <p className="text-sm text-gray-500">Display your email on your public profile</p>
                        </div>
                        <button
                          onClick={() => handleInputChange('privacy', 'showEmail', !privacySettings.showEmail)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacySettings.showEmail ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacySettings.showEmail ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Show Activity</p>
                          <p className="text-sm text-gray-500">Display your reading activity on your profile</p>
                        </div>
                        <button
                          onClick={() => handleInputChange('privacy', 'showActivity', !privacySettings.showActivity)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacySettings.showActivity ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacySettings.showActivity ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Messaging</h3>
                    <div>
                      <label htmlFor="allowMessages" className="block text-sm font-medium text-gray-700 mb-1">
                        Who can send you messages?
                      </label>
                      <select
                        id="allowMessages"
                        value={privacySettings.allowMessages}
                        onChange={(e) => handleInputChange('privacy', 'allowMessages', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="everyone">Everyone</option>
                        <option value="followers">Followers Only</option>
                        <option value="noone">No One</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleSave('privacy')}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    {saveStatus === 'saving' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : saveStatus === 'saved' ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Appearance Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Theme</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => handleInputChange('appearance', 'theme', 'light')}
                        className={`p-4 border rounded-lg ${
                          appearanceSettings.theme === 'light' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300'
                        }`}
                      >
                        <div className="h-12 bg-white rounded mb-2 border border-gray-200"></div>
                        <p className="text-sm font-medium">Light</p>
                      </button>
                      <button
                        onClick={() => handleInputChange('appearance', 'theme', 'dark')}
                        className={`p-4 border rounded-lg ${
                          appearanceSettings.theme === 'dark' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300'
                        }`}
                      >
                        <div className="h-12 bg-gray-800 rounded mb-2"></div>
                        <p className="text-sm font-medium">Dark</p>
                      </button>
                      <button
                        onClick={() => handleInputChange('appearance', 'theme', 'auto')}
                        className={`p-4 border rounded-lg ${
                          appearanceSettings.theme === 'auto' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300'
                        }`}
                      >
                        <div className="h-12 bg-gradient-to-r from-white to-gray-800 rounded mb-2"></div>
                        <p className="text-sm font-medium">Auto</p>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Font Size</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => handleInputChange('appearance', 'fontSize', 'small')}
                        className={`p-4 border rounded-lg ${
                          appearanceSettings.fontSize === 'small' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300'
                        }`}
                      >
                        <p className="text-sm">Small</p>
                      </button>
                      <button
                        onClick={() => handleInputChange('appearance', 'fontSize', 'medium')}
                        className={`p-4 border rounded-lg ${
                          appearanceSettings.fontSize === 'medium' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300'
                        }`}
                      >
                        <p className="text-base">Medium</p>
                      </button>
                      <button
                        onClick={() => handleInputChange('appearance', 'fontSize', 'large')}
                        className={`p-4 border rounded-lg ${
                          appearanceSettings.fontSize === 'large' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300'
                        }`}
                      >
                        <p className="text-lg">Large</p>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-700">Collapse Sidebar by Default</p>
                      <p className="text-sm text-gray-500">Start with the sidebar collapsed on desktop</p>
                    </div>
                    <button
                      onClick={() => handleInputChange('appearance', 'sidebarCollapsed', !appearanceSettings.sidebarCollapsed)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        appearanceSettings.sidebarCollapsed ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          appearanceSettings.sidebarCollapsed ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => handleSave('appearance')}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    {saveStatus === 'saving' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : saveStatus === 'saved' ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Advanced Settings */}
            {activeTab === 'advanced' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">Advanced Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Data & Privacy</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-700">Download Your Data</p>
                            <p className="text-sm text-gray-500">Get a copy of all your data</p>
                          </div>
                          <div className="text-green-600">
                            <Globe className="h-5 w-5" />
                          </div>
                        </div>
                      </button>
                      
                      <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-700">Export Bookmarks</p>
                            <p className="text-sm text-gray-500">Export your bookmarks as a JSON file</p>
                          </div>
                          <div className="text-green-600">
                            <Bookmark className="h-5 w-5" />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Account Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-700">Deactivate Account</p>
                            <p className="text-sm text-gray-500">Temporarily disable your account</p>
                          </div>
                          <div className="text-yellow-600">
                            <X className="h-5 w-5" />
                          </div>
                        </div>
                      </button>
                      
                      <button className="w-full text-left px-4 py-3 border border-red-300 rounded-md hover:bg-red-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-red-600">Delete Account</p>
                            <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                          </div>
                          <div className="text-red-600">
                            <Trash2 className="h-5 w-5" />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Help & Support</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-700">Help Center</p>
                            <p className="text-sm text-gray-500">Get help with using the platform</p>
                          </div>
                          <div className="text-green-600">
                            <HelpCircle className="h-5 w-5" />
                          </div>
                        </div>
                      </button>
                      
                      <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-700">Contact Support</p>
                            <p className="text-sm text-gray-500">Get in touch with our support team</p>
                          </div>
                          <div className="text-green-600">
                            <Mail className="h-5 w-5" />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;