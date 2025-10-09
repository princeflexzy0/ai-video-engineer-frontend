import React, { createContext, useContext, useState } from 'react';

const BACKEND_URL = 'https://ai-video-backend.onrender.com'; // ← Your actual Render URL

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [status, setStatus] = useState('Ready');  // Mock statuses

  const updateStatus = (newStatus) => setStatus(newStatus);

  const value = { status, updateStatus };

  return <SocketContext.Provider value={value}>{children}</SocketProvider>;
};