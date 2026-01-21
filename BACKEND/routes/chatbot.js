const express = require('express');
const axios = require('axios');
const router = express.Router();

// Sample career guidance responses
const careerResponses = {
  resume: [
    'To improve your resume: 1) Use action verbs like "Developed", "Implemented" 2) Add quantifiable achievements 3) Keep it to 1-2 pages 4) Tailor it for each job 5) Include relevant skills and projects',
    'Resume tips: Start each bullet with a strong action verb, focus on achievements not duties, use metrics (improved by 30%, reduced time by 2 hours), and keep it ATS-friendly by matching job keywords.',
    'Key resume sections: Summary, Skills, Experience (with accomplishments), Projects, Education, Certifications. Always quantify your impact!'
  ],
  interview: [
    'Interview tips: 1) Research the company thoroughly 2) Practice common questions like "Tell me about yourself" 3) Use STAR method (Situation, Task, Action, Result) 4) Ask thoughtful questions 5) Follow up after interview',
    'Common interview questions: "Tell me about yourself", "Why do you want this role?", "What are your strengths?", "How do you handle conflicts?", "Where do you see yourself in 5 years?"',
    'MERN Stack interview topics: React hooks, state management, async/await, MongoDB schema design, Express middleware, REST APIs, authentication with JWT'
  ],
  skills: [
    'Top skills to learn: 1) JavaScript/TypeScript 2) React.js 3) Node.js 4) Database design (MongoDB/SQL) 5) Git/Version control 6) Problem solving 7) Communication skills',
    'For internships focus on: Web development (HTML/CSS/JS), frameworks (React/Vue), backend (Node/Python), databases, and Git. Build 2-3 projects to showcase.',
    'Soft skills matter too: Communication, teamwork, time management, problem-solving, and adaptability. Companies value these as much as technical skills.'
  ],
  general: [
    'Great question! To find the right internship: 1) Identify your interests 2) Build relevant projects 3) Network with professionals 4) Practice DSA for interviews 5) Apply consistently',
    'Career development path: Learn fundamentals → Build projects → Contribute to open source → Apply for internships → Gain experience → Specialize → Leadership roles',
    'Remember: Every expert was once a beginner. Focus on continuous learning and don\'t be afraid to ask questions!'
  ]
};

function getResponse(question) {
  const lowerQ = question.toLowerCase();
  
  if (lowerQ.includes('resume') || lowerQ.includes('cv')) {
    return careerResponses.resume[Math.floor(Math.random() * careerResponses.resume.length)];
  } else if (lowerQ.includes('interview') || lowerQ.includes('mern') || lowerQ.includes('dsa')) {
    return careerResponses.interview[Math.floor(Math.random() * careerResponses.interview.length)];
  } else if (lowerQ.includes('skill') || lowerQ.includes('learn') || lowerQ.includes('what should')) {
    return careerResponses.skills[Math.floor(Math.random() * careerResponses.skills.length)];
  } else {
    return careerResponses.general[Math.floor(Math.random() * careerResponses.general.length)];
  }
}

// RAG Chatbot endpoint
router.post('/ask', async (req, res) => {
  try {
    const { question, userProfile } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // First try Python RAG system
    try {
      const response = await axios.post('http://localhost:5001/api/rag/ask', {
        question,
        userProfile
      }, { timeout: 5000 });

      return res.json({
        success: true,
        data: response.data
      });
    } catch (ragError) {
      console.log('RAG system unavailable, using fallback responses');
    }

    // Fallback: Use built-in career guidance
    const answer = getResponse(question);
    
    res.json({
      success: true,
      data: {
        answer: answer,
        source: 'career_guidance'
      }
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Failed to get chatbot response' });
  }
});

module.exports = router;