import helmet from "helmet";

// Helmet Middleware for Security Headers
const securityMiddleware = () => {
  return helmet({
    contentSecurityPolicy: false, // Example: Disable CSP for simplicity, configure as needed
    frameguard: { action: "deny" },
    xssFilter: true,
    noSniff: true,
    ieNoOpen: true,
    hidePoweredBy: { setTo: "PHP 4.2.0" }, // Example: Obfuscate technology stack
  });
};

// Logging Middleware
const loggingMiddleware = (req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);

  res.on("finish", () => {
    console.log(`Outgoing Response: ${res.statusCode}`);
  });

  next();
};

export { securityMiddleware, loggingMiddleware };
