import { jwtDecode } from "jwt-decode";

// Function to check if the token is valid
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.removeItem("user"); // Remove user data if token is missing
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      logoutUser(); // Logout if token expired
      return false;
    }

    return true; // Token is valid
  } catch (error) {
    console.error("Invalid token:", error);
    logoutUser(); // Logout if token is invalid
    return false;
  }
};

// Function to log out the user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
