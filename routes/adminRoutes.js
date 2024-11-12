import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/registrations", authMiddleware, (req, res) => {
  /* Implement logic */
});
router.get("/events", authMiddleware, (req, res) => {
  /* Implement logic */
});
router.get("/photos", authMiddleware, (req, res) => {
  /* Implement logic */
});

export default router;
