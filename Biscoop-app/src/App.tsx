import Movie_detail from './pages/movie-detail/movie-detail'
import NavBalk from './pages/nav-balk/nav-balk'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import ScreeningRoom from './pages/ScreeningRoom/ScreeningRoom';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Profile from './pages/profile/Profile'
import type { User, Movie } from './types'
import EditProfile from './pages/profile/EditProfile';
import History from './pages/profile/History';
import UserContext from './context/UserContext'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User>({ id: '1', name: 'John Doe', email: 'john.doe@example.com', points: 0 })
  const [movies] = useState<Movie[]>([])

  const handleLogin = (email: string, password: string) => {
    console.log('login', email, password)
    setIsAuthenticated(true)
    setUser({ ...user, email })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
        <NavBalk isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie-detail" element={<Movie_detail />} />
          <Route path="/ScreeningRoom" element={<ScreeningRoom />} />
          <Route path="/profile" element={<Profile user={user} movies={movies} onLogout={handleLogout} />} />
          <Route path="/" element={<Navigate to="/ScreeningRoom" replace />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/history" element={<History movies={movies} />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App