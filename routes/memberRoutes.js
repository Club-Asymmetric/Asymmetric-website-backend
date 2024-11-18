import express from "express";
// import { getMemberById } from "../controllers/member.controller.js";
const router = express.Router();

// Mock data for demonstration purposes
const members = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    details: "Member of the board",
  },
  { id: 2, name: "Jane Doe", email: "jane@example.com", details: "Treasurer" },
];

// Get all members
router.get("/members", (req, res) => {
  res.json(members);
});

// Get member details by ID
router.get("/members/:id", async (req, res, next) => {
  const memberId = parseInt(req.params.id);
  if (isNaN(memberId)) {
    return res.status(400).send("Invalid member ID");
  }
  try {
    const member = await getMemberById(memberId);
    if (!member) {
      return res.status(404).send("Member not found");
    }
    res.json(member);
  } catch (error) {
    next(error);
  }
});

export default router;
