import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { msgInput, chatTypes, messageData } from "../interfaces";
import io from "socket.io-client";

import { TbSend } from "react-icons/tb";

import Drawer from "./Drawer";

const Chat = ({ username }: chatTypes) => {
  const [messageList, setMessageList] = useState<messageData[]>([]);
  const [isDrawerOpen, setIsDrawer] = useState(false)
    ///@ts-ignore
  // const socket: Socket = io.connect("http://localhost:3000");
  const socket = useRef(io("http://localhost:3000"))

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<msgInput>();

  
  const sendMessage: SubmitHandler<msgInput> = async (data) => {
    if (data.message !== "") {

      const messageData = {
        message: data.message,
        author: username,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes()
      };

      await socket.current.emit("send_message", messageData);
      setMessageList((rest_list) => [...rest_list, messageData]);
      reset();
    }
  };

  useEffect(() => {
    socket.current.on("reveice_message", (data: messageData) => {
      console.log(data);
      setMessageList((rest_list) => [...rest_list, data]);

    });
  }, [socket]);

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
