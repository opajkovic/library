import { useNavigate } from "react-router-dom";
import { auth } from "./AuthService";
import { toast } from "react-toastify";

export const AdminRoute = ({ children }) => {
  let navigate = useNavigate()
  
  if (!auth.adminRole()) {
    toast.error("Nemate pravo")
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }else{
    return children;
  }

};