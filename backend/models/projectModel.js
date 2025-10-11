// backend/models/projectModel.js

const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String, required: true }], // An array of strings
    teamMembers: [{ type: String }],
    githubLink: { type: String, required: true },
    liveLink: { type: String },
    documentation: { type: String, required: true },
    // This creates a reference to a User document
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
