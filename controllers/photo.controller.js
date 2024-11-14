import { RecordId } from "surrealdb";
import database from "../database.js";
import { ClientError } from "../errors/ApiError.js";

export const getPhotoById = async (req, res) => {
  try {
    let { binary, mime } =
      (await (await database()).select(new RecordId("photo", req.params.id))) ??
      {};
    if (!binary || !mime) throw ClientError.notFound();
    console.log(binary, mime);
    res.header("Content-Type", `image/${mime}`);
    res.send(Buffer.from(binary));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
