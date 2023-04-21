import { FriendExistsError, TryingToAddYouselfError } from "../errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addFriend(
  friendsId: string,
  friendsName: string,
  mainUserId: string
) {
  const getUser = await prisma.user.findUnique({
    where: { id: mainUserId },
    include: { friends: true },
  });

  if (!getUser) return;

  const existingFriend = getUser?.friends.find((friend) =>
    friend.friendsId === friendsId ? friend : null
  );
  const thisUser = getUser.id === friendsId ? true : false;
  if (!!existingFriend)
    throw new FriendExistsError("This user is already in your friend's list");
  if (thisUser)
    throw new TryingToAddYouselfError(
      "You can not add yourself to your friend's list"
    );

  const createUser = await prisma.friend.create({
    data: {
      friendsId: friendsId,
      friendsName: friendsName,
      user: { connect: { id: mainUserId } },
    },
  });
  return createUser;
}

async function getFriends(userId: string) {
  const getUser = await prisma.user.findUnique({
    where: { id: userId },
    include: { friends: true },
  });
  return getUser?.friends;
}

async function removeFriend(id: string) {
  const friend = await prisma.friend.findUnique({
    where: { id: id },
    select: { userId: true },
  });
  if (!friend) throw new Error("Friend not found");
  const removedFriend = await prisma.friend.delete({
    where: { id: id },
  });
  return removedFriend;
}

async function setNotification(receiverId: string, userId: string) {
  const friend = await prisma.friend.findUnique({
    where: { friendsId: receiverId },
  });

  if (friend?.isSentMessage === true) return null;
  const notification = await prisma.friend.updateMany({
    where: { AND:  [
      {friendsId: receiverId}, 
      {userId: userId}
    ] },
    data: { isSentMessage: true },
  });
  return notification;

}

async function resetNotification(receiverId: string, userId: string){
  const friend = await prisma.friend.findUnique({
    where: { friendsId: userId },
  });
  console.log(friend)
}


export { addFriend, getFriends, removeFriend, setNotification, resetNotification };
