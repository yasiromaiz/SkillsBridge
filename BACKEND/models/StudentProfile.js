const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  collegeName: String,
  city: String,
  tier: { type: String, enum: ['Tier-2', 'Tier-3'] },
  skills: [String],
  projects: [{
    title: String,
    description: String,
    techStack: [String],
    link: String
  }],
  resumeUrl: String,
  github: String,
  linkedin: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);