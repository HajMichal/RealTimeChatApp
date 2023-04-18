import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "text/plain",
  },
  withCredentials: true,
});

export const remover = async (id: number) => {
  return await userApi.delete(`http://localhost:3000/removeFriend/${id}`);
};

export default remover;
