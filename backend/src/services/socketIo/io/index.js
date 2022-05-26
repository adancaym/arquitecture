const SocketIo = require('socket.io')

import {onConnection} from "./controller";

let io;
const socketIo = (server) => {

  io = SocketIo(server);
  io.on('connection', onConnection(io));
  io.on('disconnect', () => {
    io.removeAllListeners();
    io.close()
  })
  return io;
}

export const useSocketIo = (req, res, next)=> {
  req.io = io;
  next()
}



module.exports = {socketIo, useSocketIo}
