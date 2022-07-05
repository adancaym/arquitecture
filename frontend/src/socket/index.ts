import io from 'socket.io-client';

const {REACT_APP_BACKEND_URL} = process.env;
const socket = io(REACT_APP_BACKEND_URL || 'http://localhost:3000');

export const initiateSocket = () => {
    console.log(`Connecting socket...`);
}
export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
}
export const listenConnect = (cb: (msg: string) => void) => {
    socket.on('startClient', msg => {
        console.log('Websocket event received!');
        return cb( msg);
    });
}
