import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "text/plain",
  },
  withCredentials: true,
});

export const loadMessage = async (data: number | null) => {
  return await userApi.get(`/loadMessage?receiverId=${data}`);
};
