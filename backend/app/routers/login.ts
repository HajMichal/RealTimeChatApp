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
    if (email == "" || password == "") {
      res.status(406).json({ message: "Please fill empty fileds" });
    } else if (err) {
      res.status(401).json({ message: "Invalid Crednetials" });
    } else {
      res.status(404).json({ message: "Not known error" });
    }
  }
});

export default router;
