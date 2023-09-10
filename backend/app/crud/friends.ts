import { FriendExistsError, NotExistsError, TryingToAddYouselfError } from "../errors";
import { getUserById } from "./user";
import prisma from "./prisma";

async function createFriend(friendsId: number, friendsName: string, userId: number) {
  return await prisma.friend.create({
    data: {
      friendsId,
      friendsName,
      user: { connect: { id: userId } },
    },
  });
}

async function addFriend(friendId: number, friendsName: string, userId: number) {
  const getUser = await getUserById(userId);

  if (!getUser) return;
  if (getUser.friends.length > 10) throw new Error("Too much friends");
  if (getUser.id === friendId)
    throw new TryingToAddYouselfError("You can not add yourself to your friend's list");

  const existingFriendInFriendList = getUser?.friends.find(
    (friend: any) => friend.friendsId === friendId
  );
  if (!!existingFriendInFriendList)
    throw new FriendExistsError("This user is already in your friend's list");

  return await createFriend(friendId, friendsName, userId);
}

async function getFriends(userId: number) {
  const getFriends = await prisma.user.findUnique({
    where: { id: userId },
    select: { friends: true },
  });
  return getFriends.friends;
}

async function removeFriend(id: number) {
  if (typeof id !== "number") throw new NotExistsError("Friend not found");
  return await prisma.friend.delete({
    where: { id: id },
  });
}

async function setNotification(receiverId: number, userId: number) {
  return await prisma.friend.updateMany({
    where: {
      friendsId: userId,
      userId: receiverId,
    },
    data: { isSentMessage: true },
  });
}

async function resetNotification(receiverId: number, userId: number) {
  return await prisma.friend.updateMany({
    where: {
      friendsId: receiverId,
      userId: userId,
    },
    data: { isSentMessage: false },
  });
}

export { addFriend, getFriends, removeFriend, setNotification, resetNotification };
