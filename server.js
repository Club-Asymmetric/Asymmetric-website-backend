import express from "express";
import eventRoutes from "./routes/event.routes.js";
import photoRoutes from "./routes/photo.routes.js";
import podcastRoutes from "./routes/podcast.routes.js";
import memberRoutes from "./routes/member.routes.js";
import { getCaptcha } from "./controllers/captcha.controller.js";
import { logging } from "./middlewares/logger.js";
import errorHandler from "./errors/errorHandler.js";
import { ClientError, ServerError } from "./errors/ApiError.js";
import { fileURLToPath } from "url";
import path from "path";
import { securityMiddleware } from "./middlewares/security.js";

import dotenv from "dotenv";
dotenv.config();

console.log("Created by Vishal and Samuel Jabez");

let app = express();

app.use(logging);
app.use(securityMiddleware());
app.use("/static", express.static("static"));
app.use("/api/events", eventRoutes);
app.use("/api/podcasts", podcastRoutes);
app.use("/api/members", memberRoutes);

app.get("/api/credits", (req, res) => {
  res.sendFile("credits.json", {
    root: path.dirname(fileURLToPath(import.meta.url)),
  });
});

app.post("/api/captcha", express.json(), getCaptcha);
app.use("/images/are/not/here", photoRoutes);

app.use((req, res) => {
  throw ClientError.notFound();
});

app.use((req, res) => {
  throw ServerError.notImplemented();
});

// Centralized Error Handler
app.use(errorHandler);

const server = app.listen(3000, () => {
  console.log("server start in http://localhost:3000");
});

const cleaner = () => {
  server.close(async () => {
    (await database()).close();
  });
};

process.on("SIGINT", cleaner);
process.on("SIGTERM", cleaner);

process.on("uncaughtException", (error) => {
  console.error(
    "Uncaught Exception:",
    error instanceof Error ? error.message : String(error)
  );
  cleaner();
});

process.on("unhandledRejection", (error) => {
  console.error(
    "Unhandled Rejection:",
    error instanceof Error ? error.message : String(error)
  );
  cleaner();
});
