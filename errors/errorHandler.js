import { logger } from "../middlewares/logger.js"; // Logger middleware

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // Determine the status code and error message
  const statusCode = err.status || 500; // Default to 500 if no status provided
  const message = err.message || "An unexpected error occurred"; // Default message

  // Log error details
  logger.error({
    statusCode: statusCode,
    message: message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Customize the error response based on the error type
  const errorResponse = {
    error: err.name || "Internal Server Error",
    message: message,
  };

  // Include stack trace in the response if in development mode (optional)
  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = err.stack;
  }

  // Send JSON response to the client
  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
