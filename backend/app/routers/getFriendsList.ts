import { Router } from "express";
import { getFriends } from "../crud/friends";
import { jwtVerify } from "../jwt/jwt";

const jwt = require("jsonwebtoken");

const router = Router();

router.get("/friendList", async (req, res) => {
  const currentAccessToken = req.cookies.accessToken;
  if (!currentAccessToken) return res.status(401).end();

  try {
    var payload = jwtVerify(currentAccessToken)
    const currentUserId = payload.id;
    const friendList = await getFriends(currentUserId);
    res.json({ friendList: friendList });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.sendStatus(401).end();
    }
    return res.sendStatus(400).end();
  }
});

export default router;
