import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./AuthService";

export const SelfOrBibliotekarRoute = ({ children, role }) => {
  
  if (!auth.selfOrBibliotekarRole(role)) {
    return <Navigate replace to="/login" />;
  }

  return children;
};