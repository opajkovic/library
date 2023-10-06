import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./AuthService";

export const PrivateRoute = ({ children }) => {
  
  let navigate = useNavigate()
  if (!auth.getAuthStatus()) {
    toast.error("Nemate pravo")
    setTimeout(() => {
      navigate(-1)
    }, 1000);
  }else{
    return children;
  }

};