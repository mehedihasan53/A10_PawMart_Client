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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/pets-supplies",
        element: <PetsSupplies />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "/listing-details/:id",
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/category-filtered-product/:categoryName",
        element: (
          <PrivateRoute>
            <CategoryFilteredPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-listing/:id",
        element: (
          <PrivateRoute>
            <Update />
          </PrivateRoute>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/partners",
        element: <Partners />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
]);
