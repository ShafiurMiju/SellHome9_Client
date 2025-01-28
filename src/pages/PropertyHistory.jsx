// import React, { useState } from 'react';
// import { ChevronUp, ChevronDown } from 'lucide-react';

// const Section = ({ title, isOpen, onToggle, children }) => {
//   return (
//     <div className="mb-4">
//       <div 
//         className="flex items-center justify-between bg-gray-100 p-4 cursor-pointer"
//         onClick={onToggle}
//       >
//         <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
//         {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//       </div>
//       {isOpen && (
//         <div className="border border-gray-200 rounded-b-lg">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// const PropertyHistory = () => {
//   const [openSections, setOpenSections] = useState({
//     transactions: true,
//     listing: true,
//     mortgage: true
//   });

//   const toggleSection = (section) => {
//     setOpenSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <Section 
//         title="Past Transactions" 
//         isOpen={openSections.transactions}
//         onToggle={() => toggleSection('transactions')}
//       >
//         <div className="p-4">
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <div className="text-sm text-gray-600">Last Sale Date</div>
//               <div className="font-medium">9/6/2012</div>
//               <div className="text-xs text-gray-500">via Public Record</div>
//             </div>
//             <div>
//               <div className="text-sm text-gray-600">Last Sale Price</div>
//               <div className="font-medium">N/A</div>
//               <div className="text-xs text-gray-500">via Public Record</div>
//             </div>
//           </div>
          
//           <table className="w-full overflow-x-scroll">
//             <thead className="bg-gray-50  overflow-x-scroll">
//               <tr>
//                 <th className="px-4 py-2 text-left text-sm text-gray-600">Sale Date</th>
//                 <th className="px-4 py-2 text-left text-sm text-gray-600">Sale Price</th>
//                 <th className="px-4 py-2 text-left text-sm text-gray-600">Buyer</th>
//                 <th className="px-4 py-2 text-left text-sm text-gray-600">Seller</th>
//                 <th className="px-4 py-2 text-left text-sm text-gray-600">Document Type</th>
//                 <th className="px-4 py-2 text-left text-sm text-gray-600">Recording Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-t">
//                 <td className="px-4 py-2">9/6/2012</td>
//                 <td className="px-4 py-2">N/A</td>
//                 <td className="px-4 py-2">Samantha S Sanger, Cory J Sanger</td>
//                 <td className="px-4 py-2">Donald R Griffin, Rhonda R Griffin</td>
//                 <td className="px-4 py-2">Transfer</td>
//                 <td className="px-4 py-2">9/6/2012</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </Section>

//       <Section 
//         title="Listing History" 
//         isOpen={openSections.listing}
//         onToggle={() => toggleSection('listing')}
//       >
//         <div className="p-8 text-center text-gray-500">
//           No Listing History Available
//         </div>
//       </Section>

//       <Section 
//         title="Mortgage History" 
//         isOpen={openSections.mortgage}
//         onToggle={() => toggleSection('mortgage')}
//       >
//         <div className="p-4">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-2 text-left text-sm text-gray-600">Recording Date</th>
//                 <th className="px-4 py-2 text-left text-sm text-gray-600">Loan Type</th>
//                 <th className="px-4 py-2 text-left text-sm text-gray-600">Status</th>
//                 <th className="px-4 py-2 text-left text-sm text-gray-600">Loan Amount</th>
//                 <th className="px-4 py-2 text-left text-sm text-gray-600">Lender Name</th>
//                 <th className="px-4 py-2 text-left text-sm text-gray-600">Loan Due Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-t">
//                 <td className="px-4 py-2">9/6/2012</td>
//                 <td className="px-4 py-2">Conventional</td>
//                 <td className="px-4 py-2">
//                   <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
//                     1
//                   </span>
//                 </td>
//                 <td className="px-4 py-2">$61,750</td>
//                 <td className="px-4 py-2">GARDEN CITY STATE BANK</td>
//                 <td className="px-4 py-2">10/1/2027</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </Section>
//     </div>
//   );
// };

// export default PropertyHistory;






import React from 'react';

const PropertyHistory = () => {
  return (
    <div className="max-w-7xl mx-auto shadow-lg p-4 mt-8">
      {/* Past Transactions */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Past Transactions</h2>
        <div className="grid grid-cols-2 gap-4 border-b pb-4">
          <div>
            <p className="text-sm text-gray-500">Last Sale Date</p>
            <p className="text-md font-medium">9/6/2012</p>
            <p className="text-sm text-gray-400">via Public Record</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Sale Price</p>
            <p className="text-md font-medium">N/A</p>
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


