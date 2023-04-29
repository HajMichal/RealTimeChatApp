import { Response } from "express";

const jwt = require("jsonwebtoken");

interface newUser {
  name: string;
  email: string;
  password: string;
}

function generateAccessToken(user: newUser) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5000s",
  });
}

function createAccessToken(user: newUser, res: Response) {
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10000s",
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json({
    user: user,
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
}

function jwtVerify(currentAccessToken: string){
  var payload = jwt.verify(
    currentAccessToken,
    process.env.ACCESS_TOKEN_SECRET
  );
  return payload
}

export { createAccessToken, generateAccessToken, jwtVerify };
