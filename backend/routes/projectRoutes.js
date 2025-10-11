// backend/routes/projectRoutes.js

const express = require("express");
const router = express.Router();
const {
  submitProject,
  getProjects,
  getProjectById,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

// Chaining the routes for the same endpoint '/'
router
  .route("/")
  .get(getProjects) // Anyone can view approved projects
  .post(protect, submitProject); // Only logged-in users can submit
  
router.route("/:id").get(getProjectById);

module.exports = router;
