import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import OwnerPortfolioView from "../pages/OwnerPortfolioView";
import PropertySearch from "../pages/PropertySearch";
import DealCheck from "../pages/DealCheck";
import LoginParam from "../pages/LoginParam";
import LoginGHL from "../pages/LoginGHL";

const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? element : <div>Please log in to access this page.</div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/param/?email&password",
    element: <LoginParam />,
  },
  {
    path: "/ghl/:email/:password",
    element: <LoginGHL />,
  },
  {
    path: "/property-search",
    element: <ProtectedRoute element={<PropertySearch />} />,
  },
  {
    path: "/property",
    element: <ProtectedRoute element={<OwnerPortfolioView />} />,
  },
  {
    path: "/dealCheck",
    element: <ProtectedRoute element={<DealCheck />} />,
  },
]);

export default router;