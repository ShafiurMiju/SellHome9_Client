import React from "react";

const LoginError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {/* Error Icon */}
      <div className="bg-red-100 p-4 rounded-full mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856C18.18 20.993 21 17.418 21 12.993 21 9.413 18.592 7 15.007 7H8.993C5.41 7 3 9.41 3 12.993 3 17.418 5.82 20.993 8.062 21z"
          />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Something went wrong</h1>

      {/* Description */}
      <p className="text-gray-600 mb-6">
        We encountered an issue. Please use the sidebar to continue navigating.
      </p>

      {/* Sidebar Button */}
      {/* <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        Open Sidebar
      </button> */}
    </div>
  );
};

export default LoginError;
