import { Router } from "express";
import { removeFriend } from "../crud/friends";


const router = Router();

router.delete("/setNotificationState", async (req, res) => {
  try {

  } catch (error) {
    res.send(error);
  }
});

export default router;
