const rateLimit = require("express-rate-limit");
const fs = require("fs");
const path = require("path");

// Create a rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per 15 minutes
  message: "Too many requests from this IP, please try again later",
  headers: true, // Send custom rate limit headers with the response
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      message: options.message,
      rateLimit: {
        windowMs: options.windowMs,
        max: options.max,
        current: req.rateLimit.current,
        remaining: req.rateLimit.remaining,
        resetTime: new Date(req.rateLimit.resetTime).toISOString(),
      },
    });
  },
  onLimitReached: (req, res, options) => {
    const logMessage = `Rate limit exceeded for IP: ${
      req.ip
    } at ${new Date().toISOString()}\n`;
    fs.appendFile(path.join(__dirname, "rate-limit.log"), logMessage, (err) => {
      if (err) {
        console.error("Failed to log rate limit event:", err);
      }
    });
  },
});

module.exports = limiter;
