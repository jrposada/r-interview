import { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { SocketContext } from './socket-context';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const SocketProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  console.log('hola');
  useEffect(() => {
    socket.emit('connection', 'Hello');
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
