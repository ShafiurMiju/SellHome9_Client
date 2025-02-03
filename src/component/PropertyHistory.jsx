import React from 'react';

const PropertyHistory = ({ history }) => {
    console.log("History: ", history)
  return (
    <div className="max-w-7xl mx-auto shadow-lg p-4 mt-8">
      {/* Past Transactions */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Past Transactions</h2>
        <div className="grid grid-cols-2 gap-4 border-b pb-4">
          <div>
            <p className="text-sm text-gray-500">Last Sale Date</p>
            <p className="text-md font-medium">{history.data.lastSaleDate ? history.data.lastSaleDate : "--"}</p>
            <p className="text-sm text-gray-400">via Public Record</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Sale Price</p>
            <p className="text-md font-medium">${history.data.lastSalePrice ? history.data.lastSalePrice?.toLocaleString() : "N/A"}</p>
            <p className="text-sm text-gray-400">via Public Record</p>
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-2 px-4">Sale Date</th>
                <th className="py-2 px-4">Sale Price</th>
                <th className="py-2 px-4">Buyer</th>
                <th className="py-2 px-4">Seller</th>
                <th className="py-2 px-4">Document Type</th>
                <th className="py-2 px-4">Recording Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="py-2 px-4">9/6/2012</td>
                <td className="py-2 px-4">N/A</td>
                <td className="py-2 px-4">Samantha S Sanger, Cory J Sanger</td>
                <td className="py-2 px-4">Donald R Griffin, Rhonda R Griffin</td>
                <td className="py-2 px-4">Transfer</td>
                <td className="py-2 px-4">9/6/2012</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Listing History */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Listing History</h2>
        <div className="bg-gray-100 text-center py-6 text-gray-500">
          No Listing History Available
        </div>
      </div>

      {/* Mortgage History */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Mortgage History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-2 px-4">Recording Date</th>
                <th className="py-2 px-4">Loan Type</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Loan Amount</th>
                <th className="py-2 px-4">Lender Name</th>
                <th className="py-2 px-4">Loan Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="py-2 px-4">9/6/2012</td>
                <td className="py-2 px-4">Conventional</td>
                <td className="py-2 px-4">1</td>
                <td className="py-2 px-4">$61,750</td>
                <td className="py-2 px-4">GARDEN CITY STATE BANK</td>
                <td className="py-2 px-4">10/1/2027</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyHistory;