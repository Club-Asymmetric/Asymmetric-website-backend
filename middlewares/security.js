// middleware/security.js
import helmet from "helmet";
import cors from "cors";

const securityMiddleware = () => {
  const allowedOrigins = (
    process.env.CORS_ORIGIN ??
    "http://localhost:3000,http://localhost:3001,https://asymmetric-website-frontend.vercel.app"
  )
    .split(",")
    .map((o) => o.trim().replace(/\/$/, ""))
    .filter(Boolean);

  return [
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const cleanOrigin = origin.replace(/\/$/, "");
        if (allowedOrigins.includes(cleanOrigin) || allowedOrigins.includes("*")) {
          return callback(null, true);
        }
        return callback(null, false);
      },
      credentials: true,
    }),
    (req, res, next) => {
      res.header("Cross-Origin-Resource-Policy", "cross-origin");
      next();
    },
  ];
};

export { securityMiddleware };
