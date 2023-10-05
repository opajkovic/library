import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./AuthService";

export const AdminRoute = ({ children }) => {
  
  if (!auth.adminRole()) {
    return <Navigate replace to="/login" />;
  }

  return children;
};