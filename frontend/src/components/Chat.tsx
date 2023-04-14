import { useEffect, useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { io, Socket } from "socket.io-client";
import { useForm, SubmitHandler } from "react-hook-form";

import { TbSend } from "react-icons/tb";
import { BsFillChatDotsFill } from "react-icons/bs";

import Drawer from "./Drawer";
import { msgInput, chatTypes, messageData, friend } from "../interfaces";

import { loadMessage } from "../api/getMessages";
import { saveMessage } from "../api/saveMessage";

const Chat = ({ username, _id, receiverId, chatFriend }: chatTypes) => {

  const socket = useRef<Socket>();
  const [messageList, setMessageList] = useState<messageData[]>([]);

  const { register, handleSubmit, reset } = useForm<msgInput>();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["receiverId", receiverId],
    queryFn: () => loadMessage(receiverId),
    enabled: receiverId !== undefined,
  });

  const queryClient = useQueryClient();
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
      // console.log(users)
    });
  }, [username, _id]);

  // Setting messages into message list
  useEffect(() => {
    if (!socket.current) return;
    socket.current.on("reveice_message", (data: messageData) => {
      setMessageList((rest_list) => [...rest_list, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket.current) return;
    socket.current.on("getMessage", ({ messageData, from }: any) => {
      setMessageList((rest_list) => [...rest_list, messageData]);
    });
  }, []);

  useEffect(() => {

    // setMessageList(data?.data)
    console.log(chatFriend)
  }, [messageList, chatFriend])

  const sendMessage: SubmitHandler<msgInput> = async (data) => {
    if (data.message !== "" && socket.current) {
      var myDate =
        new Date(Date.now()).getFullYear() +
        "-" +
        new Date(Date.now()).getMonth() +
        "-" +
        new Date(Date.now()).getDate() +
        " " +
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes();

      const messageData = {
        message: data.message,
        receiverId: receiverId,
        authorId: _id,
        time: myDate,
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
        mutate(messageData);
        // setMessageList([...messageList, messageData]);
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
                  className={
                    receiverId !==  messageContent.receiverId 
                      ? "chat chat-end my-3 "
                      : "chat chat-start my-3"
                  }
                  key={index}
                >
                  <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                  </div>
                  <div className="chat-header">
                    {messageContent.authorId}
                    <time className="text-xs opacity-50 mx-2">
                      {messageContent.time}
                    </time>
                  </div>
                  <div
                    className={
                      receiverId !==  messageContent.receiverId 
                        ? "chat-bubble bg-brand text-light font-medium"
                        : "chat-bubble bg-darkblue text-light font-medium"
                    }
                  >
                    {messageContent.message}
                  </div> 
                  <div className="chat-footer opacity-50">
                      Seen
                    </div>
                </div>
              ))
            )}
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
          onKeyDown={(event) => {
            event.key === "Enter" && handleSubmit(sendMessage);
          }}
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
