import React, { createContext, useContext, useEffect, useState } from 'react';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [videoStatus, setVideoStatus] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Note: WebSocket connection disabled
    // App uses HTTP polling for real-time updates
    console.log('📡 Using HTTP polling for status updates (WebSocket not required)');
    setIsConnected(false);
  }, []);

  return (
    <SocketContext.Provider value={{ socket, videoStatus, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
