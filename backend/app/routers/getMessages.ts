import { Router } from "express";
import { loadMessage, formatedMessages } from "../crud/conversation";
import { resetNotification } from "../crud/friends";
import { jwtVerify } from "../jwt/jwt";


const router = Router();

router.get("/loadMessage", async (req, res) => {
  const currentAccessToken = req.cookies.accessToken;
  const { receiverId } = req.query;

  if (!currentAccessToken) return res.status(401).end();
  try {
    const currentUserId = jwtVerify(currentAccessToken).id
    const messages = await loadMessage(currentUserId, receiverId as string);
    await resetNotification(receiverId as string, currentUserId)
    res.send(formatedMessages(messages)).status(200);
  } catch (error) {
      res.send(error).status(500);
  }
});

export default router;
