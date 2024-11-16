import { ClientError } from "../errors/ApiError.js";
import { getPhoto } from "../models/photo.js";

export const getPhotoById = async (req, res, next) => {
  try {
    let { binary, mime } = (await getPhoto(req.params.id)) ?? {};
    res.header("Content-Type", `image/${mime}`);
    res.send(Buffer.from(binary));
  } catch (error) {
    next(error);
  }
};
