import React from "react";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FiSettings } from "react-icons/fi";
import { SearchBar } from "./SearchBar";
import FriendsQueue from "./FriendsQueue";
import FriendsList from "./FriendsList";

interface SideBarType {
  isSmallScreen: boolean;
}
const Sidebar = ({ isSmallScreen }: SideBarType) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      {isSmallScreen && (
        <Drawer opened={opened} onClose={close}>
          <div id="sidebar" className="w-[20%] min-w-[320px] bg-white p-5">
            <div className="flex items-center justify-between ">
              <h1 className="text-brand font-orkneyBold text-4xl ">ChatWebApp</h1>
              <div className="bg-green-100 rounded-full w-8 h-8 flex justify-center items-center">
                <FiSettings className="w-5 h-5 text-brand " />
              </div>
            </div>
            <SearchBar />
            <div id="pendingFriends" className="mt-24">
              <h2 className="font-orkneyLight">Pending:</h2>
              <FriendsQueue />
            </div>

            <div id="friendsList" className="pt-5">
              <h2 className="font-orkneyLight">Friends:</h2>
              <FriendsList />
            </div>
          </div>
        </Drawer>
      )}
      {!isSmallScreen && (
        <div id="sidebar" className="w-[320px] min-w-[320px] bg-white h-screen p-5">
          <div className="flex items-center justify-between ">
            <h1 className="text-brand font-orkneyBold text-4xl ">ChatWebApp</h1>
            <div className="bg-green-100 rounded-full w-8 h-8 flex justify-center items-center">
              <FiSettings className="w-5 h-5 text-brand " />
            </div>
          </div>
          <SearchBar />
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
    </>
  );
};

export default Sidebar;
