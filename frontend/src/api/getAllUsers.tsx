import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "text/plain",
  },
  withCredentials: true,
});

interface getUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  iat: number;
  exp: number;
}

export const getAllUsers = async (value: string) => {
  return await userApi.get(
    `http://localhost:3000/allUsers?searchedValue=${value}`
  );
};

export default getAllUsers;
