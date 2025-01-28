import React, { useState } from "react";

const Dropdown = ({ label, options, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleSelect(option)}
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const FullDropDown = () => {
    const [selectedSell, setSelectedSell] = useState("Sold");
    const [selectedYear, setSelectedYear] = useState("Sold In Last Month");
    const [selectedWithin, setSelectedWithin] = useState("Within 0.25 Mile");

    const sellOptions = ["Any Status", "Sold", "Pending", "For Sale"];
    const oyearsOptions = [
        "Sold In Last Month",
        "Sold In Last 2 Months",
        "Sold In Last 3 Months",
        "Sold In Last Year",
        "Sold In Last 2 Years",
        "Sold In Last 3 Years",
    ];
    const withinOptions = [
        "Within 0.25 Mile",
        "Within 0.5 Mile",
        "Within 0.75 Mile",
        "Within 1 Mile",
        "Within 2 Miles",
        "Within 3 Miles",
    ];

    return (
        <div className="w-1/3 space-y-4">
            <Dropdown
                label="Sell Options"
                options={sellOptions}
                selected={selectedSell}
                onSelect={setSelectedSell}
            />
            <Dropdown
                label="Year Options"
                options={oyearsOptions}
                selected={selectedYear}
                onSelect={setSelectedYear}
            />
            <Dropdown
                label="Within Options"
                options={withinOptions}
                selected={selectedWithin}
                onSelect={setSelectedWithin}
            />
        </div>
    );
};

export default FullDropDown;
