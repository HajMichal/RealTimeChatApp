import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { friend, friendProps, FriendViewProps } from "../interfaces";
import remover from "../api/removeFriend";

import { BsThreeDotsVertical, BsFillChatDotsFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";


function Friends({ friends }: friendProps, props:any) {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onDataChange(event.target.value);
    console.log(props.onDataChange(event.target.value))
  };
  // @ts-ignore
  return friends.map((friend: friend) => <FriendView key={friend.id} data={friend} onDataChange={props.onDataChange} />)
}


const FriendView: React.FC<FriendViewProps> = (props,  ) => {

  const [viewOptions, setViewOptions] = useState<boolean>(false);
  
  const queryClient = useQueryClient()
  const {mutate} = useMutation(remover,  {
    onSuccess: () => {
      queryClient.invalidateQueries("friendList")
    },
  } )


  
  const startChat = () => {
      localStorage.setItem("reciverId", JSON.stringify(props.data.friendsId))
  }
  
  
  const removeFromFriends = () => {
    mutate(props.data.id)
  }

  return (
    <div className="card-body my-3 p-1 text-mid w-full" key={props.data.id}>
      <div className="grid grid-cols-8 h-14 items-center gap-3 ml-4">
        <div className="avatar -my-4 col-span-2">
          <div className="w-12 rounded-full">
            <img src="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png" />
          </div>
        </div>
        <p className="col-start-3 col-end-7 overflow-x-hidden">
          {props.data.friendsName}
        </p>

        <button
          className="col-start-7 col-end-8"
          onClick={() => setViewOptions(!viewOptions)}
        >
          <BsThreeDotsVertical className="w-8 h-8" />
        </button>
        <div
          className={`h-full w-full col-start-8 bg-dark ${
            viewOptions ? "flex flex-wrap" : "hidden"
          }`}
        >
          <button
            onClick={startChat}
            className="text-green-400 w-full items-center flex "
          >
            {" "}
            <BsFillChatDotsFill />
          </button>
          <label
            onClick={removeFromFriends}
            className="text-red-600 w-full  items-center flex hover:cursor-pointer"
          >
            {" "}
            <FaTrashAlt />
          </label>

        </div>
      </div>
    </div>
  );}



export default Friends;
