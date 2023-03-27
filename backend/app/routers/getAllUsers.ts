import { Router } from "express";
import { getAllUsers } from "../crud/user";

const router = Router();

router.get('/allUsers', async (req, res) => {
    const { searchedValue } = req.query

    const usersList = await getAllUsers(searchedValue)
    console.log(usersList)
    res.send(usersList).status(200)
    
})

export default router