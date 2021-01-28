const express = require("express");
const http = require("http");

const port = process.env.PORT || 3000;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});


const NEW_MESSAGE_EVENT = "newMessage";

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a room
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

 // Listen for new messages
  socket.on(NEW_MESSAGE_EVENT, (data) => {
    console.log(`message dans ${roomId} :  ${data} `);
    io.in(roomId).emit(NEW_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));