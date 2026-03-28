import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json("No token, authorization denied");
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = verified;

    next();

  } catch (err) {
    res.status(401).json("Invalid token");
  }
};

export default authMiddleware;