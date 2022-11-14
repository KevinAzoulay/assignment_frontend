import socketIO from 'socket.io-client';

export var socketManager = null;
socketManager = socketIO(process.env.REACT_APP_API_URL);

socketManager.connect();