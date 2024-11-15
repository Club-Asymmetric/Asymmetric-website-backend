import express from "express";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import podcastRoutes from "./routes/podcastRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import { logging } from "./middlewares/logger.js";
import errorHandler from "./errors/errorHandler.js";
import { ClientError, ServerError } from "./errors/ApiError.js";
import { fileURLToPath } from "url";
import path from "path";
import { securityMiddleware } from "./middlewares/security.js";
import { rateLimiter } from "./middlewares/rateLimiter.js";
import { validateRequest } from "./middlewares/requestValidator.js";
import { renderCredits } from "./credits.js";

import dotenv from "dotenv";
dotenv.config();

console.log("Created by Vishal and Samuel (KK)");

let app = express();

app.use(logging);
// securityMiddleware is a function that returns an array of middleware functions
app.use(securityMiddleware());
app.use(rateLimiter);

app.use("/static", express.static("static"));

app.post("/submit", validateRequest, (req, res) => {
  res.status(200).send("Data received.");
});
app.use("/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/podcasts", podcastRoutes);
app.use("/api/registrations", registrationRoutes);

app.use("/credits", renderCredits);

app.use("/if/you/get/these/images/you/are/gay", photoRoutes);

app.get("/", (req, res) =>
  res.sendFile("index.html", {
    root: path.dirname(fileURLToPath(import.meta.url)),
  })
);

import database from "./database.js";
app.use("/photos", async (req, res) => {
  let output = "";
  for (let record of (
    await (await database()).query("SELECT record::id(id) AS id FROM photo")
  )[0]) {
    output += `<img src="/if/you/get/these/images/you/are/gay/${record.id}">`;
  }
  res.send(output);
});

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
