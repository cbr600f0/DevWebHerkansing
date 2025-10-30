import Movie_detail from './pages/movie-detail/movie-detail'
import Movie_list from './pages/movie-list/movie-list'
import Movie_panel from './pages/admin-movie-panel/movie-panel'
import Zaal_panel from './pages/admin-zaal-panel/zaal-panel'
import Show_panel from './pages/admin-show-panel/show-panel'
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
          <Route path="movie_detail/:movieId" element={<Movie_detail />} />
          <Route path="/movie_list" element={<Movie_list />} />
          <Route path="/movie_panel" element={<Movie_panel />} />
          <Route path="/zaal_panel" element={<Zaal_panel />} />
          <Route path="/show_panel" element={<Show_panel />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/ScreeningRoom" element={<ScreeningRoom />} />
          <Route path="/profile" element={<Profile user={user} movies={movies} onLogout={handleLogout} />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/history" element={<History movies={movies} />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App