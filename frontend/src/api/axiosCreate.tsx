import axios from "axios";

export const axiosCreate = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    // baseURL: "https://realtimechatapp-production-9eac.up.railway.app",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });