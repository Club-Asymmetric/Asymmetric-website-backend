import { submitRegistration } from "../models/registration.js";

export const registerForEvent = async (req, res, next) => {
  try {
    const hash = await submitRegistration(req.body);
    res.status(201).json({ message: "Registration successful", hash });
  } catch (error) {
    next(error);
  }
};
