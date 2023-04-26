import { Router } from "express";
import { addFriendToQueue } from "../crud/friendsQueue";
import { FriendExistsError, TryingToAddYouselfError } from "../errors";


const router = Router();

router.post("/addToQueue", async (req, res) => {
    const {userId, friendId} = req.body
    try {
        const friendInQueue = await addFriendToQueue(userId, friendId)
        res.json({friendInQueue: friendInQueue}).status(200)
    } catch (error) {
        if (error instanceof FriendExistsError) {
            res.status(409).send({message: error.message})
        } else if (error instanceof TryingToAddYouselfError) {
            res.status(403).send({message: error.message})
        } else {
            res.sendStatus(500)
        }
    }
});

export default router;
