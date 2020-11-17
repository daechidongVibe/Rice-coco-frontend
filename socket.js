import io from 'socket.io-client';

export const socket = io.connect('http://192.168.0.54:3000', {
    transports: ['websocket'],
    reconnectionAttempts: 15,
});
