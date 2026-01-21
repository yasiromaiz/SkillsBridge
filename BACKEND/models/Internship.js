const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  title: { type: String, required: true },
  description: String,
  locationType: { type: String, enum: ['remote', 'hybrid', 'onsite'] },
  skillsRequired: [String],
  niceToHaveSkills: [String],
  stipend: Number,
  durationWeeks: Number,
  applicationDeadline: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Internship', internshipSchema);