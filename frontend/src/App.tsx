import React, {useState, useEffect} from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

import Chat from "./components/Chat"


function App() {
  
  ///@ts-ignore
  const socket = io.connect("http://localhost:3000")


  const [message, setMessage] = useState<string>("");






  return (
<div className="flex w-full h-screen justify-center pb-14 pt-5">

  <div className="bg-light w-full laptop:w-3/4 h-full justify-center desktop:max-w-5xl laptop:shadow-2xl">
    <div className="grid grid-rows-8 grid-flow-row grid-cols-3 h-full">
      <h1 className="text-5xl font-bold text-center row-start-1 row-end-2 col-span-3 self-center text-mid"><span className="text-brand">Chat</span>Bot</h1>

      <div className="columns-1 col-start-1 bg-dark row-span-5 border-r-4 border-t-4 border-brand">test</div>

      <div className="bg-light row-start-2 row-span-5 p-5 col-start-2 col-span-2 grid grid-rows-6  border-t-4 border-brand">
        <Chat socket={socket} />
      </div>
    </div>
  </div>
  {/* <div>
    <button className="w-full"><Link to={"/register"} >Register</Link></button>
    <button className="w-full"><Link to={"/login"}>Login</Link></button>
  </div> */}
</div>
)
}

export default App
