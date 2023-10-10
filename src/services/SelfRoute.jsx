import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./AuthService";
import { toast } from "react-toastify";

export const SelfRoute = ({ children, role }) => {
  let navigate = useNavigate();

  if (!auth.selfRole({ role: role })) {
    toast.error("Nemate pravo");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  } else {
    return children;
  }
};
