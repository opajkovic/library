import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./AuthService";

export const BibliotekarRoute = ({ children }) => {
  
  if (!auth.bibliotekarRole()) {
    return <Navigate replace to="/login" />;
  }

  return children;
};