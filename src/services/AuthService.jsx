import api from "../api/apiCalls.js";
class AuthService {
  getAuthStatus = () => {
    let token = localStorage.getItem("token");
    if (!!token || token == undefined) this.setJWT(token);
    return !!token;
  };
  setJWT = (token) =>
    (api.defaults.headers.common["Authorization"] = `Bearer ${token}`);
}
export const auth = new AuthService();

