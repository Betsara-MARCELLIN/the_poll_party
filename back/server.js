// const express = require("express");
const server = require("http").createServer();

const port = process.env.PORT || 3000;
const index = require("./routes/index");

// const app = express();
// app.use(index);

// const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});


const NEW_MESSAGE_EVENT = "newMessage";
const JOIN_ROOM = "joinRoom";

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);


  // Join a room
  let { roomId } = socket.handshake.query;
  if (roomId) {
    socket.join(roomId);
  }

  // Join a room from mobile
  socket.on(JOIN_ROOM, (room) => {
    roomId = room;
    socket.join(roomId);
    io.to(roomId).emit("newMessage", {
      'senderId': socket.id,
      'body': "" + socket.id + " joined the room " + roomId
    });
  });

  // Listen for new messages
  socket.on(NEW_MESSAGE_EVENT, (data) => {
    console.log(`message dans ${roomId} :  ${data.body} `);
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