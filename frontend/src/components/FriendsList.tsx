import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { MyContext } from "../App";
import { friend } from "../interfaces";
import { getFriendList } from "../api/getFriendList";
import Friends from "./Friends";

const FriendsList = () => {
  const [friendList, setFriendList] = useState<friend[]>([]);
  const { handleAllFriends } = useContext(MyContext);

  const { data, isSuccess } = useQuery("friendList", getFriendList);

  useEffect(() => {
    if (data) setFriendList(data.data.friendList);
    handleAllFriends(data?.data.friendList);
  }, [data]);
  console.log(data);
  return (
    <div className="w-full max-h-96 overflow-y-scroll -mt-2 ">
      {/* @ts-ignore */}
      {isSuccess ? <Friends friends={friendList} /> : null}
    </div>
  );
};

export default FriendsList;
