import { submitMemberApplication } from "../models/memberApplication.js";

export const applyForMembership = async (req, res, next) => {
  try {
    const result = await submitMemberApplication(req.body);
    res.status(201).json({ message: "Application submitted successfully", ...result });
  } catch (error) {
    next(error);
  }
};
