import { submitContactForm } from "../models/contact.js";

export const submitContact = async (req, res, next) => {
  try {
    await submitContactForm(req.body);
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    next(error);
  }
};
