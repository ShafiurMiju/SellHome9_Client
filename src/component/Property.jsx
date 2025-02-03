import { Bath, Bed, ChevronDown, ChevronUp, SquareIcon } from "lucide-react";
import React, { useState } from "react";

const Property = ({ property }) => {
  const { data } = property || {};
  const { currentMortgages } = property?.data || {};
  const { propertyInfo } = property?.data || {};
  const { lotInfo } = property?.data || {};
  const { taxInfo } = property?.data || {};
  // console.log(propertyInfo);

  const properties = {
    address: propertyInfo.address.address,
    city: propertyInfo.address.city,
    state: propertyInfo.address.state,
    zip: propertyInfo.address.zip,
    price: data?.estimatedValue?.toLocaleString(),
    beds: propertyInfo?.bedrooms,
    baths: propertyInfo?.bathrooms,
    sqft: propertyInfo?.livingSquareFeet?.toLocaleString(),
    image:
      "https://img.freepik.com/free-photo/cityscape-wuxi_1127-3968.jpg?ga=GA1.1.1644760819.1734589298&semt=ais_tags_boosted",
    lastMortgage: [
      {
        label: "Last Recording Date",
        value: currentMortgages[0]?.recordingDate
          ? new Date(currentMortgages[0].recordingDate).toLocaleDateString(
              "en-US"
            )
          : "N/A",
      },
      { label: "Loan Type", value: currentMortgages[0]?.loanType },
      {
        label: "Original Loan Amount",
        value: currentMortgages[0]?.amount?.toLocaleString(),
      },
      {
        label: "Loan Term",
        value: currentMortgages[0]?.term + " " + currentMortgages[0]?.termType,
      },
      {
        label: "Est. Interest Rate",
        value: currentMortgages[0]?.interestRate
          ? currentMortgages[0]?.interestRate
          : "--",
      },
      {
        label: "Interest Rate Type",
        value: currentMortgages[0]?.interestRateType
          ? currentMortgages[0]?.interestRateType
          : "--",
      },
      {
        label: "Est. Loan Payment",
        value: "--",
      },
      {
        label: "Est. Loan Balance",
        value: "--",
      },
      {
        label: "Loan Maturity Date",
        value: currentMortgages[0]?.maturityDate
          ? new Date(currentMortgages[0].maturityDate).toLocaleDateString(
              "en-US"
            )
          : "N/A",
      },
      { label: "Lender Name", value: currentMortgages[0]?.lenderName },
      { label: "Lender Type", value: currentMortgages[0]?.lenderType },
    ],
    propertyCharacteristics: [
      {
        label: "Living Area",
        value: propertyInfo?.livingSquareFeet?.toLocaleString() + " SqFt",
      },
      { label: "Year Built", value: propertyInfo?.yearBuilt },
      { label: "# of Units", value: propertyInfo?.unitsCount },
      { label: "Bedrooms", value: propertyInfo?.bedrooms },
      { label: "Bathrooms", value: propertyInfo?.bathrooms },
      { label: "Heating Type", value: propertyInfo?.heatingType },
      { label: "Pool", value: propertyInfo?.pool ? "Yes" : "No" },
      { label: "Property Type", value: data?.propertyType },
      { label: "Stories", value: propertyInfo?.stories },
    ],
    landInformation: [
      {
        label: "Legal Description",
        value: lotInfo?.legalDescription ? lotInfo?.legalDescription : "--",
      },
      {
        label: "Subdivision Name",
        value: lotInfo?.subdivision ? lotInfo?.subdivision : "--",
      },
      { label: "APN", value: lotInfo?.apn },
      {
        label: "Property Class",
        value: lotInfo?.landUse ? lotInfo?.landUse : "--",
      },
      { label: "County Land Use Code", value: propertyInfo?.propertyUseCode },
      { label: "Property Type", value: data?.propertyType },
      { label: "Census Tract", value: lotInfo?.censusTract },
      {
        label: "Lot Size (SqFt)",
        value: lotInfo?.lotSquareFeet?.toLocaleString() + " SqFt",
      },
      { label: "Lot Size (Acres)", value: lotInfo?.lotAcres + " Acres" },
      { label: "Lot Number", value: lotInfo?.lotNumber },
    ],
    taxInformation: [
      {
        label: "Tax Delinquent?",
        value: taxInfo?.taxDelinquentYear ? "Yes" : "No",
      },
      {
        label: "Tax Delinquent Year",
        value: taxInfo?.taxDelinquentYear ? taxInfo?.taxDelinquentYear : "--",
      },
      { label: "Tax Year", value: taxInfo?.year },
      {
        label: "Tax Amount",
        value: "$" + taxInfo?.taxAmount?.toLocaleString(),
      },
      { label: "Assessment Year", value: taxInfo?.assessmentYear },
      {
        label: "Total Assessed Value",
        value: "$" + taxInfo?.assessedValue?.toLocaleString(),
      },
      {
        label: "Assessed Land Value",
        value: "$" + taxInfo?.assessedLandValue?.toLocaleString(),
      },
      {
        label: "Assessed Improvement Value",
        value: "$" + taxInfo?.assessedImprovementValue?.toLocaleString(),
      },
      {
        label: "Total Market Value",
        value: "$" + taxInfo?.marketValue?.toLocaleString(),
      },
      {
        label: "Market Improvement Value",
        value: "$" + taxInfo?.marketImprovementValue?.toLocaleString(),
      },
      {
        label: "Market Land Value",
        value: "$" + taxInfo?.marketLandValue?.toLocaleString(),
      },
    ],
  };

  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    propertyCharacteristics: true,
    lastMortgage: false,
    landInformation: false,
    taxInformation: false,
  });

  // Toggle function for sections
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto bg-white pt-8 shadow-lg px-2 pb-3">
      <div className="flex flex-col lg:flex-row gap-[20px]">
        {/* Left side - Image and Text */}
        <div className="relative w-full lg:w-1/2 p-2 sm:p-3 lg:p-0  ">
          <img
            src={properties?.image}
            alt={properties?.address}
            className="w-full h-[400px] object-cover"
          />
          {/* Header */}
          <div className="flex justify-between items-start mb-4 pt-4">
            <div>
              <h1 className="text-base sm:text-lg md:text-2xl font-semibold">
                {properties?.address}
              </h1>
              <p className="text-gray-600">
                {properties?.city}, {properties?.state} {properties?.zip}
              </p>
            </div>
            <div className="text-right">
              <p className="text-base sm:text-lg md:text-2xl font-bold">
                ${properties?.price}
              </p>
              <p className="text-sm text-gray-600">Estimated Value</p>
            </div>
          </div>

          {/* Property stats */}
          <div className="flex gap-6 mb-4">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-gray-600" />
              <span className="font-medium">{properties?.beds}</span>
              <span className="text-gray-600">Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-gray-600" />
              <span className="font-medium">{properties?.baths}</span>
              <span className="text-gray-600">Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <SquareIcon className="h-5 w-5 text-gray-600" />
              <span className="font-medium">{properties?.sqft}</span>
              <span className="text-gray-600">SqFt</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-6">
            {[
              data?.absenteeOwner && "Absentee Owner",
              data?.highEquity && "High Equity",
              data?.freeClear && "Free & Clear",
              data?.floodZone && "Flood Zone",
              data?.inherited && "Inherited",
            ]
              .filter(Boolean) // Remove falsy values
              .map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>

        {/* Right side - Details */}
        <div className="w-full lg:w-1/2 p-2 sm:p-3 lg:p-0">
          {/* Collapsible sections */}
          <div className="space-y-2">
            {/* Mortgage Section */}
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection("lastMortgage")}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">Mortgage & Equity</span>
                {openSections.lastMortgage ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {openSections.lastMortgage && (
                <div className="p-4 border-t">
                  <div className="px-4 py-2">
                    {properties?.lastMortgage==null ? (
                      properties.lastMortgage.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between py-2 border-b last:border-0"
                        >
                          <span className="text-gray-600">{item.label}</span>
                          <span className="font-medium">{item.value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">
                        No mortgage data available.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Property Characteristics */}
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection("propertyCharacteristics")}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">Property Characteristics</span>
                {openSections.propertyCharacteristics ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {openSections.propertyCharacteristics && (
                <div className="border-t">
                  <div className="px-4 py-2 ">
                    {properties?.propertyCharacteristics?.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-2 border-b last:border-0"
                      >
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Land Information */}
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection("landInformation")}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">Land Information</span>
                {openSections.landInformation ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {openSections.landInformation && (
                <div className="p-4 border-t">
                  <div className="px-4 py-2">
                    {properties.landInformation.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-2 border-b last:border-0"
                      >
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tax Information */}
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection("taxInformation")}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">Tax Information</span>
                {openSections.taxInformation ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {openSections.taxInformation && (
                <div className="p-4 border-t">
                  <div className="px-4 py-2">
                    {properties.taxInformation.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-2 border-b last:border-0"
                      >
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
