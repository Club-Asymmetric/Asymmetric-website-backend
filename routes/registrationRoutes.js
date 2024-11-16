import express from "express";
import { validateForm } from "../middlewares/validation.js";
const router = express.Router();

router.post("/", validateForm, async (req, res) => {
  const {
    name,
    year,
    department,
    college,
    email,
    number,
    event,
    team,
    members,
  } = req.body;

  try {
    const registration = new Registration({
      name,
      year,
      department,
      college,
      mail,
      number,
      event,
      team,
      members,
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
