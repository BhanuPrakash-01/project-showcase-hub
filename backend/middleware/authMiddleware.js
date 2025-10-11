// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const protect = async (req, res, next) => {
  let token;

  // Check for the token in the authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGciOi...")
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID from the token payload and attach them to the request object
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Move on to the next piece of middleware or the route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const isAdmin = (req, res, next) => {
  // We assume this middleware runs *after* the 'protect' middleware
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    // 403 Forbidden is more appropriate than 401 Unauthorized here
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { protect, isAdmin };