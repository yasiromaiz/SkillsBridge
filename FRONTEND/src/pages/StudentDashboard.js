import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaUser, FaRobot, FaSignOutAlt } from 'react-icons/fa';

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SkillBridge</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h2>
          <p className="text-gray-600">Ready to find your perfect internship?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigate('/student/profile')}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
          >
            <FaUser className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">My Profile</h3>
            <p className="text-gray-600">Update skills, projects & resume</p>
          </div>

          <div
            onClick={() => navigate('/internships')}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
          >
            <FaBriefcase className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Find Internships</h3>
            <p className="text-gray-600">Browse & apply to opportunities</p>
          </div>

          <div
            onClick={() => navigate('/assistant')}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
          >
            <FaRobot className="text-4xl text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Career Assistant</h3>
            <p className="text-gray-600">Get interview & resume tips</p>
          </div>
        </div>
      </div>
    </div>
  );
}