import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Providers added later

function App() {
  return (
    <Router>
      <div className="App" style={{ padding: '20px' }}>
        <h1>AI Video Engineer – Building on GitHub</h1>
        <Routes>
          <Route path="/" element={<h2>Login Page (Coming)</h2>} />
          <Route path="/dashboard" element={<h2>Protected Dashboard (Coming)</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;