import React, { createContext, useContext, useState } from 'react';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [status, setStatus] = useState('Ready');  // Mock statuses

  const updateStatus = (newStatus) => setStatus(newStatus);

  const value = { status, updateStatus };

  return <SocketContext.Provider value={value}>{children}</SocketProvider>;
};