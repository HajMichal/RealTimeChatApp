import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
});


interface getUser {
    id: number,
    name: string,
    email: string;
    password: string;
    role: string
    iat: number,
    exp: number
}

const getCurrentUserData = async (data: getUser | any) => {
  return await userApi.get("/user", { params: data});
};

const getUsers = async () => {
  return await userApi.get("/allUsers?searchedValue=", )
}

export default getCurrentUserData


