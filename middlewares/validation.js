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
  body("token").trim().notEmpty().withMessage("Token is required"),
  body("captcha")
    .trim()
    .notEmpty()
    .withMessage("Captcha is required")
    .custom((value, { req }) => {
      const { token } = req.body;
      if (!token) {
        throw ClientError.unauthorized("You don't have Captcha");
      }
      try {
        const { hash, number, email, issuedAt } = jwt.verify(
          token,
          process.env.JWT_SECRET
        );
        const now = Date.now();
        if (now - issuedAt < process.env.CAPTCHA_TIMEOUT * 1000) {
          throw ClientError.requestTimeout(
            `Please Wait ${(now - issuedAt) / 1000}s`
          );
        }
        if (number != req.body.number || email != req.body.email) {
          throw ClientError.unauthorized("Captcha has been Compromised");
        }
        if (hash === crypto.createHash("sha256").update(value).digest("hex")) {
          console.log("im here");
          return true;
        } else {
          throw ClientError.unauthorized("Invalid Captcha");
        }
      } catch (error) {
        console.log(error);
        throw error;
      } // TODO: token expire error
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ClientError.badRequest(errors.array()));
    }
    next();
  },
];
