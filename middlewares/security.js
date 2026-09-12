// middleware/security.js
import helmet from "helmet";
import cors from "cors";

const securityMiddleware = () => {
  return [
    cors({
      origin: process.env.CORS_ORIGIN?.split(",") ?? "http://localhost:3001",
    }),
    (req, res, next) => {
      res.header("Cross-Origin-Resource-Policy", "cross-origin");
      next();
    },
  ];
};

export { securityMiddleware };
