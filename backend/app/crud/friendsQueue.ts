import {
  FriendExistsError,
  NotExistsError,
  TryingToAddYouselfError,
} from "../errors";
import { PrismaClient } from "@prisma/client";
import { getUserById } from "./user";
import { getTimeDiffInMs } from "../testingFile";
import prisma from "./prisma";

// const prisma = new PrismaClient();

async function createAddFriendToQueue(friendId: number, userId: number, friendName: string, userName: string){
  return await prisma.friendRequestQueue.create({
    data: {
      friendId,
      userId,
      friendName,
      userName
    },
  });
}

async function addFriendToQueue(userId: number,friendId: number,friendName: string, time: any) {
  // do wywalenia
  const startFunc = getTimeDiffInMs(time, Date.now())
  console.log(startFunc, "test0.5 startFunc addfriendtoqueue")

  const getUser = await getUserById(userId)
    // do wywalenia
  console.log(getTimeDiffInMs(time, Date.now()), "test1 afterFindUnique addFriendToQueue")

  if (!getUser) return;
  if (getUser.friends.length > 10) throw new Error("Too many friends");
  if (getUser.id === friendId)throw new TryingToAddYouselfError("You can not add yourself to your friend's list");

  // do wywalenia
  console.log(getTimeDiffInMs(time, Date.now()), "test2 afterFirstChecks addfriendtoqueue")

  const existingFriendInQueue = getUser?.friendQueue.find(
    (friend: any) => friend.friendId === friendId);
  const existingFriendInFriendList = getUser?.friends.find(
    (friend: any) => friend.friendsId === friendId);

    // do wywalenia
  console.log(getTimeDiffInMs(time, Date.now()), "test3 afterSecondChecks addfriendtoqueue")

  if (!!existingFriendInQueue || !!existingFriendInFriendList)
    throw new FriendExistsError("This user is already in your friend's list");

    // do wywalenia
    console.log(getTimeDiffInMs(time, Date.now()), "test4 beforeCreateUser addfriendtoqueue")

    const friendInQueue = await createAddFriendToQueue(friendId, userId, friendName, getUser.name)

    // do wywalenia
    console.log(getTimeDiffInMs(time, Date.now()), "test5 created user in Crud")
  return friendInQueue;
}

async function getQueue(userId: number) {
  if (!userId) throw Error("Need userId");
  const friendRequests = await prisma.friendRequestQueue.findMany({
    where: { userId: userId },
    select: {
      id: true,
      friendId: true,
      friendName: true,
    },
  });
  const friendInvitations = await prisma.friendRequestQueue.findMany({
    where: { friendId: userId },
    select: {
      id: true,
      friendId: true,
      friendName: true,
      userName: true,
      userId: true
    },
  });
  return { friendInvitations, friendRequests };
}

async function removeFriendFromQueue(id: number) {
  // const friend = await prisma.friendRequestQueue.findUnique({
  //   where: { id: id },
  //   select: { userId: true },
  // });
  // if (!friend) throw new NotExistsError("Friend invitation not found");
  
  if( typeof id !== 'number') throw new NotExistsError("Friend invitation not found");
  const removedFriend = await prisma.friendRequestQueue.delete({
    where: { id: id },
  });
  return removedFriend;
}

export { addFriendToQueue, getQueue, removeFriendFromQueue };
