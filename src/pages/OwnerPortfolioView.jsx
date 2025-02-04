import React, { useRef, useState, useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  Info,
  X,
  Bed,
  Bath,
  SquareIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Property from "../component/Property";
import Owner from "../component/SkipTrace";
import SkipTrace from "../component/SkipTrace";
import ShowSkipTraceModal from "../component/ShowSkipTraceModal";
import ShowPropertyModal from "../component/ShowPropertyModal";
import CompsPopup from "../component/CompsPopup";
import Loading from "../component/Loading";
import Comps from "../component/comps";
import LowCreditModal from "../component/LowCreditModal";
import PropertyHistory from "../component/PropertyHistory";
import Market from "../component/Market";

const OwnerPortfolioView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isBlurred, setIsBlurred] = useState(true); // State to control blur for info
  const [showSkipTracePopup, setShowSkipTracePopup] = useState(false); // State to control popup visibility
  const [showPropertyPopup, setShowPropertyPopup] = useState(false); // Property popup visibility
  const [showCompsPopup, setShowCompsPopup] = useState(false); // Comps popup visibility
  const [showText, setShowText] = useState(false);
  const [activeTab, setActiveTab] = useState("property"); // 'property' or 'owner'
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false); // State for showing the loading indicator
  const [userInfo, setUserInfo] = useState(null); // User information

  const [error, setError] = useState(null);

  const [showCreditPopup, setShowCreditPopup] = useState(false); // Comps popup visibility

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

  const data = location.state;

  const buttonRef = useRef();

  if (!data) {
    return (
      <div className="text-center mt-16">
        <h1 className="text-2xl font-bold">No Data Found</h1>
        <button
          onClick={() => navigate("/property-search")}
          className="mt-4 px-4 py-2 bg-teal-500 text-white rounded"
        >
          Back to Search
        </button>
      </div>
    );
  }

  const output = data?.data?.data || {};
  const { ownerInfo } = data?.data?.data?.data || {};

  const payload = { fulladdress: output.input, id: userId.id };

  const handleSkipTrace = async () => {
    setShowSkipTracePopup(true); // Show the confirmation popup
  };

  const confirmSkipTrace = async () => {
    try {
      handleSkipTraceTabClick();
      setShowSkipTracePopup(false); // Hide the popup
      setIsBlurred(false); // Remove the blur for the info section
    } catch (err) {
      console.error("Error reducing credit:", err.message);
    }

    if (buttonRef.current) {
      setShowText(true); // Show "Skip Trace Again" button
      buttonRef.current.style.display = "none"; // Hide "Skip Trace" button
    }
  };

  const cancelSkipTrace = () => {
    setShowSkipTracePopup(false); // Hide the popup
  };

  //...................
  //for property details
  const handlePropertyClick = async () => {
    setLoading(true);
    setActiveTab("property");
    setLoading(false);
  };

  const confirmComps = async () => {
    try {
      handleCompsApi();
      setShowCompsPopup(false); // Hide the popup
    } catch (err) {
      console.error(err.message);
    }
  };

  const cancelComps = () => {
    setShowCompsPopup(false); // Hide the popup
  };

  const [OwnersData, setOwnersData] = useState("");
  const [CompsData, setCompsData] = useState("");

  const handleSkipTraceTabClickSwap = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state before making the request

      const response = await fetch(
        "https://sell-home9-server.vercel.app/api/skiptrace-swap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Ensure `selected` is defined
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch property data");
      }

      const data = await response.json();
      setOwnersData(data); // Store the result data in state
    } catch (err) {
      console.error("Error during search:", err.message);
      setError("Failed to fetch property data. Please try again."); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
    setActiveTab("owner");
  };

  const handleSkipTraceTabClick = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state before making the request

      const response = await fetch(
        "https://sell-home9-server.vercel.app/api/skiptrace",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Ensure `selected` is defined
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch property data");
      }

      const data = await response.json();

      if (data.message === "Insufficient Credit") {
        setShowCreditPopup(true); // Show the confirmation popup

        setShowText(false); // Show "Skip Trace Again" button
        buttonRef.current.style.display = ""; // Hide "Skip Trace" button

        return;
      }

      setOwnersData(data); // Store the result data in state
    } catch (err) {
      console.error("Error during search:", err.message);
      setError("Failed to fetch property data. Please try again."); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
    setActiveTab("owner");
  };

  const handleCompsApi = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error state before making the request

      const response = await fetch(
        "https://sell-home9-server.vercel.app/api/property-comps",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Ensure `selected` is defined
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch property data");
      }

      const data = await response.json();

      if (data.message === "Insufficient Credit") {
        setShowCreditPopup(true); // Show the confirmation popup
        return;
      }

      setCompsData(data); // Store the result data in state
    } catch (err) {
      console.error("Error during search:", err.message);
      setError("Failed to fetch property data. Please try again."); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
    setActiveTab("comps");
  };

  const handleCompsTraceTabClick = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://sell-home9-server.vercel.app/api/check-userAction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Ensure `selected` is defined
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch property data");
      }

      const data = await response.json();
      console.log(data);

      if (!data.success) {
        setLoading(false);
        setShowCompsPopup(true); // Show the confirmation popup
      } else {
        handleCompsApi();
      }
    } catch (err) {
      console.error("Error during search:", err.message);
    }

    //setShowCompsPopup(true); // Show the confirmation popup
  };

  const handleHistoryTabClick = () => {
    try {
      setLoading(true);
      setActiveTab("history");
      setLoading(false);
    } catch (err) {
      console.error("Error during search:", err.message);
    }
  };
  // const handleMarketClick = () => {
  //   try{
  //     setLoading(true);
  //     setActiveTab("market");
  //     setLoading(false);

  //   }catch(err){
  //     console.error("Error during search:", err.message);
  //   }
  // }
  const handleMarketClick = () => {
    try {
      setLoading(true);
      setActiveTab("market");
      setLoading(false);
    } catch (err) {
      console.error("Error during search:", err.message);
    }
  };

  const cancelPopup = () => {
    setShowPropertyPopup(false); // Close the popup without making the API call
  };

  // Toggle function for sections
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Navigation */}

      <div className="border-b mb-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-8">
            <button
              onClick={handlePropertyClick}
              className={`px-4 py-2 ${
                activeTab === "property"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Property
            </button>
            <button
              onClick={() => handleSkipTraceTabClickSwap()}
              // className="px-4 py-2 text-teal-600 border-b-2 border-teal-600"
              className={`px-4 py-2 ${
                activeTab === "owner"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Owner
            </button>

            <button
              onClick={() => handleCompsTraceTabClick()}
              // className="px-4 py-2 text-teal-600 border-b-2 border-teal-600"
              className={`px-4 py-2 ${
                activeTab === "comps"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Comps
            </button>
            <button
              onClick={() => handleHistoryTabClick()}
              // className="px-4 py-2 text-teal-600 border-b-2 border-teal-600"
              className={`px-4 py-2 ${
                activeTab === "history"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              History
            </button>
            <button
              onClick={() => handleMarketClick()}
              // className="px-4 py-2 text-gray-500 hover:text-gray-700"
              className={`px-4 py-2 ${
                activeTab === "market"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Market
            </button>
          </div>
          <div className="flex items-center gap-4">
            {/* <button className="p-2 hover:bg-gray-100 rounded">
              <ArrowLeft size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <ArrowRight size={20} />
            </button>
            <button className="bg-teal-100 text-teal-700 px-3 py-1.5 rounded flex items-center gap-2">
              <span className="text-lg">+</span> Add
            </button> */}
            <button
              onClick={() => navigate("/property-search")}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
      

      {/* Tabs Content */}

      {/* Owner Information */}
      {activeTab === "owner" && (
        <SkipTrace
          OwnersData={OwnersData}
          buttonRef={buttonRef}
          handleSkipTrace={handleSkipTrace}
          ownerInfo={ownerInfo}
        />
      )}

      {/* {activeTab === "owner" && (
        <SkipTrace
          OwnersData={OwnersData}
          buttonRef={buttonRef}
          handleSkipTrace={handleSkipTrace}
          ownerInfo={ownerInfo}
        />
      )} */}

      {activeTab === "comps" && (
        <Comps CompsData={CompsData} ownerInfo={ownerInfo} />
      )}

      {activeTab === "property" && <Property property={output} />}
      {activeTab === "history" && <PropertyHistory history={output} />}
      {activeTab === "market" && <Market />}

      {/* Confirmation Popup */}
      {showSkipTracePopup && (
        <ShowSkipTraceModal
          userInfo={userInfo}
          confirmSkipTrace={confirmSkipTrace}
          cancelSkipTrace={cancelSkipTrace}
          handleSkipTraceTabClickSwap={handleSkipTraceTabClickSwap}
        />
      )}

      {/* Property Popup */}
      {showPropertyPopup && (
        <ShowPropertyModal
          setShowPropertyPopup={setShowPropertyPopup}
          loading={loading}
          // handleApiCall={handleApiCall}
        />
      )}

      {showCompsPopup && (
        <CompsPopup
          userInfo={userInfo}
          confirmComps={confirmComps}
          cancelComps={cancelComps}
          handleSkipTraceTabClickSwap={handleSkipTraceTabClickSwap}
        />
      )}

      {showCreditPopup && (
        <LowCreditModal
          isOpen={showCreditPopup}
          onClose={() => setShowCreditPopup(false)}
        />
      )}

      {loading && <Loading />}
    </div>
  );
};

export default OwnerPortfolioView;
