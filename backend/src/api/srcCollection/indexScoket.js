import { createCollectionSocket } from './socketController'

export const initSocket = (socket) => {
  socket.emit('connected');
  socket.on('createCollection', createCollectionSocket(socket))
}
