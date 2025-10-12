// Import required packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Initialize dotenv to use environment variables
dotenv.config();

connectDB(); // Connect to the database

// Create an Express application
const app = express();

// CORS Configuration - FIXED
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:4200", // Local development
      process.env.FRONTEND_URL, // Production frontend from environment variable
    ].filter(Boolean); // Remove any undefined values

    // Remove trailing slashes from both origin and allowed origins for comparison
    const normalizedOrigin = origin.replace(/\/$/, "");
    const normalizedAllowedOrigins = allowedOrigins.map((url) =>
      url.replace(/\/$/, "")
    );

    if (normalizedAllowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON bodies

// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// A simple test route to make sure the server is working
app.get("/api", (req, res) => {
  res.send("Welcome to the Project Showcase Hub API!");
});

// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminRoutes);

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
