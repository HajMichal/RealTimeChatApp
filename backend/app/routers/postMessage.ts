import { Router } from 'express'
import { saveMessage } from '../crud/conversation'

const router = Router()


router.post("/sendMessage", async (req, res) => {
    const {message, time, authorId, receiverId} = req.body
    try {
        await saveMessage(message, time, receiverId, authorId)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.send(error).status(500)
    }
})

export default router