import { Router, Request, Response } from "express";
import { jwtVerify } from "../jwt/jwt";
const jwt = require("jsonwebtoken");

const router = Router();

router.get("/user", (req: Request, res: Response) => {
  const currentAccessToken = req.cookies.accessToken;
  if (!currentAccessToken) return res.status(401).end();

  try {
    var payload = jwtVerify(currentAccessToken)
    res.send({id: payload.id, name: payload.name, email: payload.email});
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.sendStatus(401).end();
    }
    return res.sendStatus(400).end();
  }
});

export default router;
