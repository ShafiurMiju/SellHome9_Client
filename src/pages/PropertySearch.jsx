import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../component/Loading";
import LowCreditModal from "../component/LowCreditModal";
import {
  FaHome,
  FaSearch,
  FaCoins,
  FaChartLine,
  FaUser,
  FaMapMarkerAlt,
  FaBars,
} from "react-icons/fa"; // Icons for the menu

const PropertySearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const userId = JSON.parse(localStorage.getItem("user"));

  // Fetch user info by userId
  const fetchUserInfo = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://sell-home9-server.vercel.app/api/user/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user info");
      }

      const data = await response.json();
      setUserInfo(data.data);
    } catch (err) {
      console.error("Error fetching user info:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user info on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      fetchUserInfo(storedUser.id);
    } else {
      setError("User ID not found in local storage.");
    }
  }, []);

  // Fetch autocomplete suggestions
  const fetchSuggestions = async (input) => {
    try {
      const response = await fetch(
        "https://sell-home9-server.vercel.app/api/autocomplete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: input }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      setSuggestions(data?.data || []);
    } catch (err) {
      console.error("Error fetching suggestions:", err.message);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    if (input.length >= 5) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectAddress = async (selected) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://sell-home9-server.vercel.app/api/property-detail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selected),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch property data");
      }

      const data = await response.json();

      if (data.message === "Insufficient Credit") {
        setShowCreditPopup(true);
        return;
      }

      navigate("/property", { state: { data } });
    } catch (err) {
      console.error("Error during search:", err.message);
      setError("Failed to fetch property data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#286E69] to-[#6C963E] flex flex-col items-center pt-24 pb-16 relative">
      {/* Loading Overlay */}
      {loading && <Loading />}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md p-4 flex justify-between items-center shadow-lg z-50 sm:px-20">
        <div className="flex gap-5">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-700 hover:text-[#286E69] transition duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FaBars className="text-2xl" /> {/* Hamburger menu icon */}
            </button>
            <div className="text-2xl font-bold text-[#286E69] flex items-center gap-2">
              <Link to="/property-search">
                <img
                  src="src/assets/icon.png"
                  alt="Sell Home"
                  className="w-10 h-auto"
                />
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-6">
            <Link
              to="/dealCheck"
              className="text-gray-700 hover:text-[#286E69] transition duration-300 flex items-center gap-2"
            >
              <FaChartLine /> {/* Deal Check icon */}
              <span>Deal Check</span>
            </Link>
            <Link
              to="/creditPurchase"
              className="text-gray-700 hover:text-[#286E69] transition duration-300 flex items-center gap-2"
            >
              <FaCoins /> {/* Buy Credit icon */}
              <span>Buy Credit</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white/90 backdrop-blur-md p-4 shadow-lg">
            <Link
              to="/dealCheck"
              className="block text-gray-700 hover:text-[#286E69] transition duration-300 py-2"
            >
              <FaChartLine className="inline-block mr-2" /> Deal Check
            </Link>
            <Link
              to="/creditPurchase"
              className="block text-gray-700 hover:text-[#286E69] transition duration-300 py-2"
            >
              <FaCoins className="inline-block mr-2" /> Buy Credit
            </Link>
          </div>
        )}

        {/* User Info */}
        <div className="flex gap-4 items-center">
          <button className="bg-gradient-to-r from-[#286E69] to-[#1E4D45] text-white px-6 py-3 rounded-full hover:from-[#1E4D45] hover:to-[#286E69] transition duration-300 flex items-center gap-3 shadow-lg">
            <FaCoins className="text-lg" /> {/* Credit icon */}
            <span className="font-medium">
              Credit: {userInfo?.credit ?? "Loading..."}
            </span>
          </button>
          {/* 
          <Link
            to=""
            className="text-gray-700 hover:text-[#286E69] transition duration-300"
          >
            <FaUser className="text-2xl" /> 
          </Link> */}
        </div>
      </nav>

      {/* Main Content */}
      <div className="text-center px-4 mt-16">
        <h1 className="text-white text-3xl sm:text-5xl font-bold mb-4">
          Find Your Dream Property
        </h1>
        <p className="text-white text-lg sm:text-xl mb-8">
          Discover the perfect home with our advanced property search.
        </p>

        {/* Search Form */}
        <div className="flex flex-col gap-2 max-w-4xl mx-auto w-full relative">
          <div className="relative">
            <FaMapMarkerAlt className="text-[24px] absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />{" "}
            {/* Search icon */}
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="Enter an address, city, or ZIP code"
              className={`w-full px-12 text-[16px] sm:text-[18px] py-4 sm:py-5 ${
                suggestions.length > 0 ? "rounded-t-3xl" : "rounded-3xl"
              } border border-gray-300 focus:outline-none focus:ring-0 focus:ring-[#ffffff] focus:border-transparent shadow-sm`}
            />
            <FaSearch className="text-[24px] absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />{" "}
            {/* Search icon */}
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-200 rounded-b-lg w-full shadow-lg max-h-[280px] overflow-y-auto z-10 top-full">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="px-6 py-4 hover:bg-blue-50 cursor-pointer transition duration-200"
                  onClick={() =>
                    handleSelectAddress({
                      fulladdress: {
                        address: item.title,
                        city: item.city,
                        state: item.state,
                        zip: item.zip,
                      },
                      id: userId.id,
                    })
                  }
                >
                  <div className="font-medium text-gray-800">{item.title}</div>
                  <div className="text-sm text-gray-500">
                    {item.city}, {item.state} {item.zip}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Low Credit Modal */}
      {showCreditPopup && (
        <LowCreditModal
          isOpen={showCreditPopup}
          onClose={() => setShowCreditPopup(false)}
        />
      )}
    </div>
  );
};

export default PropertySearch;
