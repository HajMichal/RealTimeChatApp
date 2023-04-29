import { axiosCreate } from "./axiosCreate"; 


export const loadMessage = async (data: number | null) => {
  return await axiosCreate.get(`/loadMessage?receiverId=${data}`);
};
