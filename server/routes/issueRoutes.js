import express from "express";
import Issue from "../models/Issue.js";
import upload from "../config/multer.js";

const router = express.Router();

// Create Issue
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const issueData = {
      ...req.body,
      image: req.file ? req.file.filename : "",
    };

    const issue = await Issue.create(issueData);

    res.status(201).json(issue);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get All Issues
router.get("/", async (req, res) => {
  // Upvote Issue
router.put("/:id/upvote", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    issue.upvotes += 1;

    await issue.save();

    res.json(issue);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
  try {
    const issues = await Issue.find();

    res.json(issues);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Update Issue Status
router.put("/:id/status", async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(issue);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;