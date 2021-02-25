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
const CompetitorResponse = require("./app/models/competitorResponse");

// Topics
const NEW_MESSAGE_EVENT = "newMessage";
const JOIN_ROOM = "joinRoom";
const RESPONSES = "responses";
const NEW_QUESTIONS = "addQuestions";
const NEW_VOTING_QUESTIONS = "addQuestionsforVoting";
const NEW_VOTING_QUESTIONS_RESPONSE = "addQuestionsforVotingResponse";
const UPDATE_QUESTION = "updateQuestion";
const UPDATE_QUESTIONS_ORDER = "updateQuestionsOrder";
const UPDATE_QUESTIONS_ORDER_VOTING = "updateQuestionsOrderVoting";
const RANKING = "ranking";
const PARTY_CONNECTIONS = "partyConnections";

// PERSISTENCE
const party = new Party();

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);

    // Join a room
    let { roomId, publicName } = socket.handshake.query;
    if (roomId) {
        socket.join(roomId);
        party.publics.push(
            new Public(socket.id, publicName, roomId)
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
            let publicUser = null
            party.publics.forEach((public) => {
                if(public.id == questionVoting[0].senderId ){
                    publicUser = public
                }
            })

            if (questionVoting[0].no < questionVoting[0].yes) {
                io.in(roomId).emit(NEW_QUESTIONS, questionVoting);
                party.questions.push(...questionVoting);
                publicUser.score += 10
            } else {
                party.publics.forEach((public) => {
                    socket.broadcast
                        .to(public.id)
                        .emit(NEW_QUESTIONS, "refuse");
                });
                publicUser.score -= 5
            }
        }
    });

    // add response and get points
    socket.on(RESPONSES, (data) => {
        //check answer and add point accordingly
        console.log(data);
        let userName = null
        if (data) {
            party.competitors.forEach((c) => {
                if (c.id === socket.id) {
                    userName = c.name
                    if(data.type.localeCompare('Photo')) {
                        console.log("photo waiting for vote");
                    } else {
                        const q = party.questions.find(
                            (e) => e.id === data.questionId
                        );
                        if (
                            data.response
                                .toLowerCase()
                                .localeCompare(q.answer.toLowerCase())
                        )
                            c.score += 10;
                        console.log(c.name + " : " + c.score);
                    }
                }
            });
        }

        const r = new CompetitorResponse(data.questionId, data.response, data.type, socket.id, userName, roomId);

        //send ranking to room
        io.in(roomId).emit(RANKING, {
            ranking: party.getRankedCompetitorsOfRoom(roomId),
        });

        //save answer 
        party.competitorResponses.push(r);
        
        //add counter responses
        let question = party.getQuestionOfRoom(roomId, data.questionId);
        question[0].nbResponses++;

        //fix question index
        if(question[0].nbResponses > 1){
            question[0].isDisable = true;
            io.in(roomId).emit(UPDATE_QUESTION, question);
        }
         //send answer to competitors
        if(question[0].nbResponses == party.competitors.length){
            let responses = party.getCompetitorResponsesOfRoomForQuestion(roomId, data.questionId)
            io.in(roomId).emit(RESPONSES, responses);
        }

    });

    socket.on(UPDATE_QUESTIONS_ORDER, (data) => {
        io.in(roomId).emit(UPDATE_QUESTIONS_ORDER_VOTING, party.questions);
    });

    socket.on(UPDATE_QUESTIONS_ORDER_VOTING, (question) => {
        let questionVoting = party.getQuestionOfRoom(roomId,question.id);
        questionVoting[0].nbVoteOrder++
        party.nbVoteCounter++
        
        if(party.nbVoteCounter == party.publics.length){
            let newOrder = party.getQuestionOfRoomSortByVote(roomId)

            io.in(roomId).emit(UPDATE_QUESTIONS_ORDER, newOrder);
            
            party.setVoteCounter(0)
            party.questions.forEach(question =>{
                question.nbVoteOrder = 0
            })
        }

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
