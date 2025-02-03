import React, { useState } from "react";

const PropertyHistory = ({ history }) => {
  console.log("History: ", history);

  const sales = history?.data?.saleHistory || [];
  const mortgage = history?.data?.mortgageHistory || [];
  const listing = history?.data?.mlsHistory || [];
  const itemsPerPage = 5; // Show 5 records per page

  // Separate pagination state for Sales, Mortgage, and Listing
  const [currentSalesPage, setCurrentSalesPage] = useState(1);
  const [currentMortgagePage, setCurrentMortgagePage] = useState(1);
  const [currentListingPage, setCurrentListingPage] = useState(1);

  // Calculate total pages for Sales
  const totalSalesPages = Math.ceil(sales.length / itemsPerPage);

  // Get current page's data for Sales
  const currentSales = sales.slice(
    (currentSalesPage - 1) * itemsPerPage,
    currentSalesPage * itemsPerPage
  );

  // Calculate total pages for Mortgage
  const totalMortgagePages = Math.ceil(mortgage.length / itemsPerPage);

  // Get current page's data for Mortgage
  const currentMortgage = mortgage.slice(
    (currentMortgagePage - 1) * itemsPerPage,
    currentMortgagePage * itemsPerPage
  );

  // Calculate total pages for Listing
  const totalListingPages = Math.ceil(listing.length / itemsPerPage);

  // Get current page's data for Listing
  const currentListing = listing.slice(
    (currentListingPage - 1) * itemsPerPage,
    currentListingPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto shadow-lg p-4 mt-8">
      {/* Past Transactions */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Past Transactions</h2>
        <div className="grid grid-cols-2 gap-4 border-b pb-4">
          <div>
            <p className="text-sm text-gray-500">Last Sale Date</p>
            <p className="text-md font-medium">
              {history?.data?.lastSaleDate ? history?.data?.lastSaleDate : "--"}
            </p>
            <p className="text-sm text-gray-400">via Public Record</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Sale Price</p>
            <p className="text-md font-medium">
              {history?.data?.lastSalePrice > 0
                ? `$${history.data.lastSalePrice.toLocaleString()}`
                : "N/A"}
            </p>
            <p className="text-sm text-gray-400">via Public Record</p>
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-sm text-gray-500">
            {currentSales.length > 0 && (
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
            )}
            <tbody>
              {currentSales.length > 0 ? (
                currentSales.map((sale, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="py-2 px-4">
                      {sale.saleDate
                        ? new Date(sale.saleDate).toLocaleDateString("en-US")
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {sale.saleAmount
                        ? `$${sale.saleAmount.toLocaleString("en-US")}`
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4">{sale.buyerNames || "N/A"}</td>
                    <td className="py-2 px-4">{sale.sellerNames || "N/A"}</td>
                    <td className="py-2 px-4">{sale.documentType || "N/A"}</td>
                    <td className="py-2 px-4">
                      {sale.recordingDate
                        ? new Date(sale.recordingDate).toLocaleDateString(
                            "en-US"
                          )
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="bg-gray-100 text-center py-6 text-gray-500 text-[16px]"
                  >
                    No sale history available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination Controls for Sales */}
          {totalSalesPages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() =>
                  setCurrentSalesPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentSalesPage === 1}
                className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-4 py-2">{`Page ${currentSalesPage} of ${totalSalesPages}`}</span>
              <button
                onClick={() =>
                  setCurrentSalesPage((prev) =>
                    Math.min(prev + 1, totalSalesPages)
                  )
                }
                disabled={currentSalesPage === totalSalesPages}
                className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Listing History */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Listing History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            {currentListing.length > 0 && (
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Listing ID</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Price Per Sqft</th>
                  <th className="py-2 px-4">Agent Name</th>
                </tr>
              </thead>
            )}
            <tbody>
              {currentListing.length > 0 ? (
                currentListing.map((listing, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="py-2 px-4">
                      {new Date(listing.lastStatusDate).toLocaleDateString() || "N/A"}
                    </td>
                    <td className="py-2 px-4">{listing.listingId || "N/A"}</td>
                    <td className="py-2 px-4">{listing.status || "N/A"}</td>
                    <td className="py-2 px-4">
                      {listing.price
                        ? `$${listing.price.toLocaleString("en-US")}`
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {listing.price &&
                      history?.data?.propertyInfo?.buildingSquareFeet
                        ? `$${Math.round(
                            listing.price /
                              history.data.propertyInfo.buildingSquareFeet
                          )}`
                        : "N/A"}
                    </td>{" "}
                    <td className="py-2 px-4">{listing.agentName || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="bg-gray-100 text-center py-6 text-gray-500 text-[16px]"
                  >
                    No listing history available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination Controls for Listing */}
          {totalListingPages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() =>
                  setCurrentListingPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentListingPage === 1}
                className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-4 py-2">{`Page ${currentListingPage} of ${totalListingPages}`}</span>
              <button
                onClick={() =>
                  setCurrentListingPage((prev) =>
                    Math.min(prev + 1, totalListingPages)
                  )
                }
                disabled={currentListingPage === totalListingPages}
                className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mortgage History */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Mortgage History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            {currentMortgage.length > 0 && (
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
            )}
            <tbody>
              {currentMortgage.length > 0 ? (
                currentMortgage.map((mortgage, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="py-2 px-4">
                      {mortgage.recordingDate
                        ? new Date(mortgage.recordingDate).toLocaleDateString(
                            "en-US"
                          )
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4">{mortgage.loanType || "N/A"}</td>
                    <td className="py-2 px-4">{mortgage.status || "N/A"}</td>
                    <td className="py-2 px-4">
                      {mortgage.amount
                        ? `$${mortgage.amount.toLocaleString("en-US")}`
                        : ""}
                    </td>
                    <td className="py-2 px-4">
                      {mortgage.lenderName || "N/A"}
                    </td>
                    <td className="py-2 px-4">
                      {mortgage.maturityDate
                        ? new Date(mortgage.maturityDate).toLocaleDateString(
                            "en-US"
                          )
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="bg-gray-100 text-center py-6 text-gray-500 text-[16px]"
                  >
                    No mortgage history available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination Controls for Mortgage */}
          {totalMortgagePages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() =>
                  setCurrentMortgagePage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentMortgagePage === 1}
                className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-4 py-2">{`Page ${currentMortgagePage} of ${totalMortgagePages}`}</span>
              <button
                onClick={() =>
                  setCurrentMortgagePage((prev) =>
                    Math.min(prev + 1, totalMortgagePages)
                  )
                }
                disabled={currentMortgagePage === totalMortgagePages}
                className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyHistory;
