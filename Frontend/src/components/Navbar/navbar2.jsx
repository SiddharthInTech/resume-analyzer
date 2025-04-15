import React from 'react';
import { FileText } from 'lucide-react';

function navbar2() {
  return (
    <nav className="py-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
              Resume Builder
            </span>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Resume Builder App</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Resume Examples</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Resume Templates</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Cover Letter Builder</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Career Center</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">My Account</a>
            <button className="bg-white text-orange-500 border-2 border-orange-500 rounded-full px-6 py-2 font-semibold hover:bg-orange-50 transition-colors">
              Build My Resume
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default navbar2;