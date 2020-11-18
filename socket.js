import io from 'socket.io-client';

export const socket = io.connect('http://192.168.0.42:4000', {
    transports: ['websocket'],
    reconnectionAttempts: 15
});
