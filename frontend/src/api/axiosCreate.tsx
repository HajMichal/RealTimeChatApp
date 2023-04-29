import axios from "axios";

export const axiosCreate = axios.create({
    baseURL: "https://realtimechatapp-production-9eac.up.railway.app",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });