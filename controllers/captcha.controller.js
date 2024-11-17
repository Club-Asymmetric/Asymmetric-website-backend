import jwt from "jsonwebtoken";
import { ClientError } from "../errors/ApiError.js";
import crypto from "crypto";

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

export const verifyCaptcha = (req, res, next) => {
  const { result } = req.body;
  const token = req.cookies.captchaToken;
  if (!token) {
    return next(ClientError.gone());
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const now = Date.now();
    if (now - decoded.issuedAt < 20000) {
      throw ClientError.requestTimeout("Please Wait");
    }
    if (
      decoded.hash === crypto.createHash("sha256").update(result).digest("hex")
    ) {
      return res.json({ success: true });
    } else {
      throw ClientError.unauthorized("Invalid Captcha");
    }
  } catch (err) {
    next(err);
  }
};

export const getCaptcha = (req, res) => {
  const captcha = generateCaptcha();
  const issuedAt = Date.now();
  const result = captcha.split("").reverse().join("");
  const hash = crypto.createHash("sha256").update(result).digest("hex");
  const token = jwt.sign({ hash, issuedAt }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
  res.cookie("captchaToken", token, { httpOnly: true, secure: false });
  res.json({ captcha });
};
