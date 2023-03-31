import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { io, Socket } from "socket.io-client";

import Drawer from "./Drawer";
import { msgInput, chatTypes, messageData } from "../interfaces";

import { TbSend } from "react-icons/tb";

const Chat = ({ username, _id }: chatTypes) => {
  const [messageList, setMessageList] = useState<messageData[]>([]);
  const socket = useRef<Socket>();
  const {
    register,
    handleSubmit,
    reset
  } = useForm<msgInput>();
  
  useEffect(() => {
    socket.current = io("http://localhost:3000")
  }, [])
  
  useEffect(() => {
    if (!socket.current) return
    socket.current.emit("addUser", _id)
    socket.current.on("getUsers", (users: any) => {
      console.log(users)
    })
  }, [username, _id])

  useEffect(() => {
    if (!socket.current) return
    socket.current.on("reveice_message", (data: messageData) => {
      console.log(data);
      setMessageList((rest_list) => [...rest_list, data]);

    });
  }, [socket]);

  const sendMessage: SubmitHandler<msgInput> = async (data) => {
    if (data.message !== "" && socket.current) {

      const messageData = {
        message: data.message,
        author: username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes()
      };

      socket.current.emit("send_message", messageData);
      setMessageList((rest_list) => [...rest_list, messageData]);
      reset();
    }
  };

  // ZNALEZC RECIVER ID -> To jest ID uzytkowanika do ktorego wlasnie piszmey (znajdziesz go w './FriendsList.tsx')
  // po kliknieciu w zielony dymek konwersacji przesle dane tego uzytkownika w ktorym powinno tez byc ID (SPRAWDZ jako pierwsze)
  const sendMessage2: SubmitHandler<msgInput> = async (data) => {
    if (data.message !== "" && socket.current) {

      const messageData = {
        message: data.message,
        author: username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes()
      };

      socket.current.emit("sendMessage", {
        senderId: _id
        // reciverId: 
      });
      setMessageList((rest_list) => [...rest_list, messageData]);
      reset();
    }
  };

  return (
    <>
      <div className="row-start-1 row-span-5 overflow-y-scroll scrollbar-hide scroll-smooth scroll">
        <div className="flex tablet:hidden">
                 
          <Drawer />

          <h1 className="w-full text-center font-semibold text-3xl italic mt-2">
            <span className="text-brand">Chat</span>App
          </h1>
        </div>
        <div className="w-full h-full " id="text-area">
          <ul>
            {messageList.map((messageContent, index) => (
              <div className={username === messageContent.author ?  "chat chat-end my-3 " : "chat chat-start my-3"} key={index}>
                <div className="chat-image avatar">
                  {/* <div className="w-10 rounded-full">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div> */}
                </div>
                <div className="chat-header">
                  {messageContent.author}
                  <time className="text-xs opacity-50 mx-2">{messageContent.time}</time>
                </div>
                <div className={username === messageContent.author ? "chat-bubble bg-brand text-light font-medium" : "chat-bubble bg-darkblue text-light font-medium"}>
                  {messageContent.message}
                </div>
                {/* <div className="chat-footer opacity-50">
                      Seen
                    </div> */}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(sendMessage)}
        className="flex justify-center self-center w-full row-start-6"
      >
        <input
          {...register("message")}
          type="text"
          placeholder="Type here"
          className="input input-bordered input-md rounded-none w-full max-w-lg mx-2"
          onKeyDown={(event) => {event.key === "Enter" && handleSubmit(sendMessage)}}
        />
        <button type="submit" className="w-9 text-mid">
          {" "}
          <TbSend className="w-full h-full" />
        </button>
      </form>
    </>
      );
};

export default Chat;
