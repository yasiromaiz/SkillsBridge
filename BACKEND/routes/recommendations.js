const express = require('express');
const Internship = require('../models/Internship');
const StudentProfile = require('../models/StudentProfile');
const router = express.Router();

// Recommendation algorithm
function calculateMatchScore(studentSkills, internshipSkills, projectCount, hasResume) {
  const skillMatch = studentSkills.filter(s => internshipSkills.includes(s)).length / internshipSkills.length;
  const projectMatch = projectCount >= 2 ? 1 : (projectCount / 2);
  const profileStrength = (hasResume ? 1 : 0) / 3;

  const score = 100 * (0.65 * skillMatch + 0.20 * projectMatch + 0.15 * profileStrength);
  return Math.round(score);
}

// Get recommended internships
router.get('/recommended/:userId', async (req, res) => {
  try {
    const student = await StudentProfile.findOne({ userId: req.params.userId });
    const internships = await Internship.find();

    const recommendations = internships.map(internship => ({
      ...internship.toObject(),
      matchScore: calculateMatchScore(
        student.skills,
        internship.skillsRequired,
        student.projects.length,
        !!student.resumeUrl
      )
    }));

    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    res.json({ success: true, recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;