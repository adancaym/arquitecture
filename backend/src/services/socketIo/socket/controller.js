export const onMessage = (io, socket) => (params) => {
  const {to, from} = params;
  io.emit('receiveMessage' + to, params)
  io.emit('receiveMessage' + from, params)
}
