import Movie_detail from './pages/movie-detail/movie-detail'
import Movie_list from './pages/movie-list/movie-list'
import NavBalk from './pages/nav-balk/nav-balk'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <NavBalk/>
      <Routes>
        <Route path="/movie_detail" element={<Movie_detail />}/>
        <Route path="movie_detail/:id" element={<Movie_detail />} />
        <Route path="/movie_list" element={<Movie_list />}/>
        <Route path="/" element={<Navigate to="/movie_detail" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App