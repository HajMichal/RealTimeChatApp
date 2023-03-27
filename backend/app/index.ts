import express, { Request, Response} from "express";

import http from 'http';
import { Server } from "socket.io";

import register from './routers/register';
import login from './routers/login';
import getUser from './routers/getUser'
import getAllUsers  from "./routers/getAllUsers";

const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config()


const app = express()

// socket.io
const server = http.createServer(app);

// middleware 
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    credentials: true,
    optionsSuccesStatus: 200,
    origin: ["http://localhost:5173", "http://localhost:5173/"],
    preflightContinue: false,
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    allowHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  })
  )

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5173/"],
    methods: "GET, POST",
  }
});

  

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket:any) => {
  console.log("User connected: " + socket.id);


  socket.on("send_message", (data: any) => {
    socket.broadcast.emit("reveice_message", data);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


app.use("/", register);
app.use("/", login)
app.use("/", getUser)
app.use("/", getAllUsers)


server.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);