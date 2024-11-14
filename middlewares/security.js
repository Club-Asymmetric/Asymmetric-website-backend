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

export { securityMiddleware };
