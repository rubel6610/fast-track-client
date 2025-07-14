import React from "react";
import UseAuth from "../Hooks/UseAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }
  if (!user) {
    return (
      <Navigate to="/signin" state={{ from: location.pathname }} replace />
    );
  }
  return children;
}

export default PrivateRoute;
