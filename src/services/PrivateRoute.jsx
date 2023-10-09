import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./AuthService";
import { toast } from "react-toastify";

export const PrivateRoute = ({ children }) => {
  console.log(children)
  let navigate = useNavigate();

  useEffect(() => {
    if (!auth.getAuthStatus()) {
      toast.error("Neautorizovanim korisisnicima nije dozvoljen pristup");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, []);
  return children;
};
