import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    bio: '',
    genre: ''
  });

  const textFields = [
    { key: 'username', label: 'Username', placeholder: 'Enter username' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
    { key: 'fullName', label: 'Full Name', placeholder: 'Enter full name' }
  ];

  const updateField = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // In a real app, you'd make an API call here
    navigate('/profile');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <button 
          onClick={() => navigate('/profile')} 
          className="btn-back"
        >
          ← Back to Profile
        </button>
        
        <h2 className="edit-title">Edit Profile</h2>
        
        <div className="avatar-section">
          <div className="edit-avatar">
            👤
          </div>
          <button className="btn-change-avatar">
            Change Avatar
          </button>
        </div>

        {textFields.map(field => (
          <div key={field.key} className="form-group">
            <label className="form-label">{field.label}</label>
            <input
              type={field.type || 'text'}
              value={formData[field.key as keyof typeof formData]}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="form-input"
            />
          </div>
        ))}
        
        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => updateField('bio', e.target.value)}
            placeholder="Tell us about yourself..."
            rows={3}
            className="form-textarea"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Favorite Genre</label>
          <select
            value={formData.genre}
            onChange={(e) => updateField('genre', e.target.value)}
            className="form-select"
          >
            <option value="">Select a genre</option>
            {['Action & Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Science Fiction', 'Thriller'].map(g => (
              <option key={g} value={g.toLowerCase()}>{g}</option>
            ))}
          </select>
        </div>

        <div className="button-grid">
          <button 
            onClick={handleSave} 
            className="btn-success"
          >
            Save Changes
          </button>
          <button 
            onClick={() => navigate('/profile')} 
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;