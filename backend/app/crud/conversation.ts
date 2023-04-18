import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function saveMessage(
  message: string,
  time: string,
  receiverId: string,
  userId: string
) {
  return await prisma.chats.create({
    data: {
      message: message,
      time: time,
      reciverId: receiverId,
      author: { connect: { id: userId } },
    },
  });
}

async function loadMessage(currentUserId: string, receiverId: string) {
  return await prisma.chats.findMany({
    where: {
      OR: [
        {
          reciverId: receiverId,
          userId: currentUserId,
        },
        {
          reciverId: currentUserId,
          userId: receiverId,
        },
      ],
    },
    orderBy: {
      time: "asc",
    },
  });
}

export { saveMessage, loadMessage };
