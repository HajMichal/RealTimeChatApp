import { useQuery } from "react-query";
import { getFriendsQueue } from "../api/getFriendsQueue";
import Queue from "./Queue";
import { useState } from "react";


const FriendsQueue = () => {

    const { data, isLoading, isSuccess } = useQuery("friendQueue", getFriendsQueue);
    // console.log(data?.data.queue.friendInvitations)
    // console.log(data?.data.queue.friendRequests)

  return (
    <div className="w-full max-h-96 overflow-y-scroll mt-5 ">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-2 border-t-dark rounded-full border-brand border-b-transparent animate-spin"></div>
        </div>
      ) : null}
    {/* @ts-ignore */}
      {isSuccess ? <Queue queue={data?.data.queue} /> : null}
    </div>
  );
};

export default FriendsQueue;
