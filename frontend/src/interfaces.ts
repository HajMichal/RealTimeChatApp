interface msgInput {
  message: string;
}

interface chatTypes {
  _id: number;
  username: string;
  receiverId: number | null;
  chatFriend: friend | undefined | null;
  setSocket: any;
}

interface messageData {
  userId: number;
  time: Date;
  message: string;
  receiverId: number | null;
}
interface sendMessage {
  message: string;
  time: Date;
  userId: number;
  receiverId: number | null;
}

interface user {
  email: string;
  password: string;
}

interface newUser {
  name: string;
  email: string;
  password: string;
}
interface searchedUser {
  id: number;
  name: string;
}
interface userId {
  mainUserId: number;
}

interface friend {
  id: number;
  friendsId: number;
  userId: number;
  isSentMessage: boolean;
  friendsName: string;
}

interface friendProps {
  friends: friend[];
}
interface queueData {
  friendInvitations: invitationsRequests[];
  friendRequests: invitationsRequests[];
}
interface QueueProps {
  queue: queueData;
}

interface invitationsRequests {
  id: number;
  date: Date;
  friendId: number;
  userId: number;
  userName: string;
  friendName: string;
}

interface friendViewProps {
  data: friend;
}
interface queueViewProps {
  data: invitationsRequests;
}

export type {
  msgInput,
  chatTypes,
  messageData,
  user,
  newUser,
  searchedUser,
  userId,
  friend,
  friendProps,
  friendViewProps,
  queueViewProps,
  sendMessage,
  QueueProps,
  queueData,
  invitationsRequests,
};
