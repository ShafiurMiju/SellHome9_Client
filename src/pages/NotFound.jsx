import { useNavigate } from "react-router-dom";
import NotFoundImage from "../assets/404-error-page.gif";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      {/* 404 Illustration */}
      <img 
        src={NotFoundImage} 
        alt="404 Not Found"
        className="w-full max-w-md mb-6"
      />

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-6">
        The page you are looking for doesn’t exist or may have been moved.
      </p>

      {/* Navigation Button */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
