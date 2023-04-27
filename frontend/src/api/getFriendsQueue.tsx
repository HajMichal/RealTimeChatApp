import axios from "axios";

const loginApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


export const getFriendsQueue = async () => {
  return await loginApi.get("/getFriendsQueue");
};


