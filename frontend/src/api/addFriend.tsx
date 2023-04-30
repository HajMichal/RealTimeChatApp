import { axiosCreate } from "./axiosCreate";

interface addFriend {
  friendsName: string;
  friendsId: number;
  mainUserId: number;
}

export const addFriend = async (data: addFriend) => {
  console.log(data)
  return await axiosCreate.post("/addFriend", data);
};


