import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applications, setApplications] = useState([]);
  
  const [formData, setFormData] = useState({
    coverLetter: '',
    resumeUrl: ''
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchRecommendations();
    fetchMyApplications();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/recommendations/recommended/${user.id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setInternships(response.data.recommendations || []);
    } catch (error) {
      console.error('Failed to fetch internships', error);
      // Sample data for demo
      const sampleInternships = [
        {
          _id: '1',
          title: 'Frontend Developer',
          description: 'Build beautiful user interfaces with React and modern web technologies',
          locationType: 'hybrid',
          skillsRequired: ['React', 'CSS', 'JS'],
          matchScore: 65,
          stipend: '12000',
          durationWeeks: 12
        },
        {
          _id: '2',
          title: 'Cybersecurity Specialist',
          description: 'Encryption and security protocol development',
          locationType: 'hybrid',
          skillsRequired: ['React', 'CSS'],
          matchScore: 33,
          stipend: '15000',
          durationWeeks: 14
        }
      ];
      setInternships(sampleInternships);
    }
    setLoading(false);
  };

  const fetchMyApplications = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/student/applications/${user.id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setApplications(response.data.applications || []);
    } catch (error) {
      console.log('No applications yet');
    }
  };

  const handleApplyClick = (internship) => {
    setSelectedInternship(internship);
    setFormData({ coverLetter: '', resumeUrl: '' });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setApplying(true);

    try {
      const payload = {
        studentId: user.id,
        internshipId: selectedInternship._id,
        coverLetter: formData.coverLetter,
        resumeUrl: formData.resumeUrl
      };

      const response = await axios.post(
        'http://localhost:5000/api/student/apply',
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (response.data.success) {
        alert('✅ Application submitted successfully!');
        setShowModal(false);
        fetchMyApplications();
        setFormData({ coverLetter: '', resumeUrl: '' });
      }
    } catch (error) {
      console.error('Error applying:', error);
      alert('❌ Error submitting application: ' + (error.response?.data?.error || error.message));
    } finally {
      setApplying(false);
    }
  };

  const isAlreadyApplied = (internshipId) => {
    return applications.some(app => app.internshipId === internshipId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading internships...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navigation */}
      <nav className="bg-white shadow mb-6 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SkillBridge</h1>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Recommended Internships</h1>
          <p className="text-gray-600">Based on your skills and interests</p>
        </div>

        {internships.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">No internships available yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {internships.map((internship) => {
              const hasApplied = isAlreadyApplied(internship._id);
              return (
                <div key={internship._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{internship.title}</h2>
                      <p className="text-gray-600 text-sm mt-1">
                        📍 {internship.locationType?.charAt(0).toUpperCase() + internship.locationType?.slice(1)}
                      </p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold">
                      {internship.matchScore || 0}% Match
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{internship.description}</p>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2 font-semibold">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {internship.skillsRequired?.map((skill) => (
                        <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-semibold">{internship.durationWeeks} weeks</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Stipend</p>
                      <p className="font-semibold">₹{internship.stipend}/month</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Status</p>
                      <p className="font-semibold">{hasApplied ? '✅ Applied' : '📋 Open'}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApplyClick(internship)}
                    disabled={hasApplied}
                    className={`w-full py-2 px-4 rounded font-semibold transition ${
                      hasApplied
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {hasApplied ? '✅ Already Applied' : 'Apply Now'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Apply for {selectedInternship?.title}</h2>

            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell the company why you're interested in this internship..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Resume URL</label>
                <input
                  type="url"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/your-resume.pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Match Score:</span> {selectedInternship?.matchScore}%
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  <span className="font-semibold">Requirements:</span> {selectedInternship?.skillsRequired?.join(', ')}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={applying}
                  className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}