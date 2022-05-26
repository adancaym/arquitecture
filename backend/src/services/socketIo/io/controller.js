import {onMessage} from "../socket/controller";


export const onConnection = (io) => (socket) => {

  socket.emit('startClient', {status: 'connected'})
  socket.on('sendMessage', onMessage(io, socket))
  socket.on('disconnect', () => {
    socket.emit('stopClient', {status: 'disconnected'})
    socket.removeAllListeners();
  });

}


