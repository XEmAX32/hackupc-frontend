import socketIOClient from "socket.io-client";
const ENDPOINT = "https://68da-37-163-17-14.ngrok.io";

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