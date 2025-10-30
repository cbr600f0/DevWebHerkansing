import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '../../types';
import './profile.css';

export interface HistoryProps {
  movies?: Movie[];
}

const History: React.FC<HistoryProps> = ({ movies: propMovies = [] }) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filterGenre, setFilterGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'title'>('date');

  useEffect(() => {
    // Load movie history from localStorage
    const savedHistory = localStorage.getItem('movieHistory');
    
    if (savedHistory) {
      try {
        const historyData = JSON.parse(savedHistory);
        setMovies(historyData);
      } catch (error) {
        console.error('Error loading history:', error);
        // Use sample data if loading fails
        setMovies(getSampleMovies());
      }
    } else if (propMovies.length > 0) {
      // Use movies from props if provided
      setMovies(propMovies);
    } else {
      // Use sample data for demonstration
      const sampleMovies = getSampleMovies();
      setMovies(sampleMovies);
      // Save sample data to localStorage
      localStorage.setItem('movieHistory', JSON.stringify(sampleMovies));
    }
  }, [propMovies]);

  // Generate sample movie data
  const getSampleMovies = (): Movie[] => {
    return [
      {
        id: 1,
        title: "Psych: The Movie",
        poster: "🎬",
        genre: "Comedy",
        year: 2017,
        duration: 88,
        rating: 5,
        watchedDate: "2024-10-15",
        review: "Hilarious continuation of the series! Perfect blend of mystery and humor."
      },
      {
        id: 2,
        title: "The Shawshank Redemption",
        poster: "🎭",
        genre: "Drama",
        year: 1994,
        duration: 142,
        rating: 5,
        watchedDate: "2024-10-10",
        review: "Absolutely masterpiece. One of the best films ever made."
      },
      {
        id: 3,
        title: "Inception",
        poster: "🌀",
        genre: "Science Fiction",
        year: 2010,
        duration: 148,
        rating: 5,
        watchedDate: "2024-10-05",
        review: "Mind-bending thriller that keeps you thinking long after it ends."
      },
      {
        id: 4,
        title: "The Dark Knight",
        poster: "🦇",
        genre: "Action",
        year: 2008,
        duration: 152,
        rating: 5,
        watchedDate: "2024-09-28",
        review: "Heath Ledger's performance as the Joker is legendary."
      },
      {
        id: 5,
        title: "Pulp Fiction",
        poster: "💼",
        genre: "Thriller",
        year: 1994,
        duration: 154,
        rating: 4,
        watchedDate: "2024-09-20",
        review: "Quentin Tarantino at his finest. Non-linear storytelling done right."
      },
      {
        id: 6,
        title: "Forrest Gump",
        poster: "🏃",
        genre: "Drama",
        year: 1994,
        duration: 142,
        rating: 5,
        watchedDate: "2024-09-15",
        review: "Life is like a box of chocolates. Beautiful and touching story."
      },
      {
        id: 7,
        title: "The Matrix",
        poster: "💊",
        genre: "Science Fiction",
        year: 1999,
        duration: 136,
        rating: 5,
        watchedDate: "2024-09-08",
        review: "Revolutionary sci-fi that changed cinema forever."
      },
      {
        id: 8,
        title: "Goodfellas",
        poster: "🔫",
        genre: "Thriller",
        year: 1990,
        duration: 146,
        rating: 4,
        watchedDate: "2024-09-01",
        review: "Scorsese's masterclass in crime cinema."
      },
      {
        id: 9,
        title: "The Silence of the Lambs",
        poster: "🐑",
        genre: "Thriller",
        year: 1991,
        duration: 118,
        rating: 5,
        watchedDate: "2024-08-25",
        review: "Chilling performance by Anthony Hopkins. Still terrifying."
      },
      {
        id: 10,
        title: "Interstellar",
        poster: "🚀",
        genre: "Science Fiction",
        year: 2014,
        duration: 169,
        rating: 5,
        watchedDate: "2024-08-18",
        review: "Visually stunning space epic with emotional depth."
      }
    ];
  };

  // Get unique genres for filter
  const genres = ['all', ...Array.from(new Set(movies.map(m => m.genre)))];

  // Filter and sort movies
  const filteredAndSortedMovies = movies
    .filter(movie => filterGenre === 'all' || movie.genre === filterGenre)
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.watchedDate).getTime() - new Date(a.watchedDate).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  // Calculate statistics
  const totalMovies = movies.length;
  const totalHours = Math.round(movies.reduce((sum, movie) => sum + movie.duration, 0) / 60);
  const avgRating = movies.length > 0 
    ? (movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1)
    : '0.0';

  const stats = [
    { value: totalMovies, label: 'Total Movies' },
    { value: totalHours, label: 'Hours Watched' },
    { value: avgRating, label: 'Avg Rating' }
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="profile-container">
      <div className="history-card">
        <div className="history-header">
          <h2 className="history-title">Movie History</h2>
          <button 
            onClick={() => navigate('/profile')} 
            className="btn-back-inline"
          >
            ← Back
          </button>
        </div>
        
        <div className="history-stats">
          {stats.map((stat, i) => (
            <div key={i} className="history-stat">
              <span className="history-stat-value">{stat.value}</span>
              <span className="history-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="history-filters">
          <div className="filter-group">
            <label className="filter-label">Filter by Genre:</label>
            <select 
              value={filterGenre} 
              onChange={(e) => setFilterGenre(e.target.value)}
              className="filter-select"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as 'date' | 'rating' | 'title')}
              className="filter-select"
            >
              <option value="date">Watch Date</option>
              <option value="rating">Rating</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>

        {/* Movie List */}
        <div className="movie-list">
          {filteredAndSortedMovies.length > 0 ? (
            filteredAndSortedMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-poster-small">
                  {movie.poster}
                </div>
                <div className="movie-info">
                  <div className="movie-title">{movie.title}</div>
                  <div className="movie-meta">
                    <span>📁 {movie.genre}</span>
                    <span>📅 {movie.year}</span>
                    <span>⏱️ {movie.duration} min</span>
                  </div>
                  <div className="movie-details">
                    <span className="movie-date">
                      Watched on {formatDate(movie.watchedDate)}
                    </span>
                    <span className="movie-rating">
                      {'⭐'.repeat(Math.floor(movie.rating))} ({movie.rating})
                    </span>
                  </div>
                  {movie.review && (
                    <div className="movie-review">"{movie.review}"</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-movies">
              <p>No movies found matching your filters.</p>
              <button 
                onClick={() => setFilterGenre('all')}
                className="btn-reset-filters"
              >
                Reset Filters
              </button>
            </div>
          )}
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