// components/Footer.js - Footer Component
import React, { useState } from 'react';
import { Twitter, Facebook, Instagram, Linkedin, Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } else {
      toast.error('Please enter your email address');
    }
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container-responsive py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-xl font-bold">Notely</span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover thoughtful content from writers who have something genuine to say.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">How it works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Forum</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Creators</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe to our newsletter
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 flex-1 text-sm"
              />
              <button 
                type="submit"
                className="px-3 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2023 Notely. All rights reserved.
          </p>
          <div className="flex space-x-4 sm:space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;