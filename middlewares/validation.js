import { body, validationResult } from "express-validator";

export const validateForm = [
  body("name").notEmpty().withMessage("Name is required"),
  body("year").notEmpty().withMessage("Current year is required"),
  body("department").notEmpty().withMessage("Department is required"),
  body("college").notEmpty().withMessage("College name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("number")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  body("event").notEmpty().withMessage("Event is required"),

  // Additional optional fields
  body("team").optional(),
  body("members").optional(),

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
