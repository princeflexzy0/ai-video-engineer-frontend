import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';
import AutoUploadForm from '../Forms/AutoUploadForm';

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isConnected } = useSocket();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ 
        backgroundColor: '#667eea', 
        color: 'white', 
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>AI Video Engineer</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px',
            backgroundColor: isConnected ? '#28a745' : '#ffc107',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            <span>{isConnected ? '🟢' : '🟡'}</span>
            <span>{isConnected ? 'Connected' : 'Connecting...'}</span>
          </div>
          <button 
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div style={{ padding: '20px' }}>
        {!isConnected && (
          <div style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '4px',
            padding: '15px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ⚠️ <strong>Backend is waking up...</strong> This may take 30-60 seconds.
          </div>
        )}
        <AutoUploadForm />
      </div>
    </div>
  );
}

export default Dashboard;
