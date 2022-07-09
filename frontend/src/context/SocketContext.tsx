import {createContext, useContext, useEffect, useState} from "react";

import io, {Socket} from 'socket.io-client';

interface SocketContextInterface {
    socket: Socket;
    status: string;
}
export const SocketContext = createContext<SocketContextInterface>({
    socket: io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001'),
    status: 'disconnected'
});
export interface SocketContextProps {
    children: JSX.Element | JSX.Element[];
}
export const SocketContextProvider = ({children}: SocketContextProps) => {
    const [socket] = useState<Socket>(io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001'));
    const [status, setStatus] = useState<string>('disconnected');

    useEffect(() => {
        socket.on('connected', () => {
            setStatus('connected');
        });
    });

    return <SocketContext.Provider
        value={{
            socket,
            status
        }}>{children}</SocketContext.Provider>;
}

export const useSocketContext = () => useContext(SocketContext);