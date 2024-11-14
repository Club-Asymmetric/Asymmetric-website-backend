import jwt from "jsonwebtoken";

const adminMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).send({ error: "Access denied. Admins only." });
    }
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ error: "Invalid token." });
  }
};

export default adminMiddleware;
