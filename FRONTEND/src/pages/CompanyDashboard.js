import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CompanyDashboard() {
  const [internships, setInternships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ posted: 0, applications: 0, active: 0 });
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    locationType: 'hybrid',
    skillsRequired: '',
    niceToHaveSkills: '',
    stipend: '',
    durationWeeks: ''
  });

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.id) {
      fetchInternships();
    }
  }, [user]);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/company/internships/${user.id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setInternships(response.data.internships || []);
      updateStats(response.data.internships || []);
    } catch (error) {
      console.error('Error fetching internships:', error);
      // Set sample data for demo
      const sampleInternships = [
        {
          _id: '1',
          title: 'Full Stack Developer',
          description: 'Build scalable web applications using MERN stack',
          locationType: 'remote',
          skillsRequired: ['React', 'Node.js', 'MongoDB'],
          stipend: '15000',
          durationWeeks: 12,
          applications: 12
        },
        {
          _id: '2',
          title: 'Frontend Engineer',
          description: 'Create beautiful user interfaces with React and Tailwind CSS',
          locationType: 'hybrid',
          skillsRequired: ['React', 'JavaScript', 'Tailwind CSS'],
          stipend: '12000',
          durationWeeks: 10,
          applications: 8
        },
        {
          _id: '3',
          title: 'Backend Developer',
          description: 'Develop robust backend systems and APIs',
          locationType: 'onsite',
          skillsRequired: ['Node.js', 'MongoDB', 'Express'],
          stipend: '14000',
          durationWeeks: 12,
          applications: 5
        }
      ];
      setInternships(sampleInternships);
      updateStats(sampleInternships);
    } finally {
      setLoading(false);
    }
  };

  const updateStats = (items) => {
    setStats({
      posted: items.length,
      applications: items.reduce((sum, item) => sum + (item.applications || 0), 0),
      active: items.length
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        companyId: user.id,
        skillsRequired: formData.skillsRequired.split(',').map(s => s.trim()),
        niceToHaveSkills: formData.niceToHaveSkills.split(',').map(s => s.trim()),
        stipend: parseInt(formData.stipend)
      };

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/company/internship/${editingId}`,
          payload,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/company/internship',
          payload,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }
      
      fetchInternships();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving internship:', error);
      alert('Error saving internship');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      try {
        await axios.delete(
          `http://localhost:5000/api/company/internship/${id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        fetchInternships();
      } catch (error) {
        console.error('Error deleting internship:', error);
        alert('Error deleting internship');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      locationType: 'hybrid',
      skillsRequired: '',
      niceToHaveSkills: '',
      stipend: '',
      durationWeeks: ''
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">SkillBridge</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{user?.email}</span>
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
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Company Dashboard</h1>
          <p className="text-gray-600">Manage your internship postings and applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Posted</p>
                <p className="text-3xl font-bold text-blue-600">{stats.posted}</p>
              </div>
              <div className="text-4xl text-blue-200">📋</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Applications</p>
                <p className="text-3xl font-bold text-green-600">{stats.applications}</p>
              </div>
              <div className="text-4xl text-green-200">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Positions</p>
                <p className="text-3xl font-bold text-purple-600">{stats.active}</p>
              </div>
              <div className="text-4xl text-purple-200">⚡</div>
            </div>
          </div>
        </div>

        {/* Add New Button */}
        <div className="mb-8">
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold"
          >
            + Post New Internship
          </button>
        </div>

        {/* Internships List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Position</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stipend</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Duration</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Applications</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {internships.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No internships posted yet. Click "Post New Internship" to get started!
                    </td>
                  </tr>
                ) : (
                  internships.map((internship) => (
                    <tr key={internship._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{internship.title}</p>
                          <p className="text-sm text-gray-600">{internship.description?.substring(0, 40)}...</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          internship.locationType === 'remote' ? 'bg-blue-100 text-blue-800' :
                          internship.locationType === 'hybrid' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {internship.locationType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900">₹{internship.stipend}/month</td>
                      <td className="px-6 py-4 text-gray-900">{internship.durationWeeks} weeks</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {internship.applications || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => {
                            setFormData({
                              title: internship.title,
                              description: internship.description,
                              locationType: internship.locationType,
                              skillsRequired: internship.skillsRequired?.join(', ') || '',
                              niceToHaveSkills: internship.niceToHaveSkills?.join(', ') || '',
                              stipend: internship.stipend,
                              durationWeeks: internship.durationWeeks
                            });
                            setEditingId(internship._id);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(internship._id)}
                          className="text-red-600 hover:text-red-800 text-sm font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingId ? 'Edit Internship' : 'Post New Internship'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Position Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Full Stack Developer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter job description"
                  rows="2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Location Type</label>
                  <select
                    name="locationType"
                    value={formData.locationType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Stipend (₹/month)</label>
                  <input
                    type="number"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 15000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Duration (weeks)</label>
                  <input
                    type="number"
                    name="durationWeeks"
                    value={formData.durationWeeks}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Required Skills (comma-separated)</label>
                <input
                  type="text"
                  name="skillsRequired"
                  value={formData.skillsRequired}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="e.g., React, Node.js, MongoDB"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nice-to-have Skills (comma-separated)</label>
                <input
                  type="text"
                  name="niceToHaveSkills"
                  value={formData.niceToHaveSkills}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Docker, AWS, GraphQL"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  {editingId ? 'Update' : 'Post'} Internship
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
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
