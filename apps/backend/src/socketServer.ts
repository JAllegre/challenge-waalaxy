import http from 'http';
import { Server } from 'socket.io';
import {
  refreshClientAvatar,
  refreshClientQueue,
} from './controllers/actionController';
let socketServer: Server;

export function initSocketServer(httpServer: http.Server) {
  socketServer = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  socketServer.on('connection', (/*socket*/) => {
    console.log('Client connected');
    //Refresh client on new connection
    refreshClientQueue();
    refreshClientAvatar();
  });
}

export function getSocketServer() {
  return socketServer;
}

export async function emitToAllSockets(
  eventName: string,
  data?: unknown
): Promise<void> {
  const allSockets = await getSocketServer().fetchSockets();
  allSockets.forEach((socket) => {
    if (data && eventName) {
      socket.emit(eventName, data);
    }
  });
}
