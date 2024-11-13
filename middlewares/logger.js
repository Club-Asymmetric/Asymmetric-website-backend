import winston from "winston";

const logger = winston.createLogger({
  defaultMeta: { service: "user-service" },
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

const logging = (req, res, next) => {
  logger.error(`${req.method} ${req.url}`);
  next();
};

export { logger, logging };
