import http from 'http';
import { Server } from 'socket.io';
let socketServer: Server;

export function initSocketServer(httpServer: http.Server) {
  socketServer = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  socketServer.on('connection', (/*socket*/) => {
    console.log('Client connected');
  });
}

export function getSocketServer() {
  return socketServer;
}
