import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import NavBalk from './pages/nav-balk/nav-balk';
import Movie_detail from './pages/movie-detail/movie-detail';
import ScreeningRoom from './pages/ScreeningRoom/ScreeningRoom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import History from './pages/profile/History';
import type { User, Movie } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    points: 250
  });

  const [movies] = useState<Movie[]>([
    {
      id: 1,
      title: 'Psych: The Movie',
      poster: '🎬',
      genre: 'Comedy',
      year: 2017,
      duration: 88,
      rating: 4,
      watchedDate: '2025-01-15',
      review: 'Fun to watch, I recommend a pineapple as snack.'
    },
    {
      id: 2,
      title: 'The Matrix',
      poster: '🕶️',
      genre: 'Sci-Fi',
      year: 1999,
      duration: 136,
      rating: 5,
      watchedDate: '2025-01-10',
      review: 'Mind-bending masterpiece!'
    },
    {
      id: 3,
      title: 'Inception',
      poster: '🌀',
      genre: 'Thriller',
      year: 2010,
      duration: 148,
      rating: 5,
      watchedDate: '2025-01-05',
      review: 'Dreams within dreams - incredible!'
    },
    {
      id: 4,
      title: 'The Shawshank Redemption',
      poster: '🔒',
      genre: 'Drama',
      year: 1994,
      duration: 142,
      rating: 5,
      watchedDate: '2024-12-28'
    },
    {
      id: 5,
      title: 'Pulp Fiction',
      poster: '💼',
      genre: 'Crime',
      year: 1994,
      duration: 154,
      rating: 4,
      watchedDate: '2024-12-20'
    }
  ]);

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', email, password);
    setIsAuthenticated(true);
    setUser({
      id: '1',
      name: 'John Doe',
      email: email,
      points: 250
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <NavBalk isAuthenticated={isAuthenticated} />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie-detail" element={<Movie_detail />} />
        <Route path="/screening-room" element={<ScreeningRoom />} />
        
        {/* Protected routes */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile user={user} movies={movies} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-profile" 
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/history" 
          element={
            <ProtectedRoute>
              <History movies={movies} />
            </ProtectedRoute>
          } 
        />
        
        {/* Default route */}
        <Route path="/" element={<Navigate to="/screening-room" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;