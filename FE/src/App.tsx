import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import DashboardAdmin from './pages/dashboardAdmin';
import Register from './pages/register';
import DashboardSales from './pages/dashboardSales';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  // Update state setiap kali localStorage berubah
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(stored);
    }, 100); // Cek setiap 100ms (ringan karena localStorage)

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboardSales" element={<DashboardSales />} />
        <Route
          path="/dashboardAdmin"
          element={isLoggedIn ? <DashboardAdmin /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
