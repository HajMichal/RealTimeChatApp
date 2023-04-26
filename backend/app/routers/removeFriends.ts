import { Router } from "express";
import { removeFriend } from "../crud/friends";
import { NotExistsError } from "../errors";


const router = Router();

router.delete("/removeFriend/:id", async (req, res) => {
  const { id } = req.params
  try {
    const removedFriend = await removeFriend(Number(id));
    res.send(removedFriend).status(200);
  } catch (error) {
    if (error instanceof NotExistsError) {
      res.status(404).send({message: "Friend not found" })
  } else {
      res.sendStatus(500)
  }
  }
});

export default router;
