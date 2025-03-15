import { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { io } from 'socket.io-client';
import { SocketContext } from './socket-context';

const socket = io();

const SocketProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const eventName = 'ready';

    socket.on(eventName, () => {
      console.log(' ready');
    });

    return () => {
      socket.off(eventName);
    };
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
