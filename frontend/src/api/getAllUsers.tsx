import axios from "axios";

const userApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
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


