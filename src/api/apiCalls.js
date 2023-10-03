import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

export default axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer 18|m6tz6lkk4ppTRAtQeiY8Vg6KQXmKXG2MAQQPZno9",
  },
});
