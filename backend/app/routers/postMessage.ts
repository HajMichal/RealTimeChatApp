import { Router } from "express";
import { saveMessage } from "../crud/conversation";
import { setNotification } from "../crud/friends";

const router = Router();

router.post("/sendMessage", async (req, res) => {
  const { message, time, userId, receiverId } = req.body;

  try {
    await saveMessage(message, time, receiverId, userId);
    await setNotification(receiverId, userId);
    res.sendStatus(200);
  } catch (error) {
    res.send(error).status(500);
  }
});

export default router;
