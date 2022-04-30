import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.223.145:3232";

function establishConnection() {
  const socket = socketIOClient(ENDPOINT, {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: 10,
  });

  return socket;
}

function loginUser(socket, userId) {
  return new Promise((resolve, reject) => {
    socket.emit('register', {userId});

    resolve();
  });
}

export { establishConnection, loginUser }