import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./AuthService";

export const PrivateRoute = ({ children }) => {
  
  if (!auth.getAuthStatus()) {
    return <Navigate replace to="/login" />;
  }

  return children;
};