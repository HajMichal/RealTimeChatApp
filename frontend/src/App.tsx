import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCurrentUserData } from "./api/getUserApi";
import { FiSettings } from "react-icons/fi";
import { BsSearch, BsEmojiSmile, BsSendFill } from "react-icons/bs";
import { TbPhoneCall } from "react-icons/tb";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { HiOutlineInformationCircle } from "react-icons/hi";

import Chat from "./components/Chat";
import Alert from "./components/Alert";
import Drawer from "./components/Drawer";
import FriendsList from "./components/FriendsList";
import FriendsQueue from "./components/FriendsQueue";
import LookForFriends from "./components/LookForFriends";
import { friend } from "./interfaces";
import { Avatar, Indicator, Input } from "@mantine/core";

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
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [friendsList, setFriendsList] = useState<friend[]>();
  const [currentChatFriend, setCurrentChatFriend] = useState<friend>();
  const [socket, setSocket] = useState<string>();

  const { data, isError } = useQuery("user", getCurrentUserData, {
    retry: 2,
    retryDelay: 700,
  });
  const _id = data?.data.id;

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
    // <div className="flex w-full h-screen justify-center pb-14 pt-5 bg-dark">
    //   {isError ? <Alert /> : null}

    //   <div className="absolute top-10 left-5 z-40 tablet:hidden">
    //     <MyContext.Provider value={{ handleReceiverId, handleAllFriends, socket, _id }}>
    //       <Drawer />
    //     </MyContext.Provider>
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
      <div id="sidebar" className="w-[20%] min-w-[320px] bg-white h-screen p-5">
        <div className="flex items-center justify-between ">
          <h1 className="text-brand font-orkneyBold text-4xl ">ChatWebApp</h1>
          <div className="bg-green-100 rounded-full w-8 h-8 flex justify-center items-center">
            <FiSettings className="w-5 h-5 text-brand " />
          </div>
        </div>
        <div id="searchBar" className="w-full my-5">
          <Input icon={<BsSearch />} radius="md" size="md" placeholder="Search..." />
        </div>
        <div id="pendingFriends">
          <h2 className="font-orkneyLight">Pending:</h2>
          <div className="flex items-center p-2">
            <Avatar
              src="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png"
              alt="avatar"
              radius="xl"
              color="white"
            />
            <div className="px-2 text-black w-full">
              <h3 className="text-sm">Name Surname</h3>
              <h4 className=" text-brand text-xs">Waiting For Submit</h4>
            </div>
            <div className="text-xs text-right">14:28</div>
          </div>
        </div>
        <div id="friendsList" className="pt-5">
          <h2 className="font-orkneyLight">Friends:</h2>
          <div className="flex items-center p-2">
            <Indicator color="teal" processing>
              <Avatar
                src="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png"
                alt="avatar"
                radius="xl"
                color="white"
              />
            </Indicator>
            <div className="px-2 text-black w-full">
              <h3 className="text-sm">Name Surname</h3>
              <h4 className=" text-brand text-xs">Last Message</h4>
            </div>
            <div className="text-xs w-full text-right">14:28</div>
          </div>
        </div>
      </div>
      <div id="MesseageArea" className="w-full h-screen flex flex-col justify-between pb-8">
        <div className="h-[8%] w-full bg-white bg-opacity-50 flex items-center justify-between px-10 p-3">
          <div className="flex">
            <Avatar
              src="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png"
              alt="avatar"
              radius="xl"
              color="white"
              size={50}
            />
            <div className="px-2 text-black w-full">
              <h3 className="">Name Surname</h3>
              <h4 className=" text-brand text-sm">Typing...</h4>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <HiOutlineVideoCamera className="w-9 h-9 text-brand" />
            <TbPhoneCall className="w-8 h-8 text-brand" />
            <HiOutlineInformationCircle className="w-8 h-8 text-brand" />
          </div>
        </div>
        <div className="w-full px-4 flex">
          <Input
            icon={<BsEmojiSmile className="w-6 h-6" />}
            rightSection={<BsSendFill className="w-8 h-8 text-brand" />}
            radius="lg"
            size="xl"
            placeholder="Write a message"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
