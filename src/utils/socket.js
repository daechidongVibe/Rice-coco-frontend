import io from 'socket.io-client';
import getEnvVars from '../../environment';
const { REACT_NATIVE_SERVER_URL } = getEnvVars();

export default socket = io.connect(REACT_NATIVE_SERVER_URL);
