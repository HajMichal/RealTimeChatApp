import { Indicator, Avatar } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { MyContext } from "../App";
import { addFriend } from "../api/addFriend";
import { removeQueue } from "../api/removeInvitation";
import { invitationsRequests } from "../interfaces";

interface FriendCardType {
  ping?: boolean;
  isInvitation?: boolean;
  name?: string;
  data?: invitationsRequests;
  time?: string;
  requestFriend?: boolean;
  avatar: string;
}

export const FriendCard = ({
  data,
  name,
  isInvitation = false,
  requestFriend = false,
  ping = false,
  avatar,
}: FriendCardType) => {
  const [err, setIsError] = useState(false);
  const { _id } = useContext(MyContext);
  const queryClient = useQueryClient();

  const { mutate: removeFromQueue } = useMutation(removeQueue, {
    onSuccess: () => {
      queryClient.invalidateQueries("friendQueue");
    },
  });
  const {
    mutate: addFriendFromQueue,
    error,
    isError,
  } = useMutation(addFriend, {
    onSuccess: () => {
      queryClient.invalidateQueries("friendList");
    },
  });

  const handleAcceptButton = (friendData: invitationsRequests) => {
    // adding friend to FRIEND friendList
    addFriendFromQueue({
      friendsId: friendData.userId,
      friendsName: friendData.userName,
      userId: friendData.friendId,
    });
    removeFromQueue(friendData.id);
    // adding friend to USER friendList
    addFriendFromQueue({
      friendsId: friendData.friendId,
      friendsName: friendData.friendName,
      userId: friendData.userId,
    });
  };

  const handleRejectButton = (friendData: invitationsRequests) => {
    removeFromQueue(friendData.id);
  };

  useEffect(() => {
    setIsError(isError);
  }, [error]);

  return (
    <div className="flex items-center p-2">
      <Indicator color="teal" processing disabled={!ping}>
        <Avatar src={avatar} alt="avatar" radius="xl" color="white" />
      </Indicator>
      <div className="px-2 text-black w-full">
        <h3 className="text-sm ">{data ? data.friendName : name}</h3>
        <h4 className=" text-brand text-xs w-full">
          {requestFriend
            ? isInvitation
              ? "Invitation sent"
              : "Waiting for Submit"
            : "Last Message"}
        </h4>
      </div>
      <div className="gap-2 flex flex-col text-sm">
        {isInvitation && (
          <button
            className="px-4 w-full bg-brand text-white hover:opacity-80 duration-150 hover:scale-105"
            onClick={() => handleAcceptButton(data!)}
          >
            Accept
          </button>
        )}
        {isInvitation && (
          <button
            className="px-4 w-full bg-red-600 text-white hover:opacity-90 duration-150 hover:scale-105"
            onClick={() => handleRejectButton(data!)}
          >
            Reject
          </button>
        )}
      </div>
    </div>
  );
};
