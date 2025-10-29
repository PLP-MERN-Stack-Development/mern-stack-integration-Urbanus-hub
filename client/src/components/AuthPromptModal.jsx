// components/AuthPromptModal.js - Authentication Prompt Modal
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, X } from 'lucide-react';

const AuthPromptModal = ({ onClose }) => {
  const { signIn } = useAuth();

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <Lock className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in to continue</h3>
          <p className="text-sm text-gray-500 mb-6">
            You need to be signed in to like, comment, or bookmark articles.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                signIn();
                onClose();
              }}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPromptModal;