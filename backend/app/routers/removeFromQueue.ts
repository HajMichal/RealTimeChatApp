import { Router } from "express";
import { removeFriendFromQueue } from "../crud/friendsQueue";
import { NotExistsError } from "../errors";

const router = Router();

router.delete("/removeFromQueue/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const friendInQueue = await removeFriendFromQueue(Number(id));
    res.json({ friendInQueue: friendInQueue }).status(200);
  } catch (error) {
    if (error instanceof NotExistsError) {
      res.status(404).send({ message: error.message });
    } else {
      res.sendStatus(500);
    }
  }
});

export default router;
