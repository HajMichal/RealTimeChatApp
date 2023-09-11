import { Indicator, Avatar } from "@mantine/core";
import React from "react";

interface FriendCardType {
  ping?: boolean;
  name: string;
  time?: string;
  requestFriend?: boolean;
  avatar: string;
}

export const FriendCard = ({
  name,

  requestFriend = false,
  ping = false,
  avatar,
}: FriendCardType) => {
  return (
    <div className="flex items-center p-2">
      <Indicator color="teal" processing disabled={!ping}>
        <Avatar src={avatar} alt="avatar" radius="xl" color="white" />
      </Indicator>
      <div className="px-2 text-black w-full">
        <h3 className="text-sm ">{name}</h3>
        <h4 className=" text-brand text-xs w-full">
          {requestFriend ? "Waiting for Submit" : "Last Message"}
        </h4>
      </div>
      {/* <div className="text-xs text-right">{time}</div> */}
    </div>
  );
};
