import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, Movie } from '../../types';
import './profile.css';

export interface ProfileProps {
  user: User;
  movies: Movie[];
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, movies, onLogout }) => {
  const navigate = useNavigate();
  
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
          <div className="profile-email">{user.email}</div>
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
          {movies.slice(0, 3).map((movie) => (
            <div key={movie.id} className="activity-item">
              <div className="activity-poster">
                {movie.poster}
              </div>
              <div className="activity-details">
                <div className="activity-title">{movie.title}</div>
                <div className="activity-date">Watched on {movie.watchedDate}</div>
              </div>
            </div>
          ))}
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