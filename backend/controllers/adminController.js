const Project = require("../models/projectModel");

// @desc    Get all pending projects
// @route   GET /api/admin/projects/pending
// @access  Private/Admin
const getPendingProjects = async (req, res) => {
  const projects = await Project.find({ status: "pending" }).populate(
    "submittedBy",
    "username email"
  );
  res.json(projects);
};

// @desc    Approve a project
// @route   PUT /api/admin/projects/:id/approve
// @access  Private/Admin
const approveProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    project.status = "approved";
    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
};

// @desc    Reject a project
// @route   PUT /api/admin/projects/:id/reject
// @access  Private/Admin
const rejectProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (project) {
    project.status = "rejected";
    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne(); // Mongoose v6+ uses deleteOne() on the document
      res.json({ message: "Project removed" });
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = { getPendingProjects, approveProject, rejectProject ,deleteProject};
