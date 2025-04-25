import { Socket } from 'socket.io-client';

export interface ServerToClientEvents {
  'receive-message': (data: { text: string; sender: string }) => void;
}

export interface ClientToServerEvents {
  'join-room': (roomId: string) => void;
  'send-message': (data: { roomId: string; text: string }) => void;
}

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>; 