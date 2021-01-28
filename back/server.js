const express = require('express');
const htpp = require('http');
const socketio = require('socket.io');

const app = express();
const server = htpp.createServer(app);
const io = socketio(server);


// Run when client connects
io.on('connection', socket => {

  // Welcome current user
  socket.emit('message', 'You are connected to server');

  // Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the game');

  // Runs when clent disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the game');
  });

});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));