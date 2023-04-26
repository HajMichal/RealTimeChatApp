import { Router } from "express";
import { getQueue } from "../crud/friendsQueue";


const router = Router();

router.get("/getFriendsQueue/:userId", async (req, res) => {
    const { userId } = req.params
    try {
        const queue = await getQueue(Number(userId))
        res.json({queue: queue})
    } catch (error) {
        res.json({err: error})
    }
});

export default router;
