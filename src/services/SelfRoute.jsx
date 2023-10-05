import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./AuthService";
import { toast } from "react-toastify";

export const SelfRoute = ({ children, role }) => {
  
  if (!auth.selfRole({role: role})) {
    toast.error("Nemate pravo pristupiti ovoj stranici")
    return <Navigate replace to="/login" />;
  }else{
    return children;
  }

};