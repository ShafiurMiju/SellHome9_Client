import React, { useState, useEffect } from "react";
import { MapPin, Download, HelpCircle } from "lucide-react";

// Reusable Dropdown Component
const Dropdown = ({ options, selected, onSelect, isOpen, toggleDropdown }) => {
  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="w-full text-left px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm flex justify-between items-center"
      >
        <span>{selected}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => onSelect(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                selected === option ? "bg-blue-100" : ""
              }`}
            >
              {option}
              {selected === option && (
                <svg
                  className="inline w-4 h-4 ml-2 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Comps = ({ ownerInfo, CompsData }) => {
  const latitude = CompsData?.data?.subject?.propertyInfo?.latitude;
  const longitude = CompsData?.data?.subject?.propertyInfo?.longitude;
  const zoomLevel = 19;

  const googleMapSrc = `https://www.google.com/maps/embed/v1/place?zoom=${zoomLevel}&key=AIzaSyCPXbfX6LhcDOozeAteFwOj9Du8SOOtFjU&q=${latitude},${longitude}`;

  // Original properties list
  const properties = CompsData?.data?.comps?.map((item) => ({
    id: item?.id,
    address: item?.address?.address,
    status: "Sold",
    date: item?.lastSaleDate,
    price: item?.estimatedValue,
    pricePerSqft: item?.estimatedValue / item?.squareFeet,
    bed: item?.bedrooms,
    bath: item?.bathrooms,
    sqft: item?.squareFeet,
    lotSqft: item?.lotSquareFeet,
    yearBuilt: item?.yearBuilt,
    distance: item?.distance,
    link: true,
    isHighlighted: true,
    latitude: item?.latitude,
    longitude: item?.longitude,
  }));

  // Dropdown options
  const sellOptions = ["Any Status", "Sold", "Pending", "For Sale"];
  const yearOptions = [
    "Sold in Any Year",
    "Sold In Last Month",
    "Sold In Last 2 Month",
    "Sold In Last 3 Month",
    "Sold In Last Year",
    "Sold In Last 2 Years",
    "Sold In Last 3 Years",
  ];
  const withinOptions = [
    "Within Any Distance",
    "Within 0.25 Mile",
    "Within 0.5 Mile",
    "Within 0.75 Mile",
    "Within 1 Mile",
    "Within 2 Mile",
    "Within 3 Mile",
  ];
  const bedsOptions = ["Any Beds", "Bedrooms ± 1", "Bedrooms ± 2", "Bedrooms ± 3"];
  const bathsOptions = ["Any Baths", "Bathrooms ± 1", "Bathrooms ± 2", "Bathrooms ± 3"];
  const yearBuiltOptions = [
    "Any Year Built",
    "Within 5 Years",
    "Within 10 Years",
    "Within 20 Years",
    "Within 30 Years",
  ];

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState(null); // Tracks which dropdown is open

  const [selectedSell, setSelectedSell] = useState("Any Status");
  const [selectedYear, setSelectedYear] = useState("Sold In Any Year");
  const [selectedWithin, setSelectedWithin] = useState("Within Any Distance");
  const [selectedBeds, setSelectedBeds] = useState("Any Beds");
  const [selectedBaths, setSelectedBaths] = useState("Any Baths");
  const [selectedYearBuilt, setSelectedYearBuilt] = useState("Any Year Built");

  // State for filtered properties
  const [filteredProperties, setFilteredProperties] = useState(properties);

  // Function to toggle dropdown
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".relative")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Filter logic
  useEffect(() => {
    const filterProperties = () => {
      let filtered = [...properties];

      // Filter by status
      if (selectedSell !== "Any Status") {
        filtered = filtered.filter((property) => property.status === selectedSell);
      }

      // Filter by year (example logic, adjust as needed)
      if (selectedYear !== "Sold In Any Year") {
        const currentDate = new Date();
        const monthsAgo = parseInt(selectedYear.split(" ")[3]); // Extract number of months
        filtered = filtered.filter((property) => {
          const saleDate = new Date(property.date);
          const diffInMonths =
            (currentDate.getFullYear() - saleDate.getFullYear()) * 12 +
            (currentDate.getMonth() - saleDate.getMonth());
          return diffInMonths <= monthsAgo;
        });
      }

      // Filter by distance
      if (selectedWithin !== "Within Any Distance") {
        const distance = parseFloat(selectedWithin.split(" ")[1]); // Extract distance
        filtered = filtered.filter((property) => property.distance <= distance);
      }

      // Filter by beds
      if (selectedBeds !== "Any Beds") {
        const bed = parseInt(selectedBeds.split(" ")[2]); // Extract range
        filtered = filtered.filter((property) => property.bed <= bed);
      }

      // Filter by baths
      if (selectedBaths !== "Any Baths") {
        const bath = parseInt(selectedBaths.split(" ")[2]); // Extract range
        filtered = filtered.filter((property) => property.bath <= bath);
      }

      // Filter by year built
      if (selectedYearBuilt !== "Any Year Built") {
        const yearsRange = parseInt(selectedYearBuilt.split(" ")[1]); // Extract range
        const subjectYearBuilt = CompsData.data.subject.propertyInfo.yearBuilt;
        filtered = filtered.filter(
          (property) => Math.abs(property.yearBuilt - subjectYearBuilt) <= yearsRange
        );
      }

      setFilteredProperties(filtered);
    };

    filterProperties();
  }, [
    selectedSell,
    selectedYear,
    selectedWithin,
    selectedBeds,
    selectedBaths,
    selectedYearBuilt,
    properties,
    CompsData.data.subject.propertyInfo,
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        {/* Main Content */}
        <div className="flex gap-4">
          {/* Map Section */}
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-200 relative h-96">
              <iframe
                src={googleMapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Filters Section */}
          <div className="w-1/3 space-y-2">
            <Dropdown
              options={sellOptions}
              selected={selectedSell}
              onSelect={setSelectedSell}
              isOpen={openDropdown === "sell"}
              toggleDropdown={() => toggleDropdown("sell")}
            />
            <Dropdown
              options={yearOptions}
              selected={selectedYear}
              onSelect={setSelectedYear}
              isOpen={openDropdown === "year"}
              toggleDropdown={() => toggleDropdown("year")}
            />
            <Dropdown
              options={withinOptions}
              selected={selectedWithin}
              onSelect={setSelectedWithin}
              isOpen={openDropdown === "within"}
              toggleDropdown={() => toggleDropdown("within")}
            />
            <Dropdown
              options={yearBuiltOptions}
              selected={selectedYearBuilt}
              onSelect={setSelectedYearBuilt}
              isOpen={openDropdown === "yearBuilt"}
              toggleDropdown={() => toggleDropdown("yearBuilt")}
            />
            <div className="grid grid-cols-2 gap-2">
              <Dropdown
                options={bedsOptions}
                selected={selectedBeds}
                onSelect={setSelectedBeds}
                isOpen={openDropdown === "beds"}
                toggleDropdown={() => toggleDropdown("beds")}
              />
              <Dropdown
                options={bathsOptions}
                selected={selectedBaths}
                onSelect={setSelectedBaths}
                isOpen={openDropdown === "baths"}
                toggleDropdown={() => toggleDropdown("baths")}
              />
            </div>
          </div>
        </div>

        {/* Property List */}
        <div className="mt-4 bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="w-8 p-4"></th>
                <th className="text-left p-4 font-medium text-gray-600">Address</th>
                <th className="text-left p-4 font-medium text-gray-600">Status</th>
                <th className="text-left p-4 font-medium text-gray-600">Date</th>
                <th className="text-left p-4 font-medium text-gray-600">Price</th>
                <th className="text-left p-4 font-medium text-gray-600">Price/SqFt</th>
                <th className="text-left p-4 font-medium text-gray-600">Bed</th>
                <th className="text-left p-4 font-medium text-gray-600">Bath</th>
                <th className="text-left p-4 font-medium text-gray-600">SqFt</th>
                <th className="text-left p-4 font-medium text-gray-600">Lot SqFt</th>
                <th className="text-left p-4 font-medium text-gray-600">Year Built</th>
                <th className="text-left p-4 font-medium text-gray-600">Distance</th>
              </tr>
            </thead>
            <tbody className="bg-green-200">
              <tr key={CompsData.data.subject.id}>
                <td className="p-4">
                  <MapPin className="text-teal-600 mr-2 mt-1" size={16} />
                </td>
                <td className="p-4">
                  <div className="flex items-start">
                    <div>
                      <div className="text-blue-600">
                        {CompsData.data.subject.propertyInfo.address.label}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-start">
                    <div>
                      <div className="text-blue-600 px-2 py-1 rounded">Subject</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">--</td>
                <td className="p-4 text-gray-600">--</td>
                <td className="p-4 text-gray-600">
                  {CompsData.data.subject.propertyInfo.pricePerSqft
                    ? CompsData.data.subject.propertyInfo.pricePerSqft.toLocaleString()
                    : "--"}
                </td>
                <td className="p-4 text-gray-600">
                  {CompsData.data.subject.propertyInfo.bedrooms || "--"}
                </td>
                <td className="p-4 text-gray-600">
                  {CompsData.data.subject.propertyInfo.bathrooms || "--"}
                </td>
                <td className="p-4 text-gray-600">
                  {CompsData.data.subject.propertyInfo.livingSquareFeet
                    ? CompsData.data.subject.propertyInfo.livingSquareFeet.toLocaleString()
                    : "--"}
                </td>
                <td className="p-4 text-gray-600">
                  {CompsData.data.subject.propertyInfo.lotSquareFeet
                    ? CompsData.data.subject.propertyInfo.lotSquareFeet.toLocaleString()
                    : "--"}
                </td>
                <td className="p-4 text-gray-600">
                  {CompsData.data.subject.propertyInfo.yearBuilt || "--"}
                </td>
                <td className="p-4 text-gray-600">--</td>
              </tr>

              {filteredProperties.map((property) => (
                <tr
                  key={property.id}
                  className={`border-t ${property.isHighlighted ? "bg-green-50" : "hover:bg-gray-50"}`}
                >
                  <td className="p-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-start">
                      <div>
                        <div className={property.link ? "text-blue-600" : ""}>
                          {property.address}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        property.status === "Sold" ? "bg-gray-200" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{property.date}</td>
                  <td className="p-4 text-gray-600">
                    {property.price === "--" ? "--" : `$${property.price.toLocaleString()}`}
                  </td>
                  <td className="p-4 text-gray-600">
                    {property.pricePerSqft === "--"
                      ? "--"
                      : `$${Math.round(property.pricePerSqft).toString()}`}
                  </td>
                  <td className="p-4 text-gray-600">{property.bed ? property.bed : "0"}</td>
                  <td className="p-4 text-gray-600">{property.bath ? property.bath : "0"}</td>
                  <td className="p-4 text-gray-600">{property.sqft.toLocaleString()}</td>
                  <td className="p-4 text-gray-600">{property.lotSqft.toLocaleString()}</td>
                  <td className="p-4 text-gray-600">{property.yearBuilt}</td>
                  <td className="p-4 text-gray-600">{property.distance} mi</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-8">
            <div>
              <div className="text-sm text-gray-500 flex items-center">
                Comp-Based Value <HelpCircle size={14} className="ml-1 text-gray-400" />
              </div>
              <div className="text-xl font-semibold">$0</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 flex items-center">
                Avg. Price/SqFt <HelpCircle size={14} className="ml-1 text-gray-400" />
              </div>
              <div className="text-xl font-semibold">$0</div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-100 rounded flex items-center text-gray-600">
              <Download size={16} className="mr-2" /> Download PDF
            </button>
            <button className="px-4 py-2 bg-gray-100 rounded flex items-center text-gray-600">
              <Download size={16} className="mr-2" /> Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comps;