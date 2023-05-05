import { Router } from "express";
import { jwtVerify } from "../jwt/jwt";
import { addFriendToQueue } from "../crud/friendsQueue";
import { FriendExistsError, TryingToAddYouselfError } from "../errors";



const router = Router();

router.post("/addToQueue", async (req, res) => {

    const {friendId, friendName} = req.body
    const accessToken = req.cookies.accessToken
    const userId = jwtVerify(accessToken).id
    try {
        const friendInQueue = await addFriendToQueue(userId, friendId, friendName)
        res.json({friendInQueue: friendInQueue}).status(200)
    } catch (error) {
        if (error instanceof FriendExistsError) {
            res.status(409).send({message: error.message})
        } else if (error instanceof TryingToAddYouselfError) {
            res.status(403).send({message: error.message})
        }
         else {
            res.sendStatus(500)
        }
    }
});

export default router;
