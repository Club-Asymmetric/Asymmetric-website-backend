import { ApiError } from "./ApiError.js";
import { logger } from "../middlewares/logger.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || "An unexpected error occurred";

  // Log the error
  logger.error(`[${statusCode}] ${message}`);

  // Respond with JSON error message
  res.status(statusCode).json({
    error: err.name || "Internal Server Error",
    message: message,
  });
};

export default errorHandler;
