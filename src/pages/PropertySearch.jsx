import React, { useState, useEffect } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import Loading from "../component/Loading";
import LowCreditModal from "../component/LowCreditModal";

const PropertySearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [userInfo, setUserInfo] = useState(null); // User information
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [showCreditPopup, setShowCreditPopup] = useState(false); // Comps popup visibility

  useEffect(() => {
    if (isOpen) {
      // Dynamically load the script when the popup is open
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);

      // Clean up the script on component unmount
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  const userId = JSON.parse(localStorage.getItem("user"));

  // Fetch user info by userId
  const fetchUserInfo = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://sell-home9-server.vercel.app/api/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch user info");
      }

      const data = await response.json();
      setUserInfo(data.data); // Set user info if successful
    } catch (err) {
      console.error("Error fetching user info:", err.message);
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Fetch user info on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      fetchUserInfo(storedUser.id); // Fetch user info using the stored userId
    } else {
      setError("User ID not found in local storage.");
    }
  }, []); // Empty dependency array ensures this runs only once on page load

  // Fetch autocomplete suggestions
  const fetchSuggestions = async (input) => {
    try {
      const response = await fetch("https://sell-home9-server.vercel.app/api/autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: input }),
      });

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

    // Fetch autocomplete suggestions if input is at least 5 characters
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

      console.log(data);

      if (data.message === "Insufficient Credit") {
        setShowCreditPopup(true); // Show the confirmation popup

        return;
      }

      // Navigate to the results page with the API response
      navigate("/property", { state: { data } });
    } catch (err) {
      console.error("Error during search:", err.message);
      setError("Failed to fetch property data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-teal-800/90 flex flex-col items-center pt-16 pb-32 relative">
      {/* Loading Overlay */}
      {loading && <Loading />}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          {/*<div className="text-teal-600 font-bold text-xl">Home Sell 9</div>*/}
          <div className="flex gap-4">
            {/*<Linkto="/who-we-serve"className="text-gray-600 hover:text-teal-600">Who We Serve</Link>*/}
             {/*<Link to="/reviews" className="text-gray-600 hover:text-teal-600">Reviews</Link>*/}
            <Link to="/dealCheck" className="text-gray-600 hover:text-teal-600">
              Deal Check
            </Link>
             {/*<Link
              className="text-gray-600 hover:text-teal-600"
              onClick={() => setIsOpen(true)}
            >
              Buy Credit
            </Link>*/}
          </div>
        </div>
        <div className="flex gap-4">
          <button className="text-gray-600 hover:text-teal-600">
            Credit:{" "}
            {userInfo && userInfo.credit ? userInfo.credit : "Loading..."}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="text-center px-4 mt-16">
        <h1 className="text-white text-5xl font-bold mb-4">
          Smart Moves for a Stress-Free
        </h1>
        <h1 className="text-white text-5xl font-bold mb-8">Home Sale</h1>
        <p className="text-white text-xl mb-8">
          Search 157+ Million MLS & Off-Market Properties.
          <span className="bg-teal-400 text-white px-3 py-1 ml-2 rounded">
            100% Free.
          </span>
        </p>

        {/* Search Form */}
        <div className="flex flex-col gap-2 max-w-4xl mx-auto relative">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Address, city, county, state, zip code, or APN"
            className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
          />

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded w-full mt-[3.25rem] shadow-md max-h-[280px] overflow-y-auto z-10">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-teal-500 hover:text-white cursor-pointer"
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
                  {item.title}
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

      {showCreditPopup && (
        <LowCreditModal
          isOpen={showCreditPopup}
          onClose={() => setShowCreditPopup(false)}
        />
      )}

      {/* Popup Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "20px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
            <div style={{ width: "100%", maxWidth: "1200px", margin: "auto" }}>
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/5TRgrAZpnidWTJiiwc4U"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "3px",
                }}
                id="inline-5TRgrAZpnidWTJiiwc4U"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Credit Purchase Sell Home9"
                data-height="941"
                data-layout-iframe-id="inline-5TRgrAZpnidWTJiiwc4U"
                data-form-id="5TRgrAZpnidWTJiiwc4U"
                title="Credit Purchase Sell Home9"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySearch;
