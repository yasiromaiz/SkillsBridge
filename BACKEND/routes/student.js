const express = require('express');
const StudentProfile = require('../models/StudentProfile');
const Application = require('../models/Application');
const router = express.Router();

// Get student profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.params.userId });
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student profile
router.put('/profile/:userId', async (req, res) => {
  try {
    const profile = await StudentProfile.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true, upsert: true }
    );
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Apply for internship
router.post('/apply', async (req, res) => {
  try {
    const { studentId, internshipId, coverLetter, resumeUrl } = req.body;

    // Check if already applied
    const existingApplication = await Application.findOne({
      studentId,
      internshipId
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied to this internship' });
    }

    // Create application
    const application = new Application({
      studentId,
      internshipId,
      coverLetter,
      resumeUrl,
      status: 'applied'
    });

    await application.save();
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get my applications
router.get('/applications/:userId', async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.params.userId })
      .populate('internshipId')
      .sort({ appliedAt: -1 });
    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get application status
router.get('/application/:applicationId', async (req, res) => {
  try {
    const application = await Application.findById(req.params.applicationId)
      .populate('internshipId');
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;