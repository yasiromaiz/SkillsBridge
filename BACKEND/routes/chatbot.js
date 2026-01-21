const express = require('express');
const axios = require('axios');
const router = express.Router();

// RAG Chatbot endpoint
router.post('/ask', async (req, res) => {
  try {
    const { question, userProfile } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Call Python RAG system via HTTP
    const response = await axios.post('http://localhost:5001/api/rag/ask', {
      question,
      userProfile
    });

    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Failed to get chatbot response' });
  }
});

module.exports = router;