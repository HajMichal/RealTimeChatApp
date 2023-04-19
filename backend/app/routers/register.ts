import { Request, Router } from "express";
import { PrismaClient } from "@prisma/client";

import { createAccessToken } from "../jwt/jwt";
import { get_user_by_email } from "../crud/user";

const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const router = Router();

router.post("/register", async (req: Request, res) => {
  const { name, email, password } = req.body;
  
  try {
    if(await get_user_by_email(email)) throw new Error("Already exists")
    if (name.length < 3) throw new Error("Short name")

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
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
