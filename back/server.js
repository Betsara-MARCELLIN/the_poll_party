const server = require("http").createServer();

const port = process.env.PORT || 3000;
const { type } = require("os");
const index = require("./routes/index");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// imports objects
const Party = require('./app/service/party');
const Public = require('./app/models/public');
const Competitor = require('./app/models/competitor');
const Question = require('./app/models/questions');

const NEW_MESSAGE_EVENT = "newMessage";
const JOIN_ROOM = "joinRoom";
const RESPONSES = "responses";
const NEW_QUESTIONS = "addQuestions";
const RANKING = "ranking";

//PERSISTENCE
const party = new Party();


io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a room
  let { roomId } = socket.handshake.query;
  if (roomId) {
    socket.join(roomId);
    party.publics.push(new Public(socket.id, `public${party.competitors.length}`, "PUBLIC", roomId));
  }

  // Join a room from mobile
  socket.on(JOIN_ROOM, (room) => {
    roomId = room;
    socket.join(roomId);
    party.competitors.push(new Competitor(socket.id, `competitor${party.competitors.length}`, "COMPETITOR", roomId, 0));
  });

  // add last questions and send them to all competitors
  socket.on(NEW_QUESTIONS, (data) => {
    party.questions.push(new Question(data.question, data.responses, data.type, data.timer, socket.id));
    party.competitors.forEach( competitor => {
      io.sockets.socket(competitor.id).emit(party.questions[party.questions.length - 1]);
    });
  });

  // add response and get points
  socket.on(RESPONSES, (data) => {
    //check answer and add point
    if(data) {
      party.competitors.forEach( c => {if(c.id === socket.id) c.score += 1;});
    };
  });

  // Listen for ranking
  socket.on(RANKING, () => {
    //TODO
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