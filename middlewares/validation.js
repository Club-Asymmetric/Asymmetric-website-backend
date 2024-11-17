import { body, checkSchema, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ClientError } from "../errors/ApiError.js";

export const validateForm = [
  checkSchema({
    name: {
      trim: true,
      notEmpty: {
        errorMessage: "Name is required",
      },
    },
    year: {
      trim: true,
      toInt: true,
      notEmpty: {
        errorMessage: "Current year is required",
      },
    },
    department: {
      trim: true,
      notEmpty: {
        errorMessage: "Department is required",
      },
    },
    college: {
      trim: true,
      notEmpty: {
        errorMessage: "College name is required",
      },
    },
    email: {
      trim: true,
      notEmpty: {
        errorMessage: "Email is required",
      },
      isEmail: {
        errorMessage: "Invalid email format",
      },
    },
    number: {
      trim: true,
      notEmpty: {
        errorMessage: "Phone number is required",
      },
      isMobilePhone: {
        errorMessage: "Invalid phone number",
      },
    },
  }),
  body("captcha")
    .trim()
    .notEmpty()
    .withMessage("Captcha is required")
    .custom((value, { req }) => {
      const token = req.cookies.token;
      if (!token) {
        throw ClientError.gone();
      }
      const { hash, identifier, issuedAt } = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      const now = Date.now();
      if (now - issuedAt < 20000) {
        throw ClientError.requestTimeout("Please Wait");
      }
      const [number, email] = identifier.split(",");
      if (number != req.body.number || email != req.body.email) {
        throw ClientError.unauthorized("Invalid Captcha");
      }
      if (hash === crypto.createHash("sha256").update(value).digest("hex")) {
        return true;
      } else {
        throw ClientError.unauthorized("Invalid Captcha");
      }
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    next();
  },
];
