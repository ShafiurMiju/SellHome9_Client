import React from "react";
import { Link } from "react-router-dom";

const Reviews = () => {
  const reviews = [
    {
      name: "Jane Doe",
      comment: "Amazing service! Sold my house in just two weeks.",
      rating: 5,
    },
    {
      name: "John Smith",
      comment: "The platform is very user-friendly and reliable.",
      rating: 4,
    },
    {
      name: "Sarah Johnson",
      comment: "Great experience working with the Home Sell 9 team.",
      rating: 5,
    },
  ];

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
          <h1 className="text-teal-600 text-4xl font-bold mb-4">Reviews</h1>
        </header>
        <p className="text-gray-700 text-lg mb-6">
          Here's what our customers have to say about us:
        </p>

        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-bold text-teal-600">{review.name}</h3>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-yellow-500 mt-2">
                {"⭐".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-teal-600 text-white py-4 text-center">
        <p>© 2025 Home Sell 9. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Reviews;
