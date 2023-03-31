interface userInterface {
    name: string,
    email: string,
    password: string
}

interface sendMsg {
  senderId: number
  reciverId: number
  data: object
}

interface users {
  userId: number
  socketId: number
}



declare global {
    namespace Express {
      interface Request {
        user: userInterface;
      }
    }
  }

export {
    userInterface,
    sendMsg,
    users
 }