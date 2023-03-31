
interface msgInput {
    message: string;
};

interface chatTypes {
    _id: number
    username: string;
}

interface messageData {
    author: string;
    time: string;
    message: string;
}

interface user {
    email: string,
    password: string
}

interface newUser {
    name: string,
    email: string,
    password: string
}
interface searchedUser {
    id: number,
    name: string
}
interface userId {
    mainUserId: number
  }
interface friend {
    id: number
    friendsId: number
    userId: number
    friendsName: string
}

 export type {
    msgInput,
    chatTypes,
    messageData,
    user,
    newUser,
    searchedUser,
    userId,
    friend
}