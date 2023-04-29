import { useEffect, useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { io, Socket } from "socket.io-client";
import { useForm, SubmitHandler } from "react-hook-form";

import { TbSend } from "react-icons/tb";
import { BsFillChatDotsFill } from "react-icons/bs";
import { motion } from "framer-motion";

import { msgInput, chatTypes, messageData } from "../interfaces";

import { loadMessage } from "../api/getMessages";
import { saveMessage } from "../api/saveMessage";
import { formatTime } from "./formatTime";

const Chat = ({ username, _id, receiverId, chatFriend, setSocket }: chatTypes) => {
  const socket = useRef<Socket>();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef(null);
  const [messageList, setMessageList] = useState<messageData[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<messageData>();

  const { register, handleSubmit, reset } = useForm<msgInput>();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["receiverId", receiverId],
    queryFn: () => loadMessage(receiverId),
    enabled: receiverId !== undefined,
  });

  const { mutate, isError } = useMutation(saveMessage, {
    onSuccess() {
      queryClient.invalidateQueries("receiverId");
    },
  });

  useEffect(() => {
    socket.current = io("http://localhost:3000");
    setSocket(socket.current)
  }, []);

  // Adding users to current Onnline list 
  useEffect(() => {
    if (!socket.current) return;
    socket.current.emit("addUser", _id);
    socket.current.on("getUsers", (users: any) => {
      console.log(users);
    });
  }, [username, _id]);

  // Listening 
  useEffect(() => {
    if (!socket.current) return;
    socket.current.on("getMessage", ({ messageData }) => {
      const messageData_ = {
        message: messageData.message,
        userId: messageData.userId,
        time: messageData.time,
        receiverId: messageData.receiverId,
      };

      setArrivalMessage(messageData_)

    });
  }, [arrivalMessage]);

  useEffect(() => {
    if (isSuccess && receiverId !== null) {
      setMessageList(data.data);
    }

    if (arrivalMessage && chatFriend?.friendsId === arrivalMessage.userId) {
      setMessageList((prev) => [...prev, arrivalMessage]);
    }

  }, [chatFriend, isSuccess, arrivalMessage]);

  useEffect(() => {
    if (messagesEndRef.current) {
      // @ts-ignore
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messageList]);


  const handleNotification = () => {
    if (!socket.current) return;
    socket.current.emit("sendNotification", {
      senderName: _id,
      receiverId: receiverId
    });
  }

  const sendMessage: SubmitHandler<msgInput> = async (data) => {
    if (data.message !== "" && socket.current) {
      const messageData = {
        message: data.message,
        userId: _id,
        time: new Date(Date.now()),
        receiverId: receiverId,
      };
      if (isError) return null;

        socket.current.emit("sendMessage", {
          receiverId: receiverId,
          messageData,
          senderId: _id,
        });
        setMessageList((prev) => [...prev, messageData]);
        handleNotification()
        mutate(messageData);
      }
    
    reset();
  };

  return (
    <>
      <div className="row-start-1 row-span-5 overflow-y-scroll overflow-x-hidden scrollbar-hide scroll-smooth scroll">
        <div className="flex tablet:hidden z-30 fixed bg-dark w-11/12">
          <h1 className="w-full text-center font-semibold text-3xl italic my-2">
            <span className="text-brand">Chat</span>App
          </h1>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center ">
            <div className="w-20 h-20 border-2 border-t-dark rounded-full border-brand border-b-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="w-full h-full " id="text-area">
            <ul>
              {receiverId === null ? (
                <li className="flex chat m-5 mt-20 tablet:mt-5 tablet:mx-16 text-5xl tablet:text-7xl text-opacity-20 text-mid justify-center text-center">
                  <p>Open new chat</p>
                  <div className="self-center">
                    <BsFillChatDotsFill />
                  </div>
                </li>
              ) : (
                messageList.map((messageContent, index) => (
                  <li
                    ref={messagesEndRef}
                    className={
                      _id === messageContent.userId
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
                      {chatFriend?.friendsId === messageContent.userId
                        ? chatFriend.friendsName
                        : username}
                      <time className="text-xs opacity-50 mx-2">
                        {formatTime(messageContent.time)}
                      </time>
                    </div>
                    <div
                      className={
                        _id === messageContent.userId
                          ? "chat-bubble bg-brand text-light font-medium"
                          : "chat-bubble bg-darkblue text-light font-medium"
                      }
                    >
                      {messageContent.message}
                    </div>
                    {/* <div className="chat-footer opacity-50">
                      Seen
                    </div> */}
                    <div />
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
      <motion.form
        onSubmit={handleSubmit(sendMessage)}
        className="flex justify-center self-center w-full row-start-6"
        initial={{ opacity: 0, scale: receiverId !== null ? 0.5 : 0 }}
        animate={{
          opacity: receiverId !== null ? 1 : 0,
          scale: receiverId !== null ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <input
          {...register("message")}
          type="text"
          placeholder="Type here"
          className={
            receiverId !== null
              ? "input input-bordered input-md rounded-none w-full max-w-lg mx-2"
              : "hidden"
          }
          onKeyDown={(event) => {
            event.key === "Enter" && handleSubmit(sendMessage);
          }}
        />
        <button
          type="submit"
          className={receiverId !== null ? "w-9 text-mid block" : "hidden"}
        >
          {" "}
          <TbSend className="w-full h-full" />
        </button>
      </motion.form>
    </>
  );
};

export default Chat;
