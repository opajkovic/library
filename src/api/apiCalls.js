import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export default axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const apiSing = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer b3Rvcmlub2xhcmluZ29sb2dpamE=",
  },
}) 

