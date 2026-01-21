import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import Internships from './pages/Internships';
import Chatbot from './pages/Chatbot';
import CompanyDashboard from './pages/CompanyDashboard';
import PostInternship from './pages/PostInternship';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/assistant" element={<Chatbot />} />
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/post-internship" element={<PostInternship />} />
      </Routes>
    </Router>
  );
}

export default App;