import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, Movie } from '../../types';
import './profile.css';

export interface ProfileProps {
  user: User;
  movies: Movie[];
  onLogout: () => void;
}

interface ExtendedProfile {
  username: string;
  bio: string;
  genre: string;
}

const Profile: React.FC<ProfileProps> = ({ user, movies, onLogout }) => {
  const navigate = useNavigate();
  const [extendedProfile, setExtendedProfile] = useState<ExtendedProfile>({
    username: '',
    bio: '',
    genre: ''
  });
  
  useEffect(() => {
    // Load extended profile data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const profileData = JSON.parse(savedProfile);
        setExtendedProfile({
          username: profileData.username || '',
          bio: profileData.bio || '',
          genre: profileData.genre || ''
        });
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }
  }, []);
  
  const stats = [
    { value: movies.length, label: 'Movies Watched' },
    { value: user.points, label: 'Points Earned' },
    { value: 8, label: 'Reviews Written' },
    { value: 3, label: 'Favorites' }
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header"></div>
        
        <div className="profile-info">
          <div className="profile-avatar">
            👤
          </div>
          <div className="profile-name">{user.name}</div>
          {extendedProfile.username && (
            <div className="profile-username">@{extendedProfile.username}</div>
          )}
          <div className="profile-email">{user.email}</div>
          {extendedProfile.bio && (
            <div className="profile-bio">{extendedProfile.bio}</div>
          )}
          {extendedProfile.genre && (
            <div className="profile-genre">
              ❤️ Favorite Genre: {extendedProfile.genre.charAt(0).toUpperCase() + extendedProfile.genre.slice(1)}
            </div>
          )}
          <div className="profile-badge">
            ⭐ Premium Member
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="section-title">Recent Activity</div>
        <div className="activity-list">
          {movies.length > 0 ? (
            movies.slice(0, 3).map((movie) => (
              <div key={movie.id} className="activity-item">
                <div className="activity-poster">
                  {movie.poster}
                </div>
                <div className="activity-details">
                  <div className="activity-title">{movie.title}</div>
                  <div className="activity-date">Watched on {movie.watchedDate}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-activity">
              <p style={{ textAlign: 'center', color: '#9ab0c9', padding: '1rem' }}>
                No movies watched yet. Start watching to build your history!
              </p>
            </div>
          )}
        </div>

        <div className="button-grid">
          <button 
            onClick={() => navigate('/edit-profile')} 
            className="btn-success"
          >
            Edit Profile
          </button>
          <button 
            onClick={() => navigate('/history')} 
            className="btn-secondary"
          >
            View History
          </button>
        </div>

        <button 
          onClick={handleLogout} 
          className="btn-logout"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;