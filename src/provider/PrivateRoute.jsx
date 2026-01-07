import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading, authInitialized } = useContext(AuthContext);
  const location = useLocation();

  // Show loading while auth is being initialized or during auth operations
  if (!authInitialized || loading) {
    return <Loading />;
  }

  // If no user after auth is initialized, redirect to login
  if (!user) {
    // Save the attempted location for redirecting after login
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
