// Import required packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); 
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require('./routes/projectRoutes'); // Import project routes
const adminRoutes = require("./routes/adminRoutes");
const corsOptions = {
  // We will replace '*' with our Vercel frontend URL later
  origin:
    process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};




// Initialize dotenv to use environment variables
dotenv.config();

connectDB(); // Connect to the database

// Create an Express application
const app = express();

// app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors(corsOptions));

// Define the port the server will run on
// It will use the PORT from our .env file, or 5000 if it's not defined
const PORT = process.env.PORT || 5000;

// A simple test route to make sure the server is working
app.get("/api", (req, res) => {
  res.send("Welcome to the Project Showcase Hub API!");
});

// Use the user routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes); // Use project routes
app.use("/api/admin", adminRoutes);

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
