import http from 'http';
import { Server } from 'socket.io';
let socketServer: Server;

export function initSocketServer(httpServer: http.Server) {
  socketServer = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });
  //io.fetchSockets()

  socketServer.on('connection', (/*socket*/) => {
    console.log('a user connected');
  });
}

export function getSocketServer() {
  return socketServer;
}
