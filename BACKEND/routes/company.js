const express = require('express');
const Internship = require('../models/Internship');
const router = express.Router();

// Post internship
router.post('/internship', async (req, res) => {
  try {
    const internship = new Internship(req.body);
    await internship.save();
    res.json({ success: true, internship });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get internships by company
router.get('/internships/:companyId', async (req, res) => {
  try {
    const internships = await Internship.find({ companyId: req.params.companyId });
    res.json({ success: true, internships });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update internship
router.put('/internship/:id', async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, internship });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete internship
router.delete('/internship/:id', async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Internship deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;