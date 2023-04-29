import { axiosCreate } from "./axiosCreate"; 


interface getUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  iat: number;
  exp: number;
}

export const getCurrentUserData = async (data: getUser | any) => {
  return await axiosCreate.get("/user", { params: data });
};



