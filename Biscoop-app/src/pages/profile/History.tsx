import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types';
import './profile.css';

export interface HistoryProps {
  movies: Movie[];
}

const History: React.FC<HistoryProps> = ({ movies }) => {
  const navigate = useNavigate();
  
  const stats = [
    { value: movies.length, label: 'Total Movies' },
    { value: 48, label: 'Hours Watched' },
    { value: 4.2, label: 'Avg Rating' }
  ];

  return (
    <div className="profile-container">
      <div className="history-card">
        <h2 className="history-title">Movie History</h2>
        
        <div className="history-stats">
          {stats.map((stat, i) => (
            <div key={i} className="history-stat">
              <span className="history-stat-value">{stat.value}</span>
              <span className="history-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-poster-small">
                {movie.poster}
              </div>
              <div className="movie-info">
                <div className="movie-title">{movie.title}</div>
                <div className="movie-meta">
                  <span>{movie.genre}</span>
                  <span>{movie.year}</span>
                  <span>{movie.duration} min</span>
                </div>
                <div className="movie-details">
                  <span className="movie-date">Watched on {movie.watchedDate}</span>
                  <span className="movie-rating">
                    {'⭐'.repeat(Math.floor(movie.rating))} ({movie.rating})
                  </span>
                </div>
                {movie.review && (
                  <div className="movie-review">{movie.review}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="history-footer">
          <button 
            onClick={() => navigate('/profile')} 
            className="btn-back-center"
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;