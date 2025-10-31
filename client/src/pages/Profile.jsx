// pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, MapPin, Edit, Camera, Check, X } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: '',
    location: '',
    website: '',
    joinedDate: 'January 2023'
  });
  const [tempProfileData, setTempProfileData] = useState(profileData);
  const [profileImage, setProfileImage] = useState(user?.avatar || "https://picsum.photos/seed/user/200/200.jpg");
  const [tempProfileImage, setTempProfileImage] = useState(profileImage);

  const handleEdit = () => {
    setTempProfileData(profileData);
    setTempProfileImage(profileImage);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempProfileData(profileData);
    setTempProfileImage(profileImage);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfileData(tempProfileData);
    setProfileImage(tempProfileImage);
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500"></div>
          
          {/* Profile Header */}
          <div className="px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 sm:-mt-12">
              <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
                    src={isEditing ? tempProfileImage : profileImage}
                    alt="Profile"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition-colors">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
                
                {/* Profile Info */}
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempProfileData.firstName}
                        onChange={(e) => setTempProfileData({...tempProfileData, firstName: e.target.value})}
                        className="border-b border-gray-300 focus:border-green-500 outline-none px-1"
                      />
                    ) : (
                      profileData.firstName
                    )}{' '}
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempProfileData.lastName}
                        onChange={(e) => setTempProfileData({...tempProfileData, lastName: e.target.value})}
                        className="border-b border-gray-300 focus:border-green-500 outline-none px-1"
                      />
                    ) : (
                      profileData.lastName
                    )}
                  </h1>
                  <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                  <div className="flex items-center justify-center sm:justify-start mt-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {profileData.joinedDate}
                  </div>
                </div>
              </div>
              
              {/* Edit/Save/Cancel Buttons */}
              <div className="mt-4 sm:mt-0">
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Profile Details */}
          <div className="px-4 sm:px-6 lg:px-8 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Bio</h3>
                  {isEditing ? (
                    <textarea
                      value={tempProfileData.bio}
                      onChange={(e) => setTempProfileData({...tempProfileData, bio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows="4"
                      placeholder="Tell us about yourself..."
                    ></textarea>
                  ) : (
                    <p className="text-gray-700">
                      {profileData.bio || "No bio added yet."}
                    </p>
                  )}
                </div>
                
                {/* Location */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Location</h3>
                  {isEditing ? (
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={tempProfileData.location}
                        onChange={(e) => setTempProfileData({...tempProfileData, location: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="City, Country"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {profileData.location || "No location added yet."}
                    </div>
                  )}
                </div>
                
                {/* Website */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Website</h3>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempProfileData.website}
                      onChange={(e) => setTempProfileData({...tempProfileData, website: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  ) : (
                    <a 
                      href={profileData.website || "#"} 
                      className="text-blue-600 hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profileData.website || "No website added yet."}
                    </a>
                  )}
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Email */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {profileData.email}
                  </div>
                </div>
                
                {/* Stats */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">24</div>
                      <div className="text-sm text-gray-500">Articles</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">1.2k</div>
                      <div className="text-sm text-gray-500">Followers</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">186</div>
                      <div className="text-sm text-gray-500">Following</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">42</div>
                      <div className="text-sm text-gray-500">Bookmarks</div>
                    </div>
                  </div>
                </div>
                
                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Social Links</h3>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;