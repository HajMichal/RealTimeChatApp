import { axiosCreate } from "./axiosCreate"; 


export const getFriendList = async () => {
  return await axiosCreate.get("/friendList");
};
