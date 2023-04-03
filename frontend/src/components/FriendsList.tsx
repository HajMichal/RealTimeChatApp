import React, {useEffect, useState} from "react";

import { useQuery } from "react-query";
import { getFriendList } from "../api/getFriendList";
import { userId, friend } from "../interfaces";

import Friends from "./Freinds";

const FriendsList = ( ) => {

    const [currentChat, setCurrentChat] = useState()
    const [friendList, setFriendList] = useState<friend[]>([])
    useEffect(() => {
      // const getConversation = async() => {
      //   try {
      //     const res = await // GET FRIENDS LIST
      //   } catch (error) {
          
      //   }
      // }
    })
    const { data } = useQuery("friendList", getFriendList)

    useEffect(() => {
      if (data) setFriendList(data.data.friendList);
    }, [data]);

  return (
    <div className="w-full max-h-96 overflow-y-scroll mt-10">
        <Friends friends={friendList} />
    </div>
  );
};

export default FriendsList;


