import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    alert('Registration successful!');
    navigate('/login');
  };
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <input type="password" placeholder="Password" required style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white' }}>Register</button>
      </form>
      <p><Link to="/login">Login here</Link></p>
    </div>
  );
}
export default Register;
