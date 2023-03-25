
interface msgInput {
    message: string;
};

interface chatTypes {
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

 export type {
    msgInput,
    chatTypes,
    messageData,
    user,
    newUser
}