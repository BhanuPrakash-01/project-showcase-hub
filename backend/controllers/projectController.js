// backend/controllers/projectController.js

const Project = require("../models/projectModel");

// @desc    Submit a new project
// @route   POST /api/projects
// @access  Private
const submitProject = async (req, res) => {
  const {
    title,
    description,
    documentation,
    techStack,
    teamMembers,
    githubLink,
    liveLink,
  } = req.body;

  const project = new Project({
    title,
    description,
    documentation,
    techStack,
    teamMembers,
    githubLink,
    liveLink,
    submittedBy: req.user._id, // Attach the logged-in user's ID
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
};

// @desc    Get all approved projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  const projects = await Project.find({ status: "approved" });
  res.json(projects);
};

const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
};

module.exports = { submitProject, getProjects, getProjectById };