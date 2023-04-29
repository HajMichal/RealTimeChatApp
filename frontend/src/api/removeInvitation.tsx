import { axiosCreate } from "./axiosCreate"; 


export const removeQueue = async (id: number) => {
  return await axiosCreate.delete(`/removeFromQueue/${id}`);
};


