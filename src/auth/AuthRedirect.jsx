import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const AuthRedirect = ({ element }) => {
  return isAuthenticated() ? <Navigate to="/property-search" replace /> : element;
};

export default AuthRedirect;
