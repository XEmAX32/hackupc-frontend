import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3232";

var socket;

function establishConnection() {
  socket = socketIOClient(ENDPOINT, {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionAttempts: 10,
  });
}

function loginUser(userId) {
  socket.emit('register', userId);
}

export { socket, establishConnection, loginUser }
