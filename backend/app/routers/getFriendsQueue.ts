import { Router } from "express";
import { getQueue } from "../crud/friendsQueue";
import { jwtVerify } from "../jwt/jwt";
import { JsonWebTokenError } from "jsonwebtoken";

const router = Router();

router.get("/getFriendsQueue", async (req, res) => {
    const currentAccessToken = req.cookies.accessToken;
    try {
        const userId = jwtVerify(currentAccessToken).id
        const queue = await getQueue(Number(userId))
        res.json({queue: queue}).status(200)
    } catch (error) {
        if(error instanceof JsonWebTokenError){
            res.status(404).send({"message": "UserId not found"})
        } else{
            res.sendStatus(500)
        }
    }
});

export default router;
