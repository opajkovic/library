import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./AuthService";

export const SelfOrBibliotekarRoute = ({ children, role }) => {
  let navigate = useNavigate()
  
  if (!auth.selfOrBibliotekarRole({role: role})) {
    toast.error("Nemate pravo")
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }else{
    return children;
  }

};