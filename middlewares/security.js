// middleware/security.js
import helmet from "helmet";

// Helmet Middleware for Security Headers
const securityMiddleware = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    frameguard: { action: "deny" },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: { policy: "same-origin" },
    ieNoOpen: { action: "noopen" },
    noSniff: true,
    ieNoOpen: true,
    hidePoweredBy: { setTo: "PHP 4.2.0" },
    hsts: {
      maxAge: 31536000, // 1 year in seconds
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: "no-referrer" },
    expectCt: {
      enforce: true,
      maxAge: 86400, // 1 day in seconds
    },
  });
};

export { securityMiddleware };
