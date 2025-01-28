import React, { useState } from 'react';
import { MapPin, ArrowLeft, ArrowRight, Plus, Minus, X, Download, HelpCircle } from 'lucide-react';

const Coms = () => {
    const properties = [
        {
            id: 1,
            address: '670 Oak Meadow Dr',
            cityState: 'Jackson, MO 63755',
            status: 'Subject',
            date: '--',
            price: '--',
            pricePerSqft: '--',
            bed: 3,
            bath: 3,
            sqft: 1502,
            lotSqft: 12981,
            yearBuilt: 2005,
            distance: '--',
            link: true,
            isHighlighted: true
        },
        {
            id: 2,
            address: '176 Glen Dr',
            cityState: 'Jackson, MO 63755',
            status: 'Sold',
            date: '2/29/2024',
            price: 295000,
            pricePerSqft: 179,
            bed: 3,
            bath: 2,
            sqft: 1652,
            lotSqft: 12981,
            yearBuilt: 2005,
            distance: '0.04mi',
            link: true
        },
        {
            id: 3,
            address: '221 Glen Dr',
            cityState: 'Jackson, MO 63755',
            status: 'Sold',
            date: '7/15/2024',
            price: 304950,
            pricePerSqft: 210,
            bed: 3,
            bath: 3,
            sqft: 1454,
            lotSqft: 12981,
            yearBuilt: 2007,
            distance: '0.06mi',
            link: true
        },
        {
            id: 4,
            address: '476 Oak Meadow Dr',
            cityState: 'Jackson, MO 63755',
            status: 'Sold',
            date: '3/19/2024',
            price: 277500,
            pricePerSqft: 107,
            bed: 3,
            bath: 3,
            sqft: 2599,
            lotSqft: 12981,
            yearBuilt: 2005,
            distance: '0.09mi',
            link: true
        }
    ];

    const filterOptions = [
        { label: 'Single-Family Homes', paired: 'Any SqFt' },
        { label: 'Any Beds', paired: 'Any Lot SqFt' },
        { label: 'Any Baths', paired: 'Any Basement' },
        { label: 'Any Year Built', paired: 'Any Garage' }
    ];

    // popup funtion =================================
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [selectedSell, setSelectedSell] = useState("Sold");
    const [selectedYear, setSelectedYear] = useState("Sold In Last Month");
    const [selectedWithin, setSelectedWithin] = useState("Within 0.25 Mile");
    const [selectedCondos, setSelectedCondos] = useState("Condos/Townhouses");

    const sellOptions = ["Any Status", "Sold", "Pending", "For Sale"];
    const oyearsOptions = ["Sold In Last Month", "Sold In Last 2 Month", "Sold In Last 3 Month", "Sold In Last Years", "Sold In Last 2 Years", "Sold In Last 3 Years"];
    const withinOptions = ["Within 0.25 Mile", "Within 0.5 Mile", "Within 0.75 Mile", "Within 1 Mile", "Within 2 Mile", "Within 3 Mile"];
    const condosOptions = ["Single-Family Homes", "Condos/Townhouses", "Mobile Homes", "Multi-Family (5+)", "Land",];

    const handleSelect = (option) => {
        setSelectedSell(option);
        setIsOpen(false);
    };

    const handleSelectYear = (option) => {
        setSelectedYear(option);
        setIsOpen1(false);
    };
    const handleSelectWithin = (option) => {
        setSelectedWithin(option);
        setIsOpen2(false);
    };
    const handleSelectCondos = (option) => {
        setSelectedCondos(option);
        setIsOpen3(false);
    };
    // popup funtion =================================



    return (
        <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto p-4">

            {/* Main Content */}
            <div className="flex gap-4 ">
                {/* Map Section */}
                <div className="w-full md:w-2/3 bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gray-200 relative h-96">
                        {/* Google Map Embed */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2150794.5905188792!2d86.72469258173824!3d24.314404962650926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sworld%20map!5e0!3m2!1sen!2sbd!4v1737093450591!5m2!1sen!2sbd"
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
                    <div className="relative w-full">
                        {/* Dropdown Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full text-left px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm flex justify-between items-center"
                        >
                            <span>{selectedSell}</span>
                            <svg
                                className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Options */}
                        {isOpen && (
                            <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                {sellOptions.map((option) => (
                                    <li
                                        key={option}
                                        onClick={() => handleSelect(option)}
                                        className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedSell === option ? "bg-blue-100" : ""
                                            }`}
                                    >
                                        {option}
                                        {selectedSell === option && (
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
                    <div className="relative w-full">
                        {/* Dropdown Button */}
                        <button
                            onClick={() => setIsOpen2(!isOpen2)}
                            className="w-full text-left px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm flex justify-between items-center"
                        >
                            <span>{selectedWithin}</span>
                            <svg
                                className={`w-4 h-4 transform transition-transform ${isOpen2 ? "rotate-180" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Options */}
                        {isOpen2 && (
                            <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                {withinOptions.map((option) => (
                                    <li
                                        key={option}
                                        onClick={() => handleSelectWithin(option)}
                                        className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${withinOptions === option ? "bg-blue-100" : ""
                                            }`}
                                    >
                                        {option}
                                        {withinOptions === option && (
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
                    <div className="relative w-full">
                        {/* Dropdown Button */}
                        <button
                            onClick={() => setIsOpen1(!isOpen1)}
                            className="w-full text-left px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm flex justify-between items-center"
                        >
                            <span>{selectedYear}</span>
                            <svg
                                className={`w-4 h-4 transform transition-transform ${isOpen1 ? "rotate-180" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Options */}
                        {isOpen1 && (
                            <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                {oyearsOptions.map((option) => (
                                    <li
                                        key={option}
                                        onClick={() => handleSelectYear(option)}
                                        className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedYear === option ? "bg-blue-100" : ""
                                            }`}
                                    >
                                        {option}
                                        {selectedYear === option && (
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


                          {/* Secent section Section */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="relative w-full">
                            {/* Dropdown Button */}
                            <button
                                onClick={() => setIsOpen3(!isOpen3)}
                                className="w-full text-left px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm flex justify-between items-center"
                            >
                                <span>{selectedCondos}</span>
                                <svg
                                    className={`w-4 h-4 transform transition-transform ${isOpen3 ? "rotate-180" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Options */}
                            {isOpen3 && (
                                <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                    {condosOptions.map((option) => (
                                        <li
                                            key={option}
                                            onClick={() => handleSelectCondos(option)}
                                            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedCondos === option ? "bg-blue-100" : ""
                                                }`}
                                        >
                                            {option}
                                            {selectedCondos === option && (
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
                    <tbody>
                        {properties.map((property) => (
                            <tr
                                key={property.id}
                                className={`border-t ${property.isHighlighted ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                            >
                                <td className="p-4">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-start">
                                        {property.isHighlighted && <MapPin className="text-teal-600 mr-2 mt-1" size={16} />}
                                        <div>
                                            <div className={property.link ? "text-blue-600" : ""}>
                                                {property.address}
                                            </div>
                                            <div className="text-sm text-gray-500">{property.cityState}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-sm ${property.status === 'Sold' ? 'bg-gray-200' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {property.status}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-600">{property.date}</td>
                                <td className="p-4 text-gray-600">
                                    {property.price === '--' ? '--' : `$${property.price.toLocaleString()}`}
                                </td>
                                <td className="p-4 text-gray-600">
                                    {property.pricePerSqft === '--' ? '--' : `$${property.pricePerSqft}`}
                                </td>
                                <td className="p-4 text-gray-600">{property.bed}</td>
                                <td className="p-4 text-gray-600">{property.bath}</td>
                                <td className="p-4 text-gray-600">{property.sqft.toLocaleString()}</td>
                                <td className="p-4 text-gray-600">{property.lotSqft.toLocaleString()}</td>
                                <td className="p-4 text-gray-600">{property.yearBuilt}</td>
                                <td className="p-4 text-gray-600">{property.distance}</td>
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

export default Coms;