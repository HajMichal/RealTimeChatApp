import { PrismaClient } from "@prisma/client"


const prisma  = new PrismaClient();

async function saveMessage(message:string, time: string, receiverId: number, authorId: number) {
    return await prisma.chats.create({
        data: {
            message: message,
            time: time,
            reciverId: receiverId,
            author: {  connect: { id: authorId } }
        }
    })
}

async function loadMessage(currentUserId: number, receiverId: number) {
    return await prisma.chats.findMany({
        where: {
            OR: [
                {
                    reciverId: receiverId,
                    userId: currentUserId
                },
                {
                    reciverId: currentUserId,
                    userId: receiverId
                }
            ]
        },
        orderBy: {
            time: "asc"
        }
    })
}

export {
     saveMessage,
     loadMessage
}