import { useParams } from "react-router";
import api from "../api/apiCalls.js";

class AuthService {
  getAuthStatus = () => {
    let token = localStorage.getItem("token");
    if (!!token || token == undefined) this.setJWT(token);
    return !!token;
  };
  adminRole = () => {
    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    if (!!token && role == "Administrator") {
      this.setJWT(token);
      return true;
    }
    return false;
  };
  bibliotekarRole = () => {
    let token = localStorage.getItem("token");
    let role = localStorage.getItem("role");
    if (!!token && (role == "Administrator" || role == "Bibliotekar")) {
      this.setJWT(token);
      return true;
    }
    return false;
  };
  selfRole = ({ role }) => {
    let { id } = useParams();
    let token = localStorage.getItem("token");
    let role1 = localStorage.getItem("role");
    let id1 = localStorage.getItem("id");
    console.log(role);
    console.log(id + " - " + id1);
    if (!!token && (role1 == "Administrator" || (role == role1 && id == id1))) {
      this.setJWT(token);
      return true;
    }
    return false;
  };
  selfOrBibliotekarRole = ({ role }) => {
    let { id } = useParams();
    let token = localStorage.getItem("token");
    let role1 = localStorage.getItem("role");
    let id1 = localStorage.getItem("id");
    if (
      !!token &&
      (role1 == "Administrator" ||
        role1 == "Bibliotekar" ||
        (role == role1 && id == id1))
    ) {
      this.setJWT(token);
      return true;
    }
    return false;
  };
  setJWT = (token) =>
    (api.defaults.headers.common["Authorization"] = `Bearer ${token}`);
}
export const auth = new AuthService();
