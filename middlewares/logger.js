import winston from "winston";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.cli(),
    winston.format.metadata()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log" }),
  ],
});

// Logging Middleware
const logging = (req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`);

  res.on("finish", () => {
    logger.info(`Outgoing Response: ${res.statusCode}`);
  });

  next();
};

export { logger, logging };
