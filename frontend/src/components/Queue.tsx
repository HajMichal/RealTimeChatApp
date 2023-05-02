import React, { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { MyContext } from "../App";
import { BsCheck } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx"
import {
  queueProps,
  queueViewProps,
  invitations_requests
} from "../interfaces";
import { addFriend } from "../api/addFriend";
import { removeQueue } from "../api/removeInvitation";

function Queue({ queue }: queueProps) {
  const { friendInvitations, friendRequests } = queue;

  return (
    <>
      {friendInvitations?.map((invitation) => (
        <QueueView key={invitation.id} data={invitation} />
      ))}
      {friendRequests?.map((request) => (
        <QueueView key={request.id} data={request} />
      ))}
    </>
  );
}

const QueueView: React.FC<queueViewProps> = (props) => {
  const { _id } = useContext(MyContext)
  const queryClient = useQueryClient();

  const { mutate: removeFromQueue } = useMutation(removeQueue, {
    onSuccess: () => {
      queryClient.invalidateQueries("friendQueue");
    },
  });
  const { mutate: addFriendFromQueue, error } = useMutation(addFriend, {
    onSuccess: () => {
      queryClient.invalidateQueries("friendList");
    },
  });
  


  const handleAcceptButton = (friendData: invitations_requests) => {
    // adding friend to FRIEND friendList
    addFriendFromQueue({
      friendsId:friendData.userId,
      friendsName: friendData.userName,
      userId: friendData.friendId 
    })
        // adding friend to USER friendList
    addFriendFromQueue({
      friendsId: friendData.friendId,
      friendsName: friendData.friendName,
      userId: friendData.userId
    })
    removeFromQueue(friendData.id)
  }

  const handleRejectButton = (friendData: invitations_requests) => {
    removeFromQueue(friendData.id);
  }

  return (
    <div
      className="card-body my-2 p-1 text-mid overflow-hidden w-full duration-300 hover:cursor-pointer hover:shadow-md hover:shadow-darkblue"
      key={props.data.id}
    >
      {/* {error 
        ? <div className="alert alert-error shadow-lg absolute z-50">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error.response.data.message}</span>
            </div>
          </div>
        :null} */}
      <div className="grid grid-cols-8 h-14 items-center gap-3 ml-4">
        <div className="avatar -my-4 col-span-2">
          <div className="w-12 rounded-full">
            <img
              alt="avatar"
              src="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png"
            />
          </div>
        </div>

        <button className="col-start-3 h-full col-end-6 overflow-x-hidden hover:cursor-pointer">
          {_id === props.data.friendId ? props.data.userName : props.data.friendName}
        </button>
        {_id === props.data.friendId 
          ?  
            <div className="flex col-start-6  gap-2 laptop:gap-4 ml-2">
              <button onClick={() => handleAcceptButton(props.data)} className="btn btn-xs laptop:btn-sm btn-circle flex justify-self-end items-center bg-green-500 hover:scale-125 hover:bg-green-400">
                  <BsCheck className="text-2xl laptop:text-3xl text-dark" />
              </button>
              <button onClick={() => handleRejectButton(props.data)} className="btn btn-xs laptop:btn-sm btn-circle bg-red-600 hover:scale-125 hover:bg-red-500">
                <RxCross2 className="text-lg laptop:text-2xl text-dark" />
              </button>
            </div>
          : 
            <div className="col-start-6 ">
              <p className="opacity-40">Pending...</p>
            </div>
        }

      </div>
    </div>
  );
};

export default Queue;
