import React from "react";
import { Link } from "react-router-dom";

const WhoWeServe = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Menu Bar */}
      <nav className="bg-teal-600 text-white py-4 px-8 flex justify-between items-center">
        <div className="text-xl font-bold">Home Sell 9</div>
        <div className="flex gap-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/who-we-serve" className="hover:underline">
            Who We Serve
          </Link>
          <Link to="/reviews" className="hover:underline">
            Reviews
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-grow overflow-y-auto px-8 py-6">
        <header>
          <h1 className="text-teal-600 text-4xl font-bold mb-4">Who We Serve</h1>
        </header>
        <p className="text-gray-700 text-lg mb-6">
          At Home Sell 9, we serve a diverse range of clients, including:
        </p>
        <ul className="list-disc pl-5 space-y-4 text-gray-600">
          <li>
            <strong>Homeowners:</strong> Looking to sell their homes quickly and stress-free.
          </li>
          <li>
            <strong>Real Estate Investors:</strong> Seeking valuable insights on properties.
          </li>
          <li>
            <strong>Agents and Brokers:</strong> In need of data-driven tools to support their clients.
          </li>
          <li>
            <strong>Developers:</strong> Interested in off-market opportunities.
          </li>
        </ul>
      </main>

      {/* Footer */}
      <footer className="bg-teal-600 text-white py-4 text-center">
        <p>© 2025 Home Sell 9. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WhoWeServe;
