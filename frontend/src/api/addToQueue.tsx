import axios from "axios";

const loginApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface queue {
    userId: number,
    friendId: number
}

export const addToQueue = async (data: queue) => {
  return await loginApi.post("/addToQueue", data);
};

