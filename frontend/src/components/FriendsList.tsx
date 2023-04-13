import React, { useContext, useEffect, useState } from "react";

import { useQuery, useQueryClient  } from "react-query";
import { getFriendList } from "../api/getFriendList";
import { userId, friend } from "../interfaces";

import Friends from "./Friends";
import { ReceiverIdContext } from "../App";

const FriendsList = () => {
  const [currentChat, setCurrentChat] = useState();
  const [friendList, setFriendList] = useState<friend[]>([]);
  const receiverId = useContext(ReceiverIdContext)

  
  const { data, isLoading, isSuccess } = useQuery("friendList", getFriendList);

  useEffect(() => {
    if (data) setFriendList(data.data.friendList);
  }, [data]);

  return (
    <div className="w-full max-h-96 overflow-y-scroll mt-10">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-2 border-t-dark rounded-full border-brand border-b-transparent animate-spin"></div>
        </div>
      ) : null}
      {isSuccess ? <Friends friends={friendList}  /> : null}
    </div>
  );
};

export default FriendsList;
