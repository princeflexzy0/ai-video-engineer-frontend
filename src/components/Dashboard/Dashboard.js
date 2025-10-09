import React, { useState, useEffect } from 'react';
import AutoUploadForm from '../Forms/AutoUploadForm';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { status } = useSocket();  // From mock
  const [videos, setVideos] = useState([
    { id: 1, title: 'Mock Rainforest Vid', url: '#' }  // Fake data
  ]);

  useEffect(() => {
    // Mock fetch from Bubble
    setVideos([{ id: 1, title: `Videos for ${user?.email}`, url: '#' }]);
  }, [user]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard - Hey, {user?.name}</h2>
      <button onClick={logout} style={{ padding: '5px' }}>Logout</button>
      <p>Live Status: {status}</p>
      <h3>Generate New</h3>
      <AutoUploadForm />
      <h3>Your Videos (Mock)</h3>
      <ul>
        {videos.map(v => <li key={v.id}><a href={v.url}>{v.title}</a></li>)}
      </ul>
    </div>
  );
};

export default Dashboard;