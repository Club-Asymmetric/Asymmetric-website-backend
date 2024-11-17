import { ClientError } from "../errors/ApiError.js";
import { getPhoto } from "../models/photo.js";
import { getMemberDetail } from "../models/member.js";

// Validate ID
const validateId = (id) => {
  if (!id || isNaN(id)) {
    throw new ClientError("Invalid ID", 400);
  }
};

export const getPhotoById = async (req, res, next) => {
  try {
    validateId(req.params.id);
    const { binary, mime } = (await getPhoto(req.params.id)) ?? {};
    if (!binary || !mime) {
      throw new ClientError("Photo not found", 404);
    }
    res.header("Content-Type", `image/${mime}`);
    res.send(Buffer.from(binary));
  } catch (error) {
    next(error);
  }
};

export const getMemberDetailById = async (req, res, next) => {
  try {
    validateId(req.params.id);
    const memberDetail = await getMemberDetail(req.params.id);
    if (!memberDetail) {
      throw new ClientError("Member not found", 404);
    }
    res.json(memberDetail);
  } catch (error) {
    next(error);
  }
};

export const sendMemberDetailToFrontend = async (req, res, next) => {
  try {
    validateId(req.params.id);
    const memberDetail = await getMemberDetail(req.params.id);
    if (!memberDetail) {
      throw new ClientError("Member not found", 404);
    }
    res.json({
      success: true,
      data: memberDetail,
    });
  } catch (error) {
    next(error);
  }
};
