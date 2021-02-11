const server = require("http").createServer();

const port = process.env.PORT || 3000;
const { type } = require("os");
const index = require("./routes/index");

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

// Imports
const Party = require("./app/service/party");
const Public = require("./app/models/public");
const Competitor = require("./app/models/competitor");
const Question = require("./app/models/question");

// Topics
const NEW_MESSAGE_EVENT = "newMessage";
const JOIN_ROOM = "joinRoom";
const RESPONSES = "responses";
const NEW_QUESTIONS = "addQuestions";
const NEW_VOTING_QUESTIONS = "addQuestionsforVoting";
const NEW_VOTING_QUESTIONS_RESPONSE = "addQuestionsforVotingResponse";
const RANKING = "ranking";
const PARTY_CONNECTIONS = "partyConnections";

// PERSISTENCE
const party = new Party();

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);

    // Join a room
    let { roomId } = socket.handshake.query;
    if (roomId) {
        socket.join(roomId);
        party.publics.push(
            new Public(socket.id, `public${party.publics.length}`, roomId)
        );

        InformRoomConnections(roomId);
    }

    // Join a room from mobile
    socket.on(JOIN_ROOM, (data) => {
        roomId = data.roomId;
        socket.join(roomId);
        party.competitors.push(
            new Competitor(socket.id, data.playerName, data.roomId)
        );

        InformRoomConnections(roomId);
        io.in(roomId).emit(RANKING, {
            ranking: party.getRankedCompetitorsOfRoom(roomId),
        });
    });

    // send question for voting to the publics
    socket.on(NEW_VOTING_QUESTIONS, (data) => {
        let questionId = party.questionsVoting.length;
        party.questionsVoting.push(
            new Question(
                questionId,
                data.question,
                data.answer,
                data.type,
                data.timer,
                socket.id,
                roomId
            )
        );
        io.in(roomId).emit(
            NEW_VOTING_QUESTIONS,
            party.getQuestionsforVotingOfRoom(roomId)[
                party.getQuestionsforVotingOfRoom(roomId).length - 1
            ]
        );
    });

    // send question for voting to the publics
    socket.on(NEW_VOTING_QUESTIONS_RESPONSE, (data) => {
        let questionVoting = party.getQuestionsforVotingByID(
            roomId,
            data.question.id
        );
        switch (data.vote) {
            case 0:
                questionVoting[0].neutral++;
                break;
            case 1:
                questionVoting[0].yes++;
                break;
            case -1:
                questionVoting[0].no++;
                break;
        }
        let totalVote =
            questionVoting[0].neutral +
            questionVoting[0].no +
            questionVoting[0].yes;
        if (totalVote == party.publics.length) {
            if (questionVoting[0].no < questionVoting[0].yes) {
                io.in(roomId).emit(NEW_QUESTIONS, questionVoting);
            } else {
                party.publics.forEach((public) => {
                    socket.broadcast
                        .to(public.id)
                        .emit(NEW_QUESTIONS, "refuse");
                });
            }
        }
    });

    // add response and get points
    socket.on(RESPONSES, (data) => {
        //check answer and add point
        if (data) {
            party.competitors.forEach((c) => {
                if (c.id === socket.id) {
                    c.score += 1;
                    console.log(c.name + " : " + c.score);
                }
            });
        }
        io.in(roomId).emit(RANKING, {
            ranking: party.getRankedCompetitorsOfRoom(roomId),
        });
    });

    // Listen to connections
    socket.on(PARTY_CONNECTIONS, (data) => {
        // TODO handle game starts when game ready
    });

    // Listen for ranking
    socket.on(RANKING, () => {
        //
    });

    // Listen for new messages
    socket.on(NEW_MESSAGE_EVENT, (data) => {
        console.log(`message dans ${roomId} :  ${data.body} `);
        io.in(roomId).emit(NEW_MESSAGE_EVENT, data);
    });

    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} diconnected`);

        // Remove disconnected player : public or competitor
        party.competitors = party.competitors.filter((c) =>
            c.id.localeCompare(socket.id)
        );
        party.publics = party.publics.filter((p) =>
            p.id.localeCompare(socket.id)
        );

        InformRoomConnections(roomId);

        socket.leave(roomId);
    });
});

// Since party is used by all rooms, we need to filter data according to the corresponding room
const InformRoomConnections = (roomId) => {
    console.log(party);
    io.in(roomId).emit(PARTY_CONNECTIONS, {
        publics: party.getPublicsOfRoom(roomId),
        competitors: party.getCompetitorsOfRoom(roomId),
    });
};

const getApiAndEmit = (socket) => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));
