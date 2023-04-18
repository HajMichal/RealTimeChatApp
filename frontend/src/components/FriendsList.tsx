import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

import { getFriendList } from "../api/getFriendList";
import { MyContext } from "../App";
import { friend } from "../interfaces";
import Friends from "./Friends";

const FriendsList = () => {
  const [friendList, setFriendList] = useState<friend[]>([]);
  const { handleAllFriends } = useContext(MyContext);

  const { data, isLoading, isSuccess } = useQuery("friendList", getFriendList);

  useEffect(() => {
    if (data) setFriendList(data.data.friendList);
    handleAllFriends(data?.data.friendList);
  }, [data]);

  return (
    <div className="w-full max-h-96 overflow-y-scroll mt-10">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-2 border-t-dark rounded-full border-brand border-b-transparent animate-spin"></div>
        </div>
      ) : null}
      {isSuccess ? <Friends friends={friendList} /> : null}
    </div>
  );
};

export default FriendsList;
