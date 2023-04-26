import { FriendExistsError, NotExistsError, TryingToAddYouselfError } from "../errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addFriendToQueue(userId: number, friendId: number) {
    const getUser = await prisma.user.findUnique({
        where: { id: userId },
        include: { friendQueue: true },
      });
    if(!getUser) return;
    
    const existingFriend = getUser?.friendQueue.find((friend) =>
    friend.friendId === friendId ? friend : null
  );

  if (!!existingFriend)
    throw new FriendExistsError("This user is already in your friend's list");
  if (getUser.id === friendId)
    throw new TryingToAddYouselfError(
      "You can not add yourself to your friend's list"
    );

    const friendInQueue = await prisma.friendRequestQueue.create({
        data: {
            friendId: friendId,
            userId: userId
        }
    })
    return friendInQueue
}

async function getQueue(userId: number) {
    const friendRequests = await prisma.friendRequestQueue.findMany({
        where: { userId: userId}
    })
    const friendInvitations = await prisma.friendRequestQueue.findMany({
        where: {friendId: userId}
    })
    return {friendInvitations, friendRequests}
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

export {addFriendToQueue, getQueue, removeFriendFromQueue}