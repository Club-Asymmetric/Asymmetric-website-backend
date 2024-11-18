import jwt from "jsonwebtoken";
import { ClientError } from "../errors/ApiError.js";
import crypto from "crypto";
import e from "express";

// Function to generate a random case-sensitive and order-sensitive captcha
function generateCaptcha(length = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const getCaptcha = (req, res) => {
  const { email, number } = req.body;
  if (!email || !number) {
    throw ClientError.badRequest("Email and number are required");
  }
  const captcha = generateCaptcha();
  const token = jwt.sign(
    {
      hash: crypto
        .createHash("sha256")
        .update(captcha.split("").reverse().join(""))
        .digest("hex"),
      number,
      email,
      issuedAt: Date.now(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    }
  );

  res.json({ captcha, token });
};
