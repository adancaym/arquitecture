import { initSocket } from '../../../api/srcCollection/indexScoket'

const SocketIo = require('socket.io')

export let io

const socketIo = (server, origin) => {
  io = SocketIo(server, {
    cors: {
      origin,
      methods: ['GET', 'POST']
    }
  })
  io.on('connection', (socket) => {
    console.log('a user connected')
    initSocket(socket)
  })

  io.on('disconnect', () => {
    io.removeAllListeners()
    io.close()
  })
  return io
}

export const useSocketIo = (req, res, next) => {
  req.io = io
  next()
}

module.exports = { socketIo, useSocketIo }
