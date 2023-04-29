import axios from "axios";

const userApi = axios.create({
  baseURL: "https://realtimechatapp-production-9eac.up.railway.app",
  headers: {
    "Content-Type": "text/plain",
  },
  withCredentials: true,
});

export const getAllUsers = async (value: string) => {
  return await userApi.get(
    `/allUsers?searchedValue=${value}`
  );
};


