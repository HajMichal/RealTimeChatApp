import { FriendExistsError, NotExistsError, TryingToAddYouselfError } from "../errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addFriend(friendId: number, friendsName: string, userId: number) {
  const getUser = await prisma.user.findUnique({
    where: { id: userId },
    include: { friends: true },
  });

  if (!getUser) return;
  if(getUser.friends.length > 10) throw new Error("Too much friends")

  const existingFriend = await prisma.friend.findFirst({
    where: { userId: userId, friendsId: friendId },
    select: { friendsId: true }
  });
  
  if (!!existingFriend)
    throw new FriendExistsError("This user is already in your friend's list");
  if (getUser.id === friendId)
    throw new TryingToAddYouselfError(
      "You can not add yourself to your friend's list"
    );

  const createFriend = await prisma.friend.create({
    data: {
      friendsId: friendId,
      friendsName: friendsName,
      user: { connect: { id: userId } },
    },
  });

  return createFriend;
}

async function getFriends(userId: number) {
  const getUser = await prisma.user.findUnique({
    where: { id: userId },
    include: { friends: true },
  });
  return getUser?.friends;
}

async function removeFriend(id: number) {
  const friend = await prisma.friend.findUnique({
    where: { id: id },
    select: { userId: true },
  });
  if (!friend) throw new NotExistsError("Friend not found");
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
