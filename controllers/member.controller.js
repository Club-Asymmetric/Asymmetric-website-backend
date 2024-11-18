import { ClientError } from "../errors/ApiError.js";
import { getMember, getAllMembers } from "../models/member.js";

export const getMemberById = async (req, res, next) => {
  try {
    res.json(await getMember(req.params.id));
  } catch (error) {
    next(error);
  }
};

export const getMembers = async (req, res, next) => {
  console.log("im here");
  try {
    res.json(await getAllMembers());
  } catch (error) {
    next(error);
  }
};
