import { useEffect, useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { io, Socket } from "socket.io-client";
import { useForm, SubmitHandler } from "react-hook-form";


import { TbSend } from "react-icons/tb";
import { BsFillChatDotsFill } from "react-icons/bs";
import { motion } from "framer-motion"

import Drawer from "./Drawer";
import { msgInput, chatTypes, messageData} from "../interfaces";

import { loadMessage } from "../api/getMessages";
import { saveMessage } from "../api/saveMessage";
import { formatTime } from "./formatTime";

const Chat = ({ username, _id, receiverId, chatFriend }: chatTypes) => {

  const socket = useRef<Socket>();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef(null)
  const [messageList, setMessageList] = useState<messageData[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<messageData>();
  
  const { register, handleSubmit, reset } = useForm<msgInput>();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["receiverId", receiverId],
    queryFn: () => loadMessage(receiverId),
    enabled: receiverId !== undefined,
  });

  const { mutate, isError, error } = useMutation(saveMessage, {
    onSuccess() {
      queryClient.invalidateQueries("receiverId");
    },
  });

  useEffect(() => {
    socket.current = io("http://localhost:3000");
  }, []);

  useEffect(() => {
    if (!socket.current) return;
    socket.current.emit("addUser", _id);
    socket.current.on("getUsers", (users: any) => {
      console.log(users)
    });
  }, [username, _id]);

  useEffect(() => {
    if (!socket.current) return;
    socket.current.on("getMessage", ({messageData}) => {
      setArrivalMessage({
        message: messageData.message,
        userId: messageData.userId,
        time: messageData.time,
        receiverId: messageData.receiverId
      });
    });
  }, []);

  useEffect(() => {
    if (isSuccess && receiverId !== null) {
      setMessageList(data.data)
    }
    if(arrivalMessage && chatFriend?.friendsId === arrivalMessage.userId) {
      setMessageList((prev) => [...prev, arrivalMessage]) 
    }
  }, [chatFriend, isSuccess, arrivalMessage])

  useEffect(() => {
    if (messagesEndRef.current) {
      // @ts-ignore
      messagesEndRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  },
  [messageList])

  const sendMessage: SubmitHandler<msgInput> = async (data) => {
    if (data.message !== "" && socket.current) {

      const messageData = {
        message: data.message,
        userId: _id,
        time: new Date(Date.now()),
        receiverId: receiverId,
      };
      if (isError) {
        console.log(error);
        return null;
      } else {
        socket.current.emit("sendMessage", {
          receiverId: receiverId,
          messageData,
          senderId: _id,
        });
        setMessageList((prev) => [...prev, messageData])
        mutate(messageData);
      }
    }
    reset();
  };


  return (
    <>
      <div className="row-start-1 row-span-5 overflow-y-scroll overflow-x-hidden scrollbar-hide scroll-smooth scroll">
        <div className="flex tablet:hidden">
          <Drawer />

          <h1 className="w-full text-center font-semibold text-3xl italic mt-2">
            <span className="text-brand">Chat</span>App
          </h1>
        </div>
        {isLoading 
        ? 
        <div className="flex justify-center items-center ">
          <div className="w-20 h-20 border-2 border-t-dark rounded-full border-brand border-b-transparent animate-spin"></div>
        </div>
        :
        <div className="w-full h-full " id="text-area">
          <ul>
            {receiverId === null ? (
              <div className="flex chat m-5 tablet:mx-16 text-6xl tablet:text-9xl text-opacity-20 text-mid justify-center">
                <p>
                  Open new chat <BsFillChatDotsFill />
                </p>
              </div>
            ) : (
              messageList.map((messageContent, index) => (
                <div
                  ref={messagesEndRef}
                  className={
                    _id ===  messageContent.userId 
                      ? "chat chat-end my-3 "
                      : "chat chat-start my-3"
                  }
                  key={index}
                >
   
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img src="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png" />
                        </div>
                    </div>
                    <div className="chat-header">
                      {chatFriend?.friendsId === messageContent.userId ? chatFriend.friendsName : username}
                      <time className="text-xs opacity-50 mx-2">
                        {/* {format(parseISO(messageContent.time), 'yyyy/MM/dd kk:mm')} */}
                        {formatTime(messageContent.time)}
                      </time>
                    </div>
                  <div
                    className={
                      _id ===  messageContent.userId 
                        ? "chat-bubble bg-brand text-light font-medium"
                        : "chat-bubble bg-darkblue text-light font-medium"
                    }
                  >
                    {messageContent.message}
                  </div> 
                  {/* <div className="chat-footer opacity-50">
                      Seen
                    </div> */}
                <div  />    
                </div>
                
))
            )}
          </ul> 
        </div>
        }
      </div>
      <motion.form
        onSubmit={handleSubmit(sendMessage)}
        className="flex justify-center self-center w-full row-start-6"
        initial={{ opacity: 0, scale: receiverId !== null ? 0.5 : 0 }}
        animate={{ opacity: receiverId !== null ? 1 : 0, scale: receiverId !== null ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <input
          {...register("message")}
          type="text"
          placeholder="Type here"
          className={receiverId !== null ? "input input-bordered input-md rounded-none w-full max-w-lg mx-2" : "hidden"}
          onKeyDown={(event) => {
            event.key === "Enter" && handleSubmit(sendMessage);
          }}
        />
        <button type="submit" className={receiverId !== null ? "w-9 text-mid block" : "hidden"} >
          {" "}
          <TbSend className="w-full h-full" />
        </button>
      </motion.form>
    </>
  );
};

export default Chat;
