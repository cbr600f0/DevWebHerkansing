import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScreeningRoom from './pages/ScreeningRoom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/ScreeningRoom" element={<ScreeningRoom />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
