import express from "express";
import validation from "../middlewares/validation.js";
const router = express.Router();

router.post("/", (req, res) => {
  /* Implement logic */
});

router.post("/", validation, async (req, res) => {
  const {
    name,
    currentYear,
    department,
    collegeName,
    email,
    phoneNumber,
    event,
    teamName,
    memberName,
  } = req.body;

  try {
    const registration = new Registration({
      name,
      currentYear,
      department,
      collegeName,
      email,
      phoneNumber,
      event,
      teamName,
      memberName,
    });
    await registration.save();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error saving registration", error });
  }

  res.status(201).json({
    message: "Registration successful",
    data: {
      name,
      currentYear,
      department,
      collegeName,
      email,
      phoneNumber,
      event,
      teamName,
      memberName,
    },
  });
});

export default router;
