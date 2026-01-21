import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SkillBridge</h1>
          <div className="space-x-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/student/dashboard')}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload();
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to SkillBridge
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect with the best internship opportunities matched to your skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">For Students</h3>
            <p className="text-gray-600 mb-6">
              Find internships that match your skills and career goals
            </p>
            <button
              onClick={() => navigate(user ? '/internships' : '/login')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Browse Internships
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Assistant</h3>
            <p className="text-gray-600 mb-6">
              Get personalized guidance from our AI-powered career assistant
            </p>
            <button
              onClick={() => navigate(user ? '/assistant' : '/login')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Chat Now
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">For Companies</h3>
            <p className="text-gray-600 mb-6">
              Find talented interns for your organization
            </p>
            <button
              onClick={() => navigate(user ? '/company/dashboard' : '/login')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Post Internships
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {user ? `Welcome, ${user.name || user.email}!` : 'Ready to Get Started?'}
          </h3>
          <p className="text-gray-600 mb-6">
            {user 
              ? 'Explore opportunities and connect with your dream internship'
              : 'Join thousands of students finding their perfect internship match'
            }
          </p>
          {!user && (
            <div className="space-x-4">
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 text-lg"
              >
                Sign Up Now
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-gray-300 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-400 text-lg"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
