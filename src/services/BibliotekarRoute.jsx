import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./AuthService";

export const BibliotekarRoute = ({ children }) => {
  let navigate = useNavigate()
  
  if (!auth.bibliotekarRole()) {
    toast.error("Nemate pravo")
    setTimeout(() => {
      navigate(-1)
    }, 1000);
  }else{
    return children;
  }

};