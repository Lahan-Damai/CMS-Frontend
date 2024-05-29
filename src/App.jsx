import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm'; 
import Dashboard from './components/Dashboard'; 
import ArtikelEdukasi from './components/ArtikelEdukasi';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={<Dashboard /> } />

          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/artikel-edukasi" element={<ArtikelEdukasi />} /> 

        </Routes>
      </div>
    </Router>
  );
}

export default App;
