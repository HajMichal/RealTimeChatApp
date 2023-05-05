import { Request, Router } from "express";
import { createAccessToken } from "../jwt/jwt";
import { registerUser } from "../crud/user";

const router = Router();

router.post("/register", async (req: Request, res) => {
  const { name, email, password } = req.body;
  if (name.length < 3) throw new Error("Short name")
  try {
    const user = await registerUser(name, email, password)
    createAccessToken(user, res);
  } catch (err) {
      if ((err as Error)?.message === "Already exists") {
        res.status(409).json({ message: "Already exists" });
      } 
      else if ((err as Error)?.message === "Short name"){
        res.status(400).json({ message: "Short name" })
      } 
      else {
        res.sendStatus(500);
      }
    }
});

export default router;
