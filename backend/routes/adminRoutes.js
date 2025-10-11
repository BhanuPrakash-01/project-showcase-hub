const express = require("express");
const router = express.Router();
const {
  getPendingProjects,
  approveProject,
  rejectProject,
  deleteProject
} = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// Protect all routes in this file with both middlewares
router.use(protect, isAdmin);

router.get("/projects/pending", getPendingProjects);
router.put("/projects/:id/approve", approveProject);
router.put("/projects/:id/reject", rejectProject);
router.delete("/projects/:id", deleteProject);

module.exports = router;
