import express, { Request, Response } from "express";

import http from "http";
import { Server, Socket } from "socket.io";

import register from "./routers/register";
import login from "./routers/login";
import getUser from "./routers/getUser";
import getAllUsers from "./routers/getAllUsers";
import addNewFriend from "./routers/addNewFriend";
import getFriendsList from "./routers/getFriendsList";
import removeFriend from "./routers/removeFriends";
import postMessage from "./routers/postMessage";
import loadMessage from "./routers/getMessages";

import { sendMsg, users } from "./interfaces";

const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

// socket.io
const server = http.createServer(app);

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    optionsSuccesStatus: 200,
    origin: ["http://localhost:5173", "http://localhost:5173/"],
    preflightContinue: false,
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    allowHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5173/"],
    methods: "GET, POST",
  },
});

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

let users: Array<users> = [];

const addUser = (userId: number, socketId: string) => {
  if (userId === null) return;
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUserSocket = (receiverId: number) => {
  return users.find((user) => user.userId === receiverId);
};

io.on("connection", (socket: any) => {
  console.log("User connected: " + socket.id);
  socket.on("addUser", (userId: number) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ receiverId, messageData }: sendMsg) => {
    const user = getUserSocket(receiverId);
    if (!user) return;
    io.to(user.socketId).emit("getMessage", {
      messageData,
      isSentData: true
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    removeUser(socket.id);
  });
});

app.use("/", register);
app.use("/", login);
app.use("/", getUser);
app.use("/", getAllUsers);
app.use("/", addNewFriend);
app.use("/", getFriendsList);
app.use("/", removeFriend);
app.use("/", postMessage);
app.use("/", loadMessage);

server.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
