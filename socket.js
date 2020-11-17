import io from 'socket.io-client';
import getEnvVars from './environment';

const { REACT_NATIVE_ANDROID_SERVER_URL } = getEnvVars();

export const socket = io.connect(REACT_NATIVE_ANDROID_SERVER_URL, {
    transports: ['websocket'],
    reconnectionAttempts: 15,
});
