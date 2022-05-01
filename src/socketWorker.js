import socketIOClient from "socket.io-client";
const ENDPOINT = process.env.REACT_APP_SERVER_ADDRESS;

var socket;

function establishConnection() {
  console.log(process.env.REACT_APP_SERVER_ADDRESS)
  socket = socketIOClient(ENDPOINT, {
    // reconnection: true,
    // reconnectionDelay: 500,
    // reconnectionAttempts: 10,
  });
  console.log('socketing')
}

function loginUser(userId) {
  socket.emit('register', userId);
}

export { socket, establishConnection, loginUser }
