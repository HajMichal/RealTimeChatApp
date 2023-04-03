import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  const getUser = await prisma.friend.findMany({})

  
  // const existingFriend = getUser?.friends.find((friend)=>  friend.friendsId === 3 ? friend : null )
  // console.log(!!existingFriend)

  console.log(getUser)

  // if (existingFriend) throw new Error("This Friend already exists in your friend list")


  // const addNewFriend = await prisma.friend.create({
  //   data: {
  //     friendsId: 5,
  //     friendsName: "Klaudiaaaaa",
  //     user: {connect : { id: 1 }}
  //   }
  // })
  // console.log(addNewFriend)


  // const allUseres = await prisma.user.findMany({
  //   include:{
  //     friends: {
  //       include: {
  //         user: true
  //       }
  //     }
  //   }
  // })
  // console.log(allUseres)


  // const allFriends = await prisma.friend.findMany({})
  // console.log(allFriends)



  // const user = await prisma.friend.findUnique({
  //   where: { friendsId: 5}
  // })
  // if (!user) return
  // const users = await prisma.friend.create({
  //   data: {
  //     friendsId: 1,
  //     friendsName: "Michałeczek",
  //     user: { connect: { id: user.id }}
  //   }
  // })
  // console.log(users)


}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })