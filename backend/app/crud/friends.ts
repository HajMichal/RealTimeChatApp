import { FriendExistsError, NotExistsError, TryingToAddYouselfError } from "../errors";
import { PrismaClient } from "@prisma/client";

import { getTimeDiffInMs } from '../testingFile';

import { getUserById } from "./user";

const prisma = new PrismaClient();

async function createFriend(friendsId: number, friendsName: string, userId: number){
  return await prisma.friend.create({
    data: {
      friendsId,
      friendsName,
      user: { connect: { id: userId } },
    },
  });
}

async function addFriend(friendId: number, friendsName: string, userId: number, time: any) {
  // do wywalenia
  console.log(getTimeDiffInMs(time, Date.now()), "test2 initialInFunc addFriendCrud")

  const getUser = await getUserById(userId)

  // do wywalenia
  console.log(getTimeDiffInMs(time, Date.now()), "test3 afterFindUnique addFriendCrud")

  if (!getUser) return;
  if(getUser.friends.length > 10) throw new Error("Too much friends")
  if (getUser.id === friendId) throw new TryingToAddYouselfError("You can not add yourself to your friend's list");

  // do wywalenia
  console.log(getTimeDiffInMs(time, Date.now()), "test4 afterFirstChecks addFriendCrud")

  const existingFriendInFriendList = getUser?.friends.find(
    (friend) => friend.friendsId === friendId);
  
  if (!!existingFriendInFriendList)
    throw new FriendExistsError("This user is already in your friend's list");

    // do wywalenia
    console.log(getTimeDiffInMs(time, Date.now()), "test5 afterSecondChecks addFriendCrud")

    const createdFriend = await createFriend(friendId, friendsName, userId)

  // do wywalenia
  console.log(getTimeDiffInMs(time, Date.now()), "test6 afterCreate addFriendCrud")
  return createdFriend;
}

async function getFriends(userId: number) {
  const getUser = await prisma.user.findUnique({
    where: { id: userId },
    include: { friends: true },
  });
  return getUser?.friends;
}

async function removeFriend(id: number) {
  // const friend = await prisma.friend.findUnique({
  //   where: { id: id },
  //   select: { userId: true },
  // });
  // if (!friend) throw new NotExistsError("Friend not found");
  if( typeof id !== 'number') throw new NotExistsError("Friend not found");
  const removedFriend = await prisma.friend.delete({
    where: { id: id },
  });
  return removedFriend;
}

async function setNotification(receiverId: number, userId: number) {
  const notification = await prisma.friend.updateMany({
    where: {
      friendsId: userId, 
      userId: receiverId,
    },
    data: { isSentMessage: true },
  });
  return notification;
}

async function resetNotification(receiverId: number, userId: number){
  const resetNotification = await prisma.friend.updateMany({
    where: {
      friendsId: receiverId,
      userId: userId,
    },
    data: { isSentMessage: false }
  });
  return resetNotification;
}



export { addFriend, getFriends, removeFriend, setNotification, resetNotification };
