// middleware/rateLimiter.js
import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  headers: true,
});

const rateLimiterMain = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // Limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  headers: true,
});

export { rateLimiter, rateLimiterMain };
