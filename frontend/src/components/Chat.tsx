import React, {useEffect, useState} from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { TbSend } from 'react-icons/tb'


type MsgInput = {
    message: string,
  };

const Chat = ({socket}: any) => {

    const [messageList, setMessageList] = useState<string[]>([])

    const { register, handleSubmit, reset, formState: { errors } } = useForm<MsgInput>();
    const sendMessage: SubmitHandler<MsgInput> = async (data) => {
      console.log(data.message)
      if (data.message !== "") {
        await socket.emit("send_message", data.message)
        setMessageList((rest_list) => [...rest_list, data.message])
        reset()
      }
    };
    
    useEffect(() => {
        socket.on("reveice_message", (data: string) => {
            setMessageList((rest_list) => [...rest_list, data])
        })
    }, [ socket ])

  return (
    <>
        <div className="row-start-1 row-span-5 overflow-y-scroll scrollbar-hide scroll-smooth scroll">
          <div className="w-full h-full " id="text-area">
            <ul>
                {messageList.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
          </div>
        </div>
        <form onSubmit={handleSubmit(sendMessage)} className="flex justify-center self-center w-full row-start-6">
          <input {...register("message")} type="text" placeholder="Type here" className="input input-bordered input-md rounded-none w-full max-w-lg mx-2" />
          <button type="submit" className="w-9 text-dark"> <TbSend className="w-full h-full"/></button>
        </form>
    </>
  )
}

export default Chat