import io from 'socket.io-client';
import getEnvVars from './environment';

const { REACT_NATIVE_ANDROID_SERVER_URL } = getEnvVars();

export const socket = io.connect(REACT_NATIVE_ANDROID_SERVER_URL, {
  transports: ['websocket'],
});

export const socketApi = {
  removeAllListeners: () => {
    socket.removeAllListeners()
  },
  joinMeeting: (meetingId, userId) => {
    socket.emit('join meeting', { meetingId, userId });
  },
  sendMessage: (userId, message, callback) => {
    socket.emit('send message', { userId, message}, callback);
  },
  cancelMeeting: (meetigId, callback) => {
    socket.emit('cancel meeting', meetigId, callback);
  },
  changeLocation: (location, meetigId) => {
    socket.emit('change location', { location, meetigId });
  },
  breakupMeeting: (meetingId, callback) => {
    socket.emit('breakup meeting', meetingId, callback);
  },
  endMeeting: meetingId => {
    socket.emit('end meeting', meetingId);
  },
  arriveMeeting: meetingId => {
    socket.emit('arrive meeting', meetingId);
  },
  leaveMeeting: (meetingId, callback) => {
    socket.emit('leave meeting', meetingId, callback);
  },
};
