import { useContext } from 'react';
import { Socket, SocketContext } from './socket-context';

export function useSocket(): Socket {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      'You can not use `useSocket` outside of <SocketProvider />.'
    );
  }

  return context;
}
