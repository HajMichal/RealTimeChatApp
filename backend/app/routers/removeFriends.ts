import { Router } from 'express'
import { removeFriend } from '../crud/friends'

// const jwt = require("jsonwebtoken");

const router = Router();

router.delete('/removeFriend/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    try {
        const removedFriend = await removeFriend(id)
        res.send(removedFriend).status(200)
    } catch (error) {
        res.send(error)
    }
})

export default router
