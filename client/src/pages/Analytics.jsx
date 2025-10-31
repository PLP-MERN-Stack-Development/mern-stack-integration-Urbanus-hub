// pages/Analytics.js
import React, { useState, useEffect } from 'react';
import { TrendingUp, Eye, Heart, MessageCircle, Users, Calendar, BarChart3, PieChart, Activity, Download, Filter } from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    followers: 0,
    articles: 0,
    viewHistory: [],
    topArticles: [],
    referrers: [],
    devices: [],
    locations: []
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAnalyticsData({
        views: 12543,
        likes: 892,
        comments: 342,
        shares: 128,
        followers: 432,
        articles: 24,
        viewHistory: [
          { date: '2023-10-15', views: 320 },
          { date: '2023-10-16', views: 412 },
          { date: '2023-10-17', views: 385 },
          { date: '2023-10-18', views: 456 },
          { date: '2023-10-19', views: 523 },
          { date: '2023-10-20', views: 487 },
          { date: '2023-10-21', views: 612 },
          { date: '2023-10-22', views: 589 },
          { date: '2023-10-23', views: 634 },
          { date: '2023-10-24', views: 678 },
          { date: '2023-10-25', views: 723 },
          { date: '2023-10-26', views: 689 },
          { date: '2023-10-27', views: 745 },
          { date: '2023-10-28', views: 812 },
          { date: '2023-10-29', views: 789 },
          { date: '2023-10-30', views: 856 },
          { date: '2023-10-31', views: 923 },
          { date: '2023-11-01', views: 897 },
          { date: '2023-11-02', views: 945 },
          { date: '2023-11-03', views: 1012 },
          { date: '2023-11-04', views: 987 },
          { date: '2023-11-05', views: 1056 },
          { date: '2023-11-06', views: 1023 },
          { date: '2023-11-07', views: 1089 },
          { date: '2023-11-08', views: 1156 },
          { date: '2023-11-09', views: 1123 },
          { date: '2023-11-10', views: 1190 },
          { date: '2023-11-11', views: 1167 },
          { date: '2023-11-12', views: 1234 },
          { date: '2023-11-13', views: 1201 },
          { date: '2023-11-14', views: 1268 }
        ],
        topArticles: [
          {
            id: 1,
            title: "Getting Started with React Hooks",
            views: 3421,
            likes: 234,
            comments: 45,
            publishedAt: "2023-10-15"
          },
          {
            id: 2,
            title: "Building Scalable Node.js Applications",
            views: 2856,
            likes: 189,
            comments: 32,
            publishedAt: "2023-10-28"
          },
          {
            id: 3,
            title: "Modern JavaScript Features You Should Know",
            views: 2345,
            likes: 156,
            comments: 28,
            publishedAt: "2023-11-05"
          },
          {
            id: 4,
            title: "CSS Grid vs Flexbox: When to Use Which",
            views: 1987,
            likes: 134,
            comments: 21,
            publishedAt: "2023-10-20"
          },
          {
            id: 5,
            title: "Introduction to TypeScript",
            views: 1934,
            likes: 179,
            comments: 16,
            publishedAt: "2023-11-12"
          }
        ],
        referrers: [
          { source: "Direct", visitors: 4234, percentage: 33.7 },
          { source: "Google", visitors: 3456, percentage: 27.5 },
          { source: "Twitter", visitors: 2134, percentage: 17.0 },
          { source: "LinkedIn", visitors: 1567, percentage: 12.5 },
          { source: "Facebook", visitors: 876, percentage: 7.0 },
          { source: "Other", visitors: 276, percentage: 2.2 }
        ],
        devices: [
          { type: "Desktop", visitors: 7234, percentage: 57.6 },
          { type: "Mobile", visitors: 4567, percentage: 36.4 },
          { type: "Tablet", visitors: 742, percentage: 5.9 }
        ],
        locations: [
          { country: "United States", visitors: 5234, percentage: 41.7 },
          { country: "United Kingdom", visitors: 2134, percentage: 17.0 },
          { country: "Canada", visitors: 1567, percentage: 12.5 },
          { country: "Germany", visitors: 1234, percentage: 9.8 },
          { country: "France", visitors: 987, percentage: 7.9 },
          { country: "Other", visitors: 1387, percentage: 11.1 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const handleExportData = () => {
    // Simulate data export
    alert('Analytics data exported successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="mt-2 text-gray-600">Track your content performance and audience engagement.</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <div className="flex items-center bg-white rounded-lg shadow border border-gray-200">
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-2 text-sm font-medium rounded-l-lg ${
                  timeRange === '7d' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-2 text-sm font-medium ${
                  timeRange === '30d' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setTimeRange('90d')}
                className={`px-3 py-2 text-sm font-medium rounded-r-lg ${
                  timeRange === '90d' 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                90 Days
              </button>
            </div>
            
            <button
              onClick={handleExportData}
              className="flex items-center px-4 py-2 bg-white text-gray-700 rounded-lg shadow border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-xl font-semibold text-gray-900">{analyticsData.views.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12.5%</p>
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
                <p className="text-xl font-semibold text-gray-900">{analyticsData.likes.toLocaleString()}</p>
                <p className="text-xs text-green-600">+8.3%</p>
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
                <p className="text-xl font-semibold text-gray-900">{analyticsData.comments.toLocaleString()}</p>
                <p className="text-xs text-green-600">+15.2%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Followers</p>
                <p className="text-xl font-semibold text-gray-900">{analyticsData.followers.toLocaleString()}</p>
                <p className="text-xs text-green-600">+5.7%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Articles</p>
                <p className="text-xl font-semibold text-gray-900">{analyticsData.articles}</p>
                <p className="text-xs text-gray-500">+2 this month</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                <Activity className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagement</p>
                <p className="text-xl font-semibold text-gray-900">11.2%</p>
                <p className="text-xs text-green-600">+2.1%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Views Over Time Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Views Over Time</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <Filter className="h-5 w-5" />
              </button>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would go here</p>
                <p className="text-sm text-gray-400 mt-1">Integration with chart library needed</p>
              </div>
            </div>
          </div>
          
          {/* Top Performing Articles */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Top Performing Articles</h2>
            <div className="space-y-3">
              {analyticsData.topArticles.map((article, index) => (
                <div key={article.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{article.title}</p>
                      <p className="text-xs text-gray-500">{article.publishedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-500 ml-2 flex-shrink-0">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {article.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      {article.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {article.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Traffic Sources */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h2>
            <div className="space-y-3">
              {analyticsData.referrers.map((referrer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{referrer.source}</p>
                  </div>
                  <div className="flex items-center ml-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${referrer.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{referrer.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Device Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Device Breakdown</h2>
            <div className="space-y-3">
              {analyticsData.devices.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{device.type}</p>
                  </div>
                  <div className="flex items-center ml-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Geographic Distribution */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Geographic Distribution</h2>
            <div className="space-y-3">
              {analyticsData.locations.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{location.country}</p>
                  </div>
                  <div className="flex items-center ml-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${location.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{location.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;