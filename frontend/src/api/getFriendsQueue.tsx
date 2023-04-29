import { axiosCreate } from "./axiosCreate"; 

export const getFriendsQueue = async () => {
  return await axiosCreate.get("/getFriendsQueue");
};


