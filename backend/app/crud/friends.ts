import { FriendExistsError, TryingToAddYouselfError } from "../errors";
import { PrismaClient } from "@prisma/client"


const prisma  = new PrismaClient();

async function addFriend(friendsId: number, friendsName: string, mainUserId: number){
    
    const getUser = await prisma.user.findUnique({
        where: { id: mainUserId },
        include: {friends: true}
      })
    
    if(!getUser) return

    const existingFriend = getUser?.friends.find((friend)=>  friend.friendsId === friendsId ? friend : null )
    const thisUser = getUser.id === friendsId ? true : false    
    if(!!existingFriend) throw new FriendExistsError("This user is already in your friend's list")
    if(thisUser) throw new TryingToAddYouselfError("You can not add yourself to your friend's list")

    const createUser = await prisma.friend.create({
      data: {
        friendsId: friendsId,
        friendsName: friendsName,
        user: { connect: { id: mainUserId }}
      }
    })
    return createUser
}


async function getFriends(userId: number ){
  
  const getUser = await prisma.user.findUnique({
    where: { id: userId },
    include: {friends: true}
  })
  return getUser?.friends
}

export {
    addFriend,
    getFriends
}