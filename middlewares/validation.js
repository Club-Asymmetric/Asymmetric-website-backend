import { body, checkSchema, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ClientError } from "../errors/ApiError.js";

export const validateForm = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("year")
    .trim()
    .notEmpty()
    .withMessage("Current year is required")
    .toInt()
    .isInt({ min: 0 })
    .withMessage("Invalid year"),
  body("department").trim().notEmpty().withMessage("Department is required"),
  body("college").trim().notEmpty().withMessage("College name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("number")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  body("team")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Team name is required"),
  body("token")
    .trim()
    .notEmpty()
    .withMessage("Token is required")
    .custom((value) => {
      try {
        jwt.verify(value, process.env.JWT_SECRET);
        return true;
      } catch (error) {
        return false;
      }
    })
    .withMessage("Invalid token")
    .customSanitizer((value) => {
      return jwt.verify(value, process.env.JWT_SECRET);
    })
    .custom((value) => {
      const { email, number } = value;
      if (!email || !number) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Token has been compromised")
    .custom((value) => {
      const now = Date.now();
      if (now - value.issuedAt > process.env.CAPTCHA_TIMEOUT * 1000) {
        return false;
      }
      return true;
    })
    .withMessage(`Please wait...`),
  body("captcha")
    .trim()
    .notEmpty()
    .withMessage("Captcha is required")
    .custom((value, { req }) => {
      if (
        req.body.token.hash ===
        crypto.createHash("sha256").update(value).digest("hex")
      ) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("Invalid Captcha"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res
        .status(400)
        .json({ message: "validation failed", errors: errors.array() }); // TODO: fix it
    }
    next();
  },
];
