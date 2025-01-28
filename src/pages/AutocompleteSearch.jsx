import React, { useState } from "react";
import axios from "axios";

const AutocompleteSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async (input) => {
    try {
      setLoading(true);
      setError(null);

      // Make API call to fetch suggestions
      const response = await axios.post("https://sell-home9-server.vercel.app/api/autocomplete", {
        search: input,
      });

      setSuggestions(response.data?.data || []);
    } catch (err) {
      setError("Failed to fetch suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    // Fetch suggestions if input has at least 3 characters
    if (input.length >= 5) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for an address..."
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {/* Suggestions Dropdown */}
        {loading && <p className="text-gray-500 mt-2">Loading...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {!loading && suggestions.length > 0 && (
          <ul className="mt-2 border border-gray-300 rounded shadow bg-white">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-teal-500 hover:text-white cursor-pointer"
                onClick={() => setQuery(item.address)} // Set selected address
              >
                <div>{item.address}</div>
                <div className="text-sm text-gray-500">{item.city}, {item.state} {item.zip}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AutocompleteSearch;
