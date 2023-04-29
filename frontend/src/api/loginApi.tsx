import { axiosCreate } from "./axiosCreate"; 


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
  return await axiosCreate.post("/login", data);
};

export const createUser = async (data: createUser) => {
  return await axiosCreate.post("/register", data);
};
