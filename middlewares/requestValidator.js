// middleware/requestValidator.js
import { body, validationResult } from "express-validator";

// Example validation middleware for a POST route
const validateRequest = [
  body("name").isString().notEmpty().withMessage("Name is required."),
  body("email").isEmail().withMessage("Invalid email address."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateRequest };
