import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [videoStatus, setVideoStatus] = useState(null);

  useEffect(() => {
    // Connect to backend
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://ai-video-backend.onrender.com';
    const newSocket = io(BACKEND_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to backend Socket.io');
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from backend');
      setConnected(false);
    });

    newSocket.on('video_status', (data) => {
      console.log('📡 Video status update:', data);
      setVideoStatus(data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected, videoStatus }}>
      {children}
    </SocketContext.Provider>
  );
};
