import {
  FriendExistsError,
  NotExistsError,
  TryingToAddYouselfError,
} from "../errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addFriendToQueue(userId: number,friendId: number,friendName: string) {
  const getUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, friendQueue: { select: { friendId: true } }, friends: { select: { friendsId: true } } },
  });

  if (!getUser) return;
  if (getUser.friends.length > 10) throw new Error("Too many friends");

  const existingFriend = getUser?.friendQueue.find(
    (friend) => friend.friendId === friendId);
  const existingFriendInFriendList = getUser?.friends.find(
    (friend) => friend.friendsId === friendId);

  if (!!existingFriend || !!existingFriendInFriendList)
    throw new FriendExistsError("This user is already in your friend's list");
  if (getUser.id === friendId)
    throw new TryingToAddYouselfError(
      "You can not add yourself to your friend's list"
    );

  const friendInQueue = await prisma.friendRequestQueue.create({
    data: {
      friendId: friendId,
      userId: userId,
      friendName: friendName,
      userName: getUser.name,
    },
  });
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
  const friend = await prisma.friendRequestQueue.findUnique({
    where: { id: id },
    select: { userId: true },
  });

  if (!friend) throw new NotExistsError("Friend invitation not found");
  const removedFriend = await prisma.friendRequestQueue.delete({
    where: { id: id },
  });
  return removedFriend;
}

export { addFriendToQueue, getQueue, removeFriendFromQueue };
