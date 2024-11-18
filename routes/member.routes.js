import express from "express";
import { getMemberById, getMembers } from "../controllers/member.controller.js";
const router = express.Router();

router.get("/", getMembers);
router.get("/:id", getMemberById);

export default router;
