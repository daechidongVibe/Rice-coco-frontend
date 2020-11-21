import io from 'socket.io-client';
import getEnvVars from './environment';

const { REACT_NATIVE_ANDROID_SERVER_URL } = getEnvVars();

export const socket = io.connect(REACT_NATIVE_ANDROID_SERVER_URL, {
  transports: ['websocket'],
});

export const socketApi = {
  removeAllListeners: () => {
    socket.removeAllListeners();
  },
  joinMeeting: (meetingId, userId, userNickname) => {
    socket.emit('join meeting', { meetingId, userId, userNickname });
  },
  sendMessage: (userId, message, callback) => {
    socket.emit('send message', { userId, message }, callback);
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
  endMeeting: (meetingId, callback) => {
    socket.emit('end meeting', meetingId, callback);
  },
  arriveMeeting: (meetingId, userNickname) => {
    socket.emit('arrive meeting', {meetingId, userNickname} );
  },
  leaveMeeting: (meetingId, callback) => {
    socket.emit('leave meeting', meetingId, callback);
  },
};
