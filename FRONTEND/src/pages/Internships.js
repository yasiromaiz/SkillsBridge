import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/recommendations/recommended/${user.id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setInternships(response.data.recommendations);
    } catch (error) {
      console.error('Failed to fetch internships', error);
    }
    setLoading(false);
  };

  if (loading) return <div className="text-center p-6">Loading internships...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Recommended Internships</h1>

        <div className="space-y-4">
          {internships.map((internship) => (
            <div key={internship._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-2xl font-bold">{internship.title}</h2>
                  <p className="text-gray-600">{internship.locationType}</p>
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold">
                  {internship.matchScore}% Match
                </div>
              </div>
              <p className="text-gray-700 mb-3">{internship.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {internship.skillsRequired.map((skill) => (
                  <span key={skill} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}