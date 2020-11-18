import io from 'socket.io-client';
import getEnvVars from './environment';

const { REACT_NATIVE_ANDROID_SERVER_URL } = getEnvVars();

export const socket = io.connect(REACT_NATIVE_ANDROID_SERVER_URL, {
  transports: ['websocket'],
});

export const socketApi = {
  joinMeeting: (meetingId, userId) => {
    socket.emit('join meeting', { meetingId, userId });
  },
  cancelMeeting: meetigId => {
    socket.emit('cancel meeting', meetigId);
  },
  changeLocation: (location, meetigId) => {
    socket.emit('change location', { location, meetigId });
  },
  endMeeting: meetingId => {
    socket.emit('end meeting', meetingId);
  },
};
