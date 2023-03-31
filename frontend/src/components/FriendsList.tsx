import React, {useEffect, useState} from "react";
import { BsThreeDotsVertical, BsFillChatDotsFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { getFriendList } from "../api/getFriendList";
import { userId, friend } from "../interfaces";

const FriendsList = (currentUserId: userId) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [currentChat, setCurrentChat] = useState()
    useEffect(() => {
      // const getConversation = async() => {
      //   try {
      //     const res = await // GET FRIENDS LIST
      //   } catch (error) {
          
      //   }
      // }
    })

    const { data, isSuccess } = useQuery("friendList", getFriendList, {

    })
    const FriendsList = isSuccess ?  data?.data.friendList : null
    console.log(FriendsList)
  return (
    <div className="w-full max-h-96 overflow-y-scroll mt-10">

        <div className="card-body my-3 p-1 text-mid w-full">
          <div className="grid grid-cols-8 h-14 items-center gap-3 ml-4">
            <div className="avatar -my-4 col-span-2">
              <div className="w-12 rounded-full">
                <img src="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png" />
              </div>
            </div>
            <p className="col-start-3 col-end-7 overflow-x-hidden">"friend.friendsName"</p> 
            <button className="col-start-7 col-end-8" onClick={() => setIsOpen(!isOpen)} ><BsThreeDotsVertical className="w-8 h-8" /></button>
            <div className={`h-full w-full col-start-8 bg-dark ${isOpen ? 'flex flex-wrap' : 'hidden'}`}>
                  <button className="text-green-400 w-full items-center flex "><BsFillChatDotsFill/></button>
                  <button className="text-red-600 w-full items-center flex "> <FaTrashAlt/></button>
              </div>
          </div>
        </div>
        

    </div>
  );
};

export default FriendsList;
