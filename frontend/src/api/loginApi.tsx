import axios from "axios";

const loginApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface loginUser {
  email: string;
  password: string;
}
interface createUser {
  name: string;
  email: string;
  password: string;
}

export const postData = async (data: loginUser) => {
  return await loginApi.post("/login", data);
};

export const createUser = async (data: createUser) => {
  return await loginApi.post("/register", data);
};
