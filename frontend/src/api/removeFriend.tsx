import { axiosCreate } from "./axiosCreate"; 


export const remover = async (id: number) => {
  return await axiosCreate.delete(`/removeFriend/${id}`);
};


