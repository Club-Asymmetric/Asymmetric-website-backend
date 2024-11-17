import { body, checkSchema, validationResult } from "express-validator";

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
