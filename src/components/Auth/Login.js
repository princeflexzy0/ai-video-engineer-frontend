import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard');
    return <div>Loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '30px' }}>Login to AI Video Engineer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
          style={{ 
            width: '100%', 
            padding: '12px', 
            margin: '10px 0', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          style={{ 
            width: '100%', 
            padding: '12px', 
            margin: '10px 0', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '10px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        Use any email and password (mock authentication)
      </p>
    </div>
  );
};

export default Login;
