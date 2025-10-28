import Movie_detail from './pages/movie-detail/movie-detail'
import Movie_list from './pages/movie-list/movie-list'
import Movie_panel from './pages/admin-show-panel/show-panel'
import Zaal_panel from './pages/admin-zaal-panel/zaal-panel'
import Show_panel from './pages/admin-show-panel/show-panel'
import NavBalk from './pages/nav-balk/nav-balk'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import ScreeningRoom from './pages/ScreeningRoom/ScreeningRoom';

function App() {
  return (
    <BrowserRouter>
    <NavBalk/>
      <Routes>
        <Route path="/movie_detail" element={<Movie_detail />}/>
        <Route path="movie_detail/:id" element={<Movie_detail />} />
        <Route path="/movie_list" element={<Movie_list />}/>
        <Route path="/movie_panel" element={<Movie_panel />}/>
        <Route path="/zaal_panel" element={<Zaal_panel/>}/>
        <Route path="/show_panel" element={<Show_panel/>}/>
        <Route path="/" element={<Navigate to="/movie_detail" replace />} />
        <Route path="/ScreeningRoom" element={<ScreeningRoom />} />
        <Route path="/" element={<Navigate to="/ScreeningRoom" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App