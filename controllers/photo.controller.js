import { RecordId } from "surrealdb";
import database from "../database.js";
import { ClientError } from "../errors/ApiError.js";
import { getPhoto } from "../models/photo.js";

export const getPhotoById = async (req, res) => {
  let { binary, mime } = (await getPhoto(req.params.id)) ?? {};
  if (!binary || !mime) throw ClientError.notFound();
  res.header("Content-Type", `image/${mime}`);
  res.send(Buffer.from(binary));
};
