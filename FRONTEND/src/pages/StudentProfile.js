import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentProfile() {
  const [profile, setProfile] = useState({
    collegeName: '',
    city: '',
    tier: 'Tier-2',
    skills: [],
    projects: [],
    github: '',
    linkedin: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/profile/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data.profile) {
        setProfile(response.data.profile);
      }
    } catch (error) {
      console.log('No profile found, creating new');
    }
  };

  const handleAddSkill = () => {
    if (skillInput && !profile.skills.includes(skillInput)) {
      setProfile({
        ...profile,
        skills: [...profile.skills, skillInput]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(s => s !== skill)
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(
        `http://localhost:5000/api/student/profile/${user.id}`,
        { ...profile, userId: user.id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <input
          type="text"
          placeholder="College Name"
          value={profile.collegeName}
          onChange={(e) => setProfile({ ...profile, collegeName: e.target.value })}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="text"
          placeholder="City"
          value={profile.city}
          onChange={(e) => setProfile({ ...profile, city: e.target.value })}
          className="w-full p-3 border rounded mb-4"
        />

        <select
          value={profile.tier}
          onChange={(e) => setProfile({ ...profile, tier: e.target.value })}
          className="w-full p-3 border rounded mb-4"
        >
          <option value="Tier-2">Tier-2</option>
          <option value="Tier-3">Tier-3</option>
        </select>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Skills</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Add skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 p-3 border rounded"
            />
            <button
              onClick={handleAddSkill}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <input
          type="url"
          placeholder="GitHub Profile"
          value={profile.github}
          onChange={(e) => setProfile({ ...profile, github: e.target.value })}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="url"
          placeholder="LinkedIn Profile"
          value={profile.linkedin}
          onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
          className="w-full p-3 border rounded mb-6"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded font-semibold hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}