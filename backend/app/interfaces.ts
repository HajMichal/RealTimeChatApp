interface userInterface {
  name: string;
  email: string;
  password: string;
}

interface sendMsg {
  receiverId: number;
  messageData: object;
}

interface users {
  userId: number;
  socketId: string;
}

declare global {
  namespace Express {
    interface Request {
      user: userInterface;
    }
  }
}

export { userInterface, sendMsg, users };
