import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCurrentUserData } from "./api/getUserApi";

import Chat from "./components/Chat";
import Alert from "./components/Alert";
import Drawer from "./components/Drawer";
import FriendsList from "./components/FriendsList";
import FriendsQueue from "./components/FriendsQueue";
import LookForFriends from "./components/LookForFriends";
import { friend } from "./interfaces";

type ContextType = {
  handleReceiverId: (receiverId: number) => void;
  handleAllFriends: (friendsList: friend[]) => void;
  socket: any;
  _id: number | null
};
export const MyContext = React.createContext<ContextType>({
  handleReceiverId: () => {},
  handleAllFriends: () => {},
  socket: "",
  _id: null
});

function App() {
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [friendsList, setFriendsList] = useState<friend[]>();
  const [currentChatFriend, setCurrentChatFriend] = useState<friend>();
  const [socket, setSocket] = useState<string>()

  const { data, isError } = useQuery("user", getCurrentUserData, {
    retry: 2,
    retryDelay: 700,
  });
  const _id = data?.data.id
  
  const handleSocket = (socketId: string) => {
    setSocket(socketId)
  }

  const handleReceiverId = (receiverId: number) => {
    setReceiverId(receiverId);
  };

  const handleAllFriends = (friendsList: friend[]) => {
    setFriendsList(friendsList);
  };
  useEffect(() => {
    if (friendsList !== undefined) {
      const friend = friendsList.find(
        (friend) => friend.friendsId === receiverId
      );
      setCurrentChatFriend(friend);
    }
  }, [friendsList, receiverId]);

  return (
    <div className="flex w-full h-screen justify-center pb-14 pt-5 bg-dark">
      {isError ? <Alert /> : null}

      <div className="absolute top-10 left-5 z-40 tablet:hidden">
        <MyContext.Provider value={{ handleReceiverId, handleAllFriends, socket, _id }}>
          <Drawer />
        </MyContext.Provider>
      </div>
      <div
        className={
          isError
            ? "w-full laptop:w-3/4 h-full justify-center desktop:max-w-5xl laptop:shadow-5xl shadow-dark bg-light blur-sm "
            : "bg-light w-full laptop:w-3/4 h-full justify-center desktop:max-w-5xl laptop:shadow-5xl shadow-brand"
        }
      >
        <div className="grid grid-rows-8 grid-flow-row grid-cols-3 h-full bg-dark">
          <div className="columns-1 col-start-1 bg-dark row-span-5 border-2 border-r border-brand rounded-xl hidden tablet:block">
            <h1 className="w-full text-center mt-2 font-semibold text-4xl italic">
              <span className="text-brand">Chat</span>App
            </h1>
            <h2 className="w-full mt-5 text-center text-2xl">
              Hey {data?.data.name}
            </h2>

            <div className="w-full mt-5">
              <LookForFriends mainUserId={data?.data.id} />
              
              <MyContext.Provider
                value={{ handleReceiverId, handleAllFriends, socket, _id }}
              >
                <FriendsQueue />
                <FriendsList />
              </MyContext.Provider>
            </div>
          </div>

          <div className="bg-dark row-start-1 row-span-5 p-5 tablet:col-start-2 col-span-3 tablet:col-span-2 grid grid-rows-6  border-2 border-l  border-brand rounded-xl">
            <Chat
              username={data?.data.name}
              _id={data?.data.id}
              receiverId={receiverId}
              chatFriend={currentChatFriend}
              setSocket={handleSocket}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
