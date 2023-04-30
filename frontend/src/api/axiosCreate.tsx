import axios from "axios";

export const axiosCreate = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });