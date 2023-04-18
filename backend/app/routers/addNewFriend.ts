import { Router } from 'express'
import { addFriend } from '../crud/friends';
import { FriendExistsError, TryingToAddYouselfError } from '../errors';

const router = Router()

router.post('/addFriend', async (req, res) => {
    const {friendsId, friendsName, mainUserId } = req.body;
    try {
        const newFriend = await addFriend(friendsId, friendsName, mainUserId)
        res.json({newFriend: newFriend})
    } catch (error) {
        if (error instanceof FriendExistsError) {
            res.status(409).send({message: "This user already exists in your friend's list"})
        } else if (error instanceof TryingToAddYouselfError) {
            res.status(403).send({message: "You can not add yourself to your friend's list"})
        } else {
            res.sendStatus(500)
        }
    }
})

export default router;