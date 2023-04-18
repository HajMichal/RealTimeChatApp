import axios from "axios";
import { sendMessage } from "../interfaces";

const loginApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const saveMessage = async (data: sendMessage) => {
  return await loginApi.post("/sendMessage", data);
};
