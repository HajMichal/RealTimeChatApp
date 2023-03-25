import axios from "axios";

const loginApi = axios.create({
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

const getData = async (data: getUser | any) => {
  return await loginApi.get("/user", { params: data});
};

export default getData

