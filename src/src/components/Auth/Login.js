import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard');
    return <div>Loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) login(email);  // Mock login
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Login to AI Video Engineer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email (e.g., from XLS)"
          required
          style={{ margin: '10px', padding: '5px' }}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
