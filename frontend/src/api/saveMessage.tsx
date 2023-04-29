import { axiosCreate } from "./axiosCreate"; 

interface sendMessage {
  message: string;
  time: Date;
  userId: number;
  receiverId: number | null;
}

export const saveMessage = async (data: sendMessage) => {
  return await axiosCreate.post("/sendMessage", data);
};
