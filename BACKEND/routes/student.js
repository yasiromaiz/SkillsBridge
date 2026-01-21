const express = require('express');
const StudentProfile = require('../models/StudentProfile');
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

module.exports = router;