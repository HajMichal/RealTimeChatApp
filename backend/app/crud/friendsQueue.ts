import { FriendExistsError, NotExistsError, TryingToAddYouselfError } from "../errors";
import { getUserById } from "./user";
import prisma from "./prisma";

async function createAddFriendToQueue(
  friendId: number,
  userId: number,
  friendName: string,
  userName: string
) {
  return await prisma.friendRequestQueue.create({
    data: {
      friendId,
      userId,
      friendName,
      userName,
    },
  });
}

async function addFriendToQueue(userId: number, friendId: number, friendName: string) {
  const getUser = await getUserById(userId);

  if (!getUser) return;
  if (getUser.friends.length > 10) throw new Error("Too many friends");
  if (getUser.id === friendId)
    throw new TryingToAddYouselfError("You can not add yourself to your friend's list");

  const existingFriendInQueue = getUser?.friendQueue.find(
    (friend: any) => friend.friendId === friendId
  );
  const existingFriendInFriendList = getUser?.friends.find(
    (friend: any) => friend.friendsId === friendId
  );

  if (!!existingFriendInQueue || !!existingFriendInFriendList)
    throw new FriendExistsError("This user is already in your friend's list");

  const friendInQueue = await createAddFriendToQueue(friendId, userId, friendName, getUser.name);

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
      userId: true,
    },
  });
  return { friendInvitations, friendRequests };
}

async function removeFriendFromQueue(id: number) {
  if (typeof id !== "number") throw new NotExistsError("Friend invitation not found");
  const removedFriend = await prisma.friendRequestQueue.delete({
    where: { id: id },
  });
  return removedFriend;
}

export { addFriendToQueue, getQueue, removeFriendFromQueue };
