import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "text/plain"
  },
  withCredentials: true
});



export const getFriendList = async () => {
    return await userApi.get("/friendList")}
