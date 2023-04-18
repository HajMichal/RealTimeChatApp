import { Router } from "express";
import { removeFriend } from "../crud/friends";


const router = Router();

router.delete("/removeFriend/:id", async (req, res) => {
  try {
    const removedFriend = await removeFriend(req.params.id);
    res.send(removedFriend).status(200);
  } catch (error) {
    res.send(error);
  }
});

export default router;
