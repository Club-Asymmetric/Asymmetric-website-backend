import winston from "winston";

const logger = winston.createLogger({
  defaultMeta: { service: "user-service" },
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.cli(),
    winston.format.metadata()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/activity.log",
      level: "info",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});

// Logging Middleware
const logging = (req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`, {
    headers: req.headers,
    body: req.body,
  });

  res.on("finish", () => {
    logger.info(`Outgoing Response: ${res.statusCode}`, {
      headers: res.getHeaders(),
    });
  });

  next();
};

export { logger, logging };
