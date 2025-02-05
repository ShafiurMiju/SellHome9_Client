import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/error" replace />;
};

export default ProtectedRoute;
