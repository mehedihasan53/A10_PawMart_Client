import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import PetsSupplies from "../pages/PetsSupplies";
import AddListing from "../pages/AddListing";
import MyListings from "../pages/MyListings";
import MyOrder from "../pages/MyOrder";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "../provider/PrivateRoute";
import ListingDetails from "../pages/ListingDetails";
import CategoryFilteredPage from "../components/CategoryFilteredPage";
import Update from "../pages/UpdateListing";
import ErrorPage from "../components/ErrorPage";
import AboutUs from "../pages/AboutUs";
import Contact from "../components/shared/Contact";
import Partners from "../components/shared/Partners";
import PrivacyPolicy from "../components/shared/PrivacyPolicy";
import TermsOfService from "../components/shared/TermsOfService";
import FAQ from "../components/shared/FAQ";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminHome from "../pages/Dashboard/AdminHome";
import Profile from "../pages/Dashboard/Profile";
import UserHome from "../pages/Dashboard/UserHome";
import ManageUsers from "../pages/Dashboard/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "pets-supplies", element: <PetsSupplies /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "contact", element: <Contact /> },
      { path: "partners", element: <Partners /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-of-service", element: <TermsOfService /> },
      { path: "faq", element: <FAQ /> },
      {
        path: "listing-details/:id",
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "category-filtered-product/:categoryName",
        element: (
          <PrivateRoute>
            <CategoryFilteredPage />
          </PrivateRoute>
        ),
      },
      {
        path: "add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      {
        path: "my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "update-listing/:id",
        element: (
          <PrivateRoute>
            <Update />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Profile /> },
      { path: "profile", element: <Profile /> },
      { path: "admin-home", element: <AdminHome /> },
      { path: "user-home", element: <UserHome /> },
      { path: "manage-users", element: <ManageUsers /> },
    ],
  },
]);
