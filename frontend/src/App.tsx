import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCurrentUserData } from "./api/getUserApi";

import { useMediaQuery } from "react-responsive";

import { friend } from "./interfaces";
import { useNavigate } from "react-router-dom";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import ConversationBar from "./components/ConversationBar";

type ContextType = {
  handleReceiverId: (receiverId: number) => void;
  handleAllFriends: (friendsList: friend[]) => void;
  socket: any;
  _id: number | null;
};
export const MyContext = React.createContext<ContextType>({
  handleReceiverId: () => {},
  handleAllFriends: () => {},
  socket: "",
  _id: null,
});

function App() {
  const navigate = useNavigate();
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [friendsList, setFriendsList] = useState<friend[]>();
  const [currentChatFriend, setCurrentChatFriend] = useState<friend>();
  const [socket, setSocket] = useState<string>();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 700px)" });

  const { data: currentUserData } = useQuery("user", getCurrentUserData, {
    retry: 2,
    retryDelay: 500,
    onError() {
      navigate("/login");
    },
  });
  // console.log(currentUserData?.data.id);
  const handleSocket = (socketId: string) => {
    setSocket(socketId);
  };

  const handleReceiverId = (receiverId: number) => {
    setReceiverId(receiverId);
  };

  const handleAllFriends = (friendsList: friend[]) => {
    setFriendsList(friendsList);
  };

  useEffect(() => {
    if (friendsList !== undefined) {
      const friend = friendsList.find((friend) => friend.friendsId === receiverId);
      setCurrentChatFriend(friend);
    }
  }, [friendsList, receiverId]);

  return (
    <div className="bg-backgroundGray w-screen h-screen font-orkney flex">
      <MyContext.Provider
        value={{ handleReceiverId, handleAllFriends, socket, _id: currentUserData?.data.id }}
      >
        <Sidebar isSmallScreen={isSmallScreen} />
      </MyContext.Provider>
      <div id="MesseageArea" className="w-full h-screen overflow-hidden flex flex-col pb-3">
        <ConversationBar currentChatFriend={currentChatFriend} isSmallScreen={isSmallScreen} />
        <div className="w-full px-4 h-full max-h-[92%] mt-5">
          <Chat
            username={currentUserData?.data.name}
            _id={currentUserData?.data.id}
            receiverId={receiverId}
            chatFriend={currentChatFriend}
            setSocket={handleSocket}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
