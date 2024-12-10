const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = { id: decoded.id, username: decoded.username };

    if (!req.user.id || !req.user.username) {
      return res.status(403).json({ message: "Missing required parameters" });
    }

    next();
  });
}

module.exports = authMiddleware;
