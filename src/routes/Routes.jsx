import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import PetsSupplies from "../pages/PetsSupplies";
import AddListing from "../pages/AddListing";
import MyListings from "../pages/MyListings";
import MyOrder from "../pages/MyOrder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>404 Page Not Found</h1>,
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
        path: "/add-listing",
        element: <AddListing />,
      },
      {
        path: "/my-listings",
        element: <MyListings />,
      },
      {
        path: "/my-orders",
        element: <MyOrder />,
      },
    ],
  },
]);
