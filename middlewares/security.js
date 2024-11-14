// middleware/security.js
import helmet from "helmet";
import cors from "cors";

const securityMiddleware = () => {
  return [
    // Helmet Middleware for Security Headers
    helmet({
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
      ieNoOpen: true,
      noSniff: true,
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
    }),

    // CORS Configuration for security against Cross-Origin Requests
    cors({
      origin: "https://your-domain.com", // Replace with your domain
      methods: ["GET", "POST"], // Allowed HTTP methods
      allowedHeaders: ["Content-Type"], // Allowed headers
    }),
  ];
};

export { securityMiddleware };
