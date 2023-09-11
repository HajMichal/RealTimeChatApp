import { QueueProps } from "../interfaces";
import { axiosCreate } from "./axiosCreate";

export const getFriendsQueue = async (): Promise<{ data: QueueProps }> => {
  return await axiosCreate.get("/getFriendsQueue");
};
