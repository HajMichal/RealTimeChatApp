import { Router } from "express";

import { checkLogin } from "../crud/user";
import { createAccessToken } from "../jwt/jwt";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await checkLogin(email, password);
    createAccessToken(user, res);
  } catch (err) {
    if ((err as Error)?.message === "Invalid E-mail") {
      res.status(401).json({ message: "Invalid E-mail" });
    } else if ((err as Error)?.message === "Invalid Password") {
      res.status(401).json({ message: "Invalid Password" });
    } else {
      res.status(500).json({ message: "Not known error" });
    }
  }
});

export default router;
