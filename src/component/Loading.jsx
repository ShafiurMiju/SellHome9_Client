import React from 'react';
import { Home } from 'lucide-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-70 flex items-center justify-center z-20 transition-opacity duration-500 opacity-100">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-xl space-y-4 transform transition-all duration-500 scale-95 hover:scale-100">
        <div className="relative animate-pulse">
          <Home className="w-14 h-14 text-blue-600 animate-bounce" />
          <div className="absolute inset-0 animate-spin">
            <div className="h-2 w-2 bg-blue-600 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
        </div>
        <p className="text-gray-700 mt-4 font-semibold text-lg">We're Finding Your Dream Home!</p>
        <p className="text-gray-500 text-sm mt-2">Hang tight while we load your properties...</p>
      </div>
    </div>
  );
};

export default Loading;
