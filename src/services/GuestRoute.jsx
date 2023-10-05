import React from "react";
import { auth } from "./AuthService";
import { Navigate } from 'react-router';

export const GuestRoute = ({children}) => {
  let isAuthenticated = auth.getAuthStatus();
  return (
        isAuthenticated ? <Navigate to="/" /> : children
  );
};
