import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import io from "socket.io-client";

import getCurrentUserData from "./api/getUserApi";

import Chat from "./components/Chat";
import Alert from "./components/Alert";
import LookForFriends from "./components/LookForFriends";
function App() {


  const navigate = useNavigate();

  const { data, isError } = useQuery("user", getCurrentUserData, {
    retry: 2,
    retryDelay: 700,
  });

  return (
    <div className="flex w-full h-screen justify-center pb-14 pt-5 bg-dark">
      {isError ? <Alert /> : null}

      <div
        className={
          isError
            ? "w-full laptop:w-3/4 h-full justify-center desktop:max-w-5xl laptop:shadow-5xl shadow-dark bg-light blur-sm "
            : "bg-light w-full laptop:w-3/4 h-full justify-center desktop:max-w-5xl laptop:shadow-5xl shadow-brand"
        }
      >
        <div className="grid grid-rows-8 grid-flow-row grid-cols-3 h-full bg-dark">
          <div className="columns-1 col-start-1 bg-dark row-span-5 border-2 border-r border-brand rounded-xl hidden tablet:block">
            <h1 className="w-full text-center mt-2 font-semibold text-4xl italic">
              <span className="text-brand">Chat</span>App
            </h1>
            <h2 className="w-full mt-5 text-center text-2xl">
              Hey {data?.data.name}
            </h2>
            <div className="w-full mt-5">

                <LookForFriends />

              <div id="listOfFriends"></div>
            </div>
          </div>

          <div className="bg-dark row-start-1 row-span-5 p-5 tablet:col-start-2 col-span-3 tablet:col-span-2 grid grid-rows-6  border-2 border-l  border-brand rounded-xl">
   
            <Chat username={data?.data.name} />
          </div>
        </div>
      </div>
      {/* <div>
    <button className="w-full"><Link to={"/register"} >Register</Link></button>
    <button className="w-full"><Link to={"/login"}>Login</Link></button>
  </div> */}
    </div>
  );
}

export default App;
