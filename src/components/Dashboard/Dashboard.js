import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AutoUploadForm from '../Forms/AutoUploadForm';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <header style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '28px' }}>AI Video Engineer</h1>
        <button
          onClick={logout}
          style={{
            padding: '10px 20px',
            backgroundColor: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </header>

      <main style={{ padding: '40px 20px' }}>
        <AutoUploadForm />
      </main>
    </div>
  );
}

export default Dashboard;
