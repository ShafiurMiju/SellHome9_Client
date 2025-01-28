import { createBrowserRouter } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
// import PropertySearch from "../pages/propertySearch";
import OwnerPortfolioView from "../pages/OwnerPortfolioView";
// import AutocompleteSearch from "../pages/AutocompleteSearch";
import WhoWeServe from "../pages/WhoWeServe";
import Reviews from "../pages/Reviews";
import PropertySearch from "../pages/PropertySearch";
import DealCheck from "../pages/DealCheck";
// import Coms from "../pages/Coms";
// import Test from "../pages/FullDropDown";
// import PropertyHistory from "../pages/PropertyHistory";



const ProtectedRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem("user"));

  return user ? element : <div>Please log in to access this page.</div>;
};

const router = createBrowserRouter([
  {
    path: "/property-search",
    element: <PropertySearch />,
  },
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/property",
    element: <OwnerPortfolioView />,
  },
  {
    path: "/dealCheck",
    element: <DealCheck />,
  },
  // {
  //   path: "/property-history",
  //   element: <PropertyHistory />,
  // },
  // {
  //   path: "/coms",
  //   element: <Coms />,
  // },
  // {
  //   path: "/test",
  //   element: <Test />,
  // },
  // {
  //   path: "/auto",
  //   element: <AutocompleteSearch />,
  // },
  {
    path:"/who-we-serve", 
    element:<WhoWeServe />,
  },
  {
    path:"/reviews",
    element:<Reviews />
  },


]);

export default router;
