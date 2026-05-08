import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { CompanyDetails } from './pages/CompanyDetails';
import { AuthProvider } from './context/AuthContext';
import './App.css';

const App: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          {/* Persistent Navigation */}
          <Navbar search={search} onSearchChange={setSearch} />

          {/* Dynamic Page Content */}
          <main className="main-content" style={{ minHeight: 'calc(100vh - 70px)' }}>
            <Routes>
              <Route path="/" element={<Home search={search} />} />
              <Route path="/company/:id" element={<CompanyDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;