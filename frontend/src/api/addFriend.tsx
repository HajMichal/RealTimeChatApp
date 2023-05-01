import { axiosCreate } from "./axiosCreate";

interface addFriend {
  friendsName: string;
  friendsId: number;
  mainUserId: number;
}

export const addFriend = async (data: addFriend) => {
  return await axiosCreate.post("/addFriend", data);
};


