import { Router } from 'express'
import { loadMessage } from '../crud/conversation'
const jwt = require("jsonwebtoken");

const router = Router()


router.get("/loadMessage", async (req, res) => {
    const currentAccessToken = req.cookies.accessToken 
    const { receiverId } = req.query

    if(!currentAccessToken) return res.status(401).end()

    try {
        var payload = jwt.verify(currentAccessToken, process.env.ACCESS_TOKEN_SECRET)
        const currentUserId = payload.id
        const messages = await loadMessage(currentUserId, Number(receiverId))
        res.send(messages).status(200)
    } catch (error) {
        res.send(error).status(500)
    }
})

export default router