import { axiosCreate } from "./axiosCreate"; 

interface queue {
    userId: number,
    friendId: number
}

export const addToQueue = async (data: queue) => {
  return await axiosCreate.post("/addToQueue", data);
};

