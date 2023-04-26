import { Router } from "express";
import { loadMessage, formatedMessages } from "../crud/conversation";
import { resetNotification } from "../crud/friends";
import { jwtVerify } from "../jwt/jwt";


const router = Router();

router.get("/loadMessage", async (req, res) => {
  const currentAccessToken = req.cookies.accessToken;
  const { receiverId } = req.query;
  if (typeof receiverId !== 'string') return 
  if (!currentAccessToken) return res.status(401).end();
  try {
    const currentUserId = jwtVerify(currentAccessToken).id
    const messages = await loadMessage(currentUserId, Number(receiverId));
    await resetNotification(Number(receiverId), currentUserId)
    res.send(formatedMessages(messages)).status(200);
  } catch (error) {
      res.send(error).status(500);
  }
});

export default router;
