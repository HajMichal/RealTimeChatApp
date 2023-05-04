import { Chats, PrismaClient } from "@prisma/client";
import prisma from "./prisma";

// const prisma = new PrismaClient();

async function saveMessage(
  message: string,
  time: string,
  receiverId: number,
  userId: number
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

async function loadMessage(currentUserId: number, receiverId: number) {
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

const formatedMessages = (messages: Chats[]) => {
  const formattedMessages = messages.map((message) => ({
    ...message,
    time: new Date(message.time),
  }));
  const sortedMessages = formattedMessages.sort(
    (a: any, b: any) => a.time - b.time
  );
  return sortedMessages
}

export { saveMessage, loadMessage, formatedMessages };
