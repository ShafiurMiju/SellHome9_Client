import React from 'react';

const ShowPropertyModal = ({handleApiCall, loading, setShowPropertyPopup}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md text-center">
          <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
          <p className="text-gray-600 mb-6">
            Do you want to fetch property details?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleApiCall}
              className={`px-4 py-2 bg-teal-500 text-white rounded ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Yes"}
            </button>
            <button
              onClick={() => setShowPropertyPopup(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              disabled={loading} // Disable "No" button when loading
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
};

export default ShowPropertyModal;