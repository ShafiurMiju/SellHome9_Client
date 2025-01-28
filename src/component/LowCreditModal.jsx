import React from 'react';

const LowCreditModal = ({errorMessage,setCreditPopup,userInfo, loading}) => {
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md text-center">
          <h2 className="text-lg font-bold mb-4">{errorMessage?.message}</h2>
          <p className="text-gray-600 mb-6">
          You have only {userInfo && userInfo.credit ? userInfo.credit : "Loading..."} credit. <br />
          Do you want to buy more credits?
          </p>
          <div className="flex justify-center gap-4">
            <button
            //   onClick={handleApiCall}
              className={`px-4 py-2 bg-teal-500 text-white rounded ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Yes"}
            </button>
            <button
              onClick={() => setCreditPopup(false)}
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

export default LowCreditModal;