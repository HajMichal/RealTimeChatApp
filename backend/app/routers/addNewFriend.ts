import { Router } from 'express'
import { addFriend } from '../crud/friends';
import { FriendExistsError, TryingToAddYouselfError } from '../errors';

const router = Router()

router.post('/addFriend', async (req, res) => {

    const {friendsId, friendsName, userId } = req.body;

    try {
        await addFriend(friendsId, friendsName, userId)
        res.sendStatus(200)
    } catch (error) {
        if (error instanceof FriendExistsError) {
            res.status(409).send({message: "This user already exists in your friend's list"})
        } 
        else if (error instanceof TryingToAddYouselfError) {
            res.status(403).send({message: "You can not add yourself to your friend's list"})
        }
         else {
            res.sendStatus(500)
        }
    }
})

export default router;