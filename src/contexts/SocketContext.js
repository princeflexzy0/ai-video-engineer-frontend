import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [videoStatus, setVideoStatus] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://ai-video-engineer-backend.onrender.com';
    
    const newSocket = io(BACKEND_URL, {
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionDelay: 2000,
      reconnectionAttempts: 3,
      timeout: 5000
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to backend');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from backend');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.log('⚠️ Connection error:', error.message);
      setIsConnected(false);
    });

    newSocket.on('video_progress', (data) => {
      console.log('📹 Video progress:', data);
      setVideoStatus(data);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, videoStatus, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
