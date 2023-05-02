import { axiosCreate } from "./axiosCreate";

interface addFriend {
  friendsName: string;
  friendsId: number;
  userId: number;
}

export const addFriend = async (data: addFriend) => {
  return await axiosCreate.post("/addFriend", data);
};


