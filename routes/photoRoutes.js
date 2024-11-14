import express from "express";
import { getPhoto } from "../models/photo.js";
import { ClientError } from "../errors/ApiError.js";

const router = express.Router();
router.get("/:id", async (req, res) => {
  let { binary, mime } = await getPhoto(req.params.id);
  if (!binary || !mime) throw ClientError.notFound();
  res.header("Content-Type", `image/${mime}`);
  return res.send(Buffer.from(binary));
});
export default router;
