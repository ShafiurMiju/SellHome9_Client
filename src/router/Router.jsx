import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import AuthRedirect from "../auth/AuthRedirect";
import LoginForm from "../pages/LoginForm";
import LoginGHL from "../pages/LoginGHL";
import OwnerPortfolioView from "../pages/OwnerPortfolioView";
import PropertySearch from "../pages/PropertySearch";
import DealCheck from "../pages/DealCheck";
import NotFound from "../pages/NotFound";
import LoginError from "../pages/LoginError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRedirect element={<LoginForm />} />,
  },
  {
    path: "/ghl",
    element: <AuthRedirect element={<LoginGHL />} />,
  },
  {
    path: "/error",
    element: <AuthRedirect element={<LoginError />} />,
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
  {
    path: "/*",
    element: <ProtectedRoute element={<NotFound />} />,
  },
]);

export default router;
