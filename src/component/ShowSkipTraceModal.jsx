import React from 'react';

const ShowSkipTraceModal = ({userInfo, confirmSkipTrace, cancelSkipTrace}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md text-center">
              <h2 className="text-lg font-bold mb-1">Confirm Skip Trace</h2>
              <p className="text-base font-semibold mb-3">
                Total Credit: {userInfo && userInfo.credit ? userInfo.credit : "Loading..."}
              </p>
              <p className="text-gray-600 mb-3">
                Are you sure you want to reveal this information?
              </p>
              <p className="text-black mb-6 text-sm font-medium">
                10 Credit Will Be spent
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmSkipTrace}
                  className="px-4 py-2 bg-teal-500 text-white rounded"
                >
                  Yes
                </button>
                <button
                  onClick={cancelSkipTrace}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
    );
};

export default ShowSkipTraceModal;