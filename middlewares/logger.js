// middleware/logger.js
import winston from "winston";
import path from "path";

// Create Winston Logger instance
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join("logs", "activity.log"),
      level: "info",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join("logs", "exceptions.log"),
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join("logs", "rejections.log"),
    }),
  ],
});

// Logging middleware for Express
const logging = (req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`, {
    headers: req.headers,
    body: req.body || {},
  });

  res.on("finish", () => {
    logger.info(`Outgoing Response: ${res.statusCode}`, {
      headers: res.getHeaders(),
    });
  });

  next();
};

export { logger, logging };
