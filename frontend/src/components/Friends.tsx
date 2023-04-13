import React, { useState, useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { friend, friendProps, FriendViewProps } from "../interfaces";
import remover from "../api/removeFriend";
import { ReceiverIdContext } from "../App";

import { BsThreeDotsVertical, BsFillChatDotsFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";


function Friends({ friends }: friendProps) {
  return friends.map((friend: friend) => <FriendView key={friend.id} data={friend} />)
}


const FriendView: React.FC<FriendViewProps> = (props) => {

  const [viewOptions, setViewOptions] = useState<boolean>(false);
  
  // W tym miejscu queryClient pomaga w szybszym usunieciu z ekranu danego uzytkownika. Usuwa go odrazu 
  const queryClient = useQueryClient()
  const {mutate} = useMutation(remover,  {
    onSuccess: () => {
      queryClient.invalidateQueries("friendList")
    },
  } )

  const { handleReceiverId } = useContext(ReceiverIdContext)
  
  const startChat = () => {
    handleReceiverId(props.data.friendsId);
  };
  
  
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

          <button className="col-start-3 col-end-7 overflow-x-hidden hover:cursor-pointer" onClick={startChat} >
            {props.data.friendsName}
          </button>

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
