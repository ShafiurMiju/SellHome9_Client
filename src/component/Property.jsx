import { Bath, Bed, ChevronDown, ChevronUp, SquareIcon } from "lucide-react";
import React, { useState } from "react";

const Property = ({ property }) => {

const {data} = property || {}
const {demographics} = property?.data || {}
const {mortgageHistory} = property?.data || {}
const {propertyInfo} = property?.data || {}
// console.log(propertyInfo);

const properties = {
  // address: apiResponse?.data?.data.propertyInfo.address.label,
  // location: "Freedom, OK 73842",
  // price: 152415,
  // beds: apiResponse?.data?.data.propertyInfo.bedrooms,
  // baths: apiResponse?.data?.data.propertyInfo.bathrooms,
  // sqft: apiResponse?.data?.data.propertyInfo.buildingSquareFeet,
  image:
    "https://img.freepik.com/free-photo/cityscape-wuxi_1127-3968.jpg?ga=GA1.1.1644760819.1734589298&semt=ais_tags_boosted",
  characteristics: [
    {
      label: "Living Area",
      value: propertyInfo?.livingSquareFeet,
    },
    {
      label: "Year Built",
      value: propertyInfo?.yearBuilt,
    },
    { label: "# of Units", value: propertyInfo?.unitsCount },
    {
      label: "Bedrooms",
      value: propertyInfo?.bedrooms,
    },
    {
      label: "Bathrooms",
      value: propertyInfo?.bathrooms,
    },
    {
      label: "Heating Type",
      value: propertyInfo?.heatingType,
    },
    {
      label: "Pool",
      value: propertyInfo?.pool ? "Yes" : "No",
    },
    { label: "Property Type", value: propertyInfo?.porchType},
    { label: "Stories", value: propertyInfo?.stories },
  ],
};


  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    characteristics: true,
    mortgage: false,
    facts: false,
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
            alt={property?.address}
            className="w-full h-[400px] object-cover"
          />
          {/* Header */}
          <div className="flex justify-between items-start mb-4 pt-4">
            <div>
              <h1 className="text-base sm:text-lg md:text-2xl font-semibold">
                {property?.address}
              </h1>
              <p className="text-gray-600">{property?.location}</p>
            </div>
            <div className="text-right">
              <p className="text-base sm:text-lg md:text-2xl font-bold">
                ${property?.price}
              </p>
              <p className="text-sm text-gray-600">Estimated Value</p>
            </div>
          </div>

          {/* Property stats */}
          <div className="flex gap-6 mb-4">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-gray-600" />
              <span className="font-medium">{propertyInfo?.bedrooms}</span>
              <span className="text-gray-600">Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-gray-600" />
              <span className="font-medium">{propertyInfo?.bathrooms}</span>
              <span className="text-gray-600">Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <SquareIcon className="h-5 w-5 text-gray-600" />
              <span className="font-medium">{propertyInfo?.buildingSquareFeet}</span>
              <span className="text-gray-600">SqFt</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              Adjustable Loans
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              High Equity
            </span>
          </div>
        </div>

        {/* Right side - Details */}
        <div className="w-full lg:w-1/2 p-2 sm:p-3 lg:p-0">
          {/* Collapsible sections */}
          <div className="space-y-2">
            {/* Mortgage Section */}
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection("mortgage")}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">Mortgage & Equity</span>
                {openSections.mortgage ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {openSections.mortgage && (
                <div className="p-4 border-t">
                  <p>
                    Mortgage details and equity information would go here...
                  </p>
                </div>
              )}
            </div>

            {/* Facts Section */}
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection("facts")}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">Public Facts & Zoning</span>
                {openSections.facts ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {openSections.facts && (
                <div className="p-4 border-t">
                  <div className="px-4 py-2">
                    {properties.characteristics.map((item, index) => (
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

            {/* Characteristics Section */}
            <div className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection("characteristics")}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">Property Characteristics</span>
                {openSections.characteristics ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {openSections.characteristics && (
                <div className="border-t">
                  <div className="px-4 py-2 ">
                    {properties?.characteristics?.map((item, index) => (
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
