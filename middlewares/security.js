// middleware/security.js
import helmet from "helmet";
import cors from "cors";

const securityMiddleware = () => {
  return [
    (req, res, next) => {
      res.header("Cross-Origin-Resource-Policy", "cross-origin");
      next();
    },
  ];
};

export { securityMiddleware };
