import React from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { friend } from "../interfaces";
import { Avatar } from "@mantine/core";
import { HiOutlineVideoCamera, HiOutlineInformationCircle } from "react-icons/hi";
import { TbPhoneCall } from "react-icons/tb";
import { useDisclosure } from "@mantine/hooks";

interface ConversationBarType {
  isSmallScreen: boolean;
  currentChatFriend?: friend;
}

const ConversationBar = ({ isSmallScreen, currentChatFriend }: ConversationBarType) => {
  const [opened, { open }] = useDisclosure(false);
  return (
    <div className="h-[8%] w-full bg-white bg-opacity-50 flex items-center justify-between px-10 p-3">
      {isSmallScreen && (
        <button>
          <AiOutlineDoubleLeft onClick={open} className="text-brand text-xl mr-6" />
        </button>
      )}
      {currentChatFriend && (
        <div className="flex w-full justify-between">
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
                {currentChatFriend.isSentMessage ? "Sent you a message" : "Write a message"}
              </h4>
            </div>
          </>

          <div className="flex items-center gap-8">
            <HiOutlineVideoCamera className="w-9 h-9 text-brand" />
            <TbPhoneCall className="w-8 h-8 text-brand" />
            <HiOutlineInformationCircle className="w-8 h-8 text-brand" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationBar;
