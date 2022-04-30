import socketIOClient from "socket.io-client";
const ENDPOINT = "https://e526-37-160-157-79.ngrok.io";

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