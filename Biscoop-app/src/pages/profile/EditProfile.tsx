import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import './profile.css';

interface ExtendedUserData {
  username: string;
  email: string;
  fullName: string;
  bio: string;
  genre: string;
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  
  const [formData, setFormData] = useState<ExtendedUserData>({
    username: '',
    email: user.email,
    fullName: user.name,
    bio: '',
    genre: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Load extended profile data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const profileData = JSON.parse(savedProfile);
        setFormData({
          username: profileData.username || '',
          email: user.email,
          fullName: user.name,
          bio: profileData.bio || '',
          genre: profileData.genre || ''
        });
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    } else {
      // Initialize with user data from context
      setFormData({
        username: user.name.toLowerCase().replace(/\s+/g, '_'),
        email: user.email,
        fullName: user.name,
        bio: '',
        genre: ''
      });
    }
  }, [user]);

  const textFields = [
    { key: 'username', label: 'Username', placeholder: 'Enter username' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
    { key: 'fullName', label: 'Full Name', placeholder: 'Enter full name' }
  ];

  const updateField = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Clear messages when user types
    setSuccessMessage('');
    setErrorMessage('');
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setErrorMessage('Full name is required');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Valid email is required');
      return false;
    }
    if (!formData.username.trim()) {
      setErrorMessage('Username is required');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    setErrorMessage('');
    
    if (!validateForm()) {
      return;
    }

    try {
      // Update the user context with new name and email
      setUser({
        ...user,
        name: formData.fullName,
        email: formData.email
      });

      // Save extended profile data to localStorage
      const profileData = {
        username: formData.username,
        bio: formData.bio,
        genre: formData.genre,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('userProfile', JSON.stringify(profileData));

      // Update registered user data if it exists
      const registeredUser = localStorage.getItem('registeredUser');
      if (registeredUser) {
        const userData = JSON.parse(registeredUser);
        userData.name = formData.fullName;
        userData.email = formData.email;
        localStorage.setItem('registeredUser', JSON.stringify(userData));
      }

      // Show success message
      setSuccessMessage('Profile updated successfully!');
      
      // Navigate back to profile after a short delay
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } catch (error) {
      setErrorMessage('Error saving profile. Please try again.');
      console.error('Save error:', error);
    }
  };

  const handleCancel = () => {
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
        
        {successMessage && (
          <div className="success-message" style={{ 
            color: '#2c5f2d', 
            marginBottom: '1rem', 
            padding: '0.75rem',
            backgroundColor: '#d4edda',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            ✓ {successMessage}
          </div>
        )}
        
        {errorMessage && (
          <div className="error-message" style={{ 
            color: '#e74c3c', 
            marginBottom: '1rem', 
            padding: '0.75rem',
            backgroundColor: '#fee',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            {errorMessage}
          </div>
        )}
        
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
              required
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
            disabled={!!successMessage}
          >
            {successMessage ? 'Saved!' : 'Save Changes'}
          </button>
          <button 
            onClick={handleCancel} 
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