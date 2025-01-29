import React from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const LowCreditModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // React Router navigation

  const handleBuyCredit = () => {
    navigate("/buy-credit"); // Navigate to the Buy Credit page
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 transform transition-all">
        {/* Header with Warning Icon */}
        <div className="flex items-center space-x-3">
          <ExclamationTriangleIcon className="h-10 w-10 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-800">Insufficient Credit</h2>
        </div>

        {/* Message */}
        <p className="mt-3 text-gray-600">
          You do not have enough credit to proceed. Please buy more credit to continue.
        </p>

        {/* Buttons */}
        <div className="mt-5 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleBuyCredit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Buy Credit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LowCreditModal;
