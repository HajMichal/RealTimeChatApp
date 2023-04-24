import React, { useState, useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { MyContext } from "../App";
import { friend, friendProps, FriendViewProps } from "../interfaces";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import remover from "../api/removeFriend";

function Friends({ friends }: friendProps) {
  return friends.map((friend: friend) => (
    <FriendView key={friend.id} data={friend}/>
  ));
}

const FriendView: React.FC<FriendViewProps> = (props) => {
  const [viewOptions, setViewOptions] = useState<boolean>(false);
  const [notification, setNotification] = useState(false)
  const [sender, setSender] = useState<number>()


  // W tym miejscu queryClient pomaga w szybszym usunieciu z ekranu danego uzytkownika. Usuwa go odrazu
  const queryClient = useQueryClient();
  const { mutate } = useMutation(remover, {
    onSuccess: () => {
      queryClient.invalidateQueries("friendList");
    },
  });

  const { handleReceiverId } = useContext(MyContext);
  const { socket } = useContext(MyContext)

  const startChat = () => {
    handleReceiverId(props.data.friendsId);
  };

  const removeFromFriends = () => {
    mutate(props.data.id);
  };

  // Setting notification when user is offline
  useEffect(() => {
    setNotification(props.data.isSentMessage)
  }, [props, startChat])

  // Setting notification when user is onnline 
  useEffect(() => {
    if (!socket) return;
    socket.on("getNotification", (data: any) => {
      setSender(data.senderName);
    });
  }, [socket])


  return (
    <div
      className="card-body my-3 p-1 text-mid w-full duration-300 hover:cursor-pointer hover:shadow-md hover:shadow-darkblue"
      key={props.data.id}
      onClick={() => setSender(0)}
    >
      <div className="grid grid-cols-8 h-14 items-center gap-3 ml-4">
        <div className="avatar -my-4 col-span-2" onClick={startChat}>
          <div className="w-12 rounded-full">
            <img src="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png" />
          </div>
          {notification || sender === props.data.friendsId
          ? <span className="relative flex justify-center items-start">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-brand opacity-75 -ml-2"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand -ml-2"></span>
            </span>
          : null}
        </div>

        <button
          className="col-start-3 h-full col-end-7 overflow-x-hidden hover:cursor-pointer"
          onClick={startChat}
        >
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
  );
};

export default Friends;
