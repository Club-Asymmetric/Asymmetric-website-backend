import express from "express";
import { RecordId } from "surrealdb";
import database from "../database.js";
import { NotFoundError } from "../errors/ApiError.js";

const router = express.Router();
router.get("/:id", async (req, res) => {
  let { binary, mime } =
    (await (await database()).select(new RecordId("photo", req.params.id))) ??
    {};
  if (!binary || !mime) throw new NotFoundError();
  console.log(binary, mime);
  res.header("Content-Type", `image/${mime}`);
  return res.send(Buffer.from(binary));
});
export default router;
