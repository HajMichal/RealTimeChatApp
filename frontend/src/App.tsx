import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCurrentUserData } from "./api/getUserApi";
import { FiSettings } from "react-icons/fi";
import { BsSearch, BsEmojiSmile, BsSendFill } from "react-icons/bs";
import { TbPhoneCall } from "react-icons/tb";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";

import FriendsQueue from "./components/FriendsQueue";
import { SearchBar } from "./components/SearchBar";
import { FriendCard } from "./components/FriendCard";

import { friend } from "./interfaces";
import { Avatar, Indicator, Input } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Chat from "./components/Chat";
import FriendsList from "./components/FriendsList";

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
  const { data: currentUserData, isError } = useQuery("user", getCurrentUserData, {
    retry: 2,
    retryDelay: 500,
    onError() {
      navigate("/login");
    },
  });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 700px)" });
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
  const [opened, { open, close }] = useDisclosure(false);
  return (
    // <div className="flex w-full h-screen justify-center pb-14 pt-5 bg-dark">
    //   {isError ? <Alert /> : null}

    //   <div className="absolute top-10 left-5 z-40 tablet:hidden">
    // <MyContext.Provider value={{ handleReceiverId, handleAllFriends, socket, _id }}>
    //   <Drawer />
    // </MyContext.Provider>
    //   </div>
    //   <div
    //     className={
    //       isError
    //         ? "w-full laptop:w-3/4 h-full justify-center desktop:max-w-5xl laptop:shadow-5xl shadow-dark bg-light blur-sm "
    //         : "bg-light w-full laptop:w-3/4 h-full justify-center desktop:max-w-5xl laptop:shadow-5xl shadow-brand"
    //     }
    //   >
    //     <div className="grid grid-rows-8 grid-flow-row grid-cols-3 h-full bg-dark">
    //       <div className="columns-1 col-start-1 bg-dark row-span-5 border-2 border-r border-brand rounded-xl hidden tablet:block">
    //         <h1 className="w-full text-center mt-2 font-semibold text-4xl italic">
    //           <span className="text-brand">Chat</span>App
    //         </h1>
    //         <h2 className="w-full mt-5 text-center text-2xl">
    //           Hey {data?.data.name}
    //         </h2>

    //         <div className="w-full mt-5">
    //           <LookForFriends mainUserId={data?.data.id} />

    //           <MyContext.Provider
    //             value={{ handleReceiverId, handleAllFriends, socket, _id }}
    //           >
    //             <FriendsQueue />
    //             <FriendsList />
    //           </MyContext.Provider>
    //         </div>
    //       </div>

    //       <div className="bg-dark row-start-1 row-span-5 p-5 tablet:col-start-2 col-span-3 tablet:col-span-2 grid grid-rows-6  border-2 border-l  border-brand rounded-xl">
    //         <Chat
    //           username={data?.data.name}
    //           _id={data?.data.id}
    //           receiverId={receiverId}
    //           chatFriend={currentChatFriend}
    //           setSocket={handleSocket}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-backgroundGray w-screen h-screen font-orkney flex">
      <MyContext.Provider value={{ handleReceiverId, handleAllFriends, socket, _id: null }}>
        {isSmallScreen && (
          <Drawer opened={opened} onClose={close}>
            <div id="sidebar" className="w-[20%] min-w-[320px] bg-white p-5">
              <div className="flex items-center justify-between ">
                <h1 className="text-brand font-orkneyBold text-4xl ">ChatWebApp</h1>
                <div className="bg-green-100 rounded-full w-8 h-8 flex justify-center items-center">
                  <FiSettings className="w-5 h-5 text-brand " />
                </div>
              </div>
              <SearchBar mainUserId={currentUserData?.data.id} />
              <div id="pendingFriends" className="mt-24">
                <h2 className="font-orkneyLight">Pending:</h2>
                <FriendsQueue />
              </div>

              <div id="friendsList" className="pt-5">
                <h2 className="font-orkneyLight">Friends:</h2>
                <FriendsList />
                {/* <FriendCard
                  data={}
                  ping
                  time="10:28"
                  avatar="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png"
                /> */}
              </div>
            </div>
          </Drawer>
        )}
        {!isSmallScreen && (
          <div id="sidebar" className="w-[20%] min-w-[320px] bg-white h-screen p-5">
            <div className="flex items-center justify-between ">
              <h1 className="text-brand font-orkneyBold text-4xl ">ChatWebApp</h1>
              <div className="bg-green-100 rounded-full w-8 h-8 flex justify-center items-center">
                <FiSettings className="w-5 h-5 text-brand " />
              </div>
            </div>
            <SearchBar mainUserId={currentUserData?.data.id} />
            <div id="pendingFriends" className="mt-24">
              <h2 className="font-orkneyLight">Pending:</h2>
              <FriendsQueue />
            </div>

            <div id="friendsList" className="pt-5">
              <h2 className="font-orkneyLight">Friends:</h2>
              <FriendsList />
            </div>
          </div>
        )}
      </MyContext.Provider>
      <div id="MesseageArea" className="w-full h-screen overflow-hidden flex flex-col pb-3">
        <div className="h-[8%] w-full bg-white bg-opacity-50 flex items-center justify-between px-10 p-3">
          <div className="flex">
            {isSmallScreen && (
              <button>
                <AiOutlineDoubleLeft onClick={open} className="text-brand text-xl mr-6" />
              </button>
            )}
            {currentChatFriend && (
              <>
                <Avatar
                  src="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png"
                  alt="avatar"
                  radius="xl"
                  color="white"
                  size={50}
                />
                <div className="px-2 text-black w-full">
                  <h3 className="">{currentChatFriend?.friendsName}</h3>
                  <h4 className=" text-brand text-sm">
                    {currentChatFriend.isSentMessage ? "Sent you a message" : "Write message"}
                  </h4>
                </div>
              </>
            )}
          </div>
          {currentChatFriend && (
            <div className="flex items-center gap-8">
              <HiOutlineVideoCamera className="w-9 h-9 text-brand" />
              <TbPhoneCall className="w-8 h-8 text-brand" />
              <HiOutlineInformationCircle className="w-8 h-8 text-brand" />
            </div>
          )}
        </div>
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
