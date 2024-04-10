import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import ChessAdmin from './ChessAdmin';
import ChessPage from './ChessPage';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={`/chess`} className="nav-link">
                <span className="nav-link">Sakkozók</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/admin`} className="nav-link">
                <span className="nav-link">Admin</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/admin" element={<ChessAdmin />} />
        <Route path="/chess" element={<ChessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
