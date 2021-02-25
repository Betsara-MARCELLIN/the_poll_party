import { useEffect, useRef, useState, version } from "react";
import socketIOClient from "socket.io-client";

const NEW_MESSAGE_EVENT = "newMessage";
const NEW_QUESTIONS = "addQuestions";
const NEW_VOTING_QUESTIONS = "addQuestionsforVoting";
const NEW_VOTING_QUESTIONS_RESPONSE = "addQuestionsforVotingResponse";
const UPDATE_QUESTION = "updateQuestion";
const UPDATE_QUESTIONS_ORDER = "updateQuestionsOrder";
const UPDATE_QUESTIONS_ORDER_VOTING = "updateQuestionsOrderVoting";
const RANKING = "ranking";
const RESPONSES = "responses";
const RESPONSES_VOTING = "responsesVoting";
const SOCKET_SERVER_URL = "http://127.0.0.1:3000";

const useServer = (roomId, publicName) => {
    const [messages, setMessages] = useState([]);
    const [questionsVoting, setQuestionsVoting] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [responses, setResponses] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId, publicName },
        });

        socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);
        });

        socketRef.current.on(NEW_VOTING_QUESTIONS, (questionVoting) => {
            const incomingQuestion = {
                ...questionVoting,
                type : "Question",
            };
            setQuestionsVoting((questionsVoting) => [...questionsVoting, incomingQuestion,]);
        });

        socketRef.current.on(UPDATE_QUESTIONS_ORDER, (questions) => {
            setQuestions(questions);
        });
        
        socketRef.current.on(UPDATE_QUESTIONS_ORDER_VOTING, (questions) => {
            const incomingQuestions = {
                ...questions,
                type : "Order",
            };
            setQuestionsVoting((questionsVoting) => [...questionsVoting, incomingQuestions,]);
        });

        socketRef.current.on(NEW_QUESTIONS, (question) => {
            if (question != "refuse") {
                const incomingQuestion = {
                    ...question[0],
                };
                setQuestions((questions) => [...questions, incomingQuestion]);
            }
        });

        
        socketRef.current.on(UPDATE_QUESTION, (question) => {
            let newQuestions =  questions;
            newQuestions.forEach(quest => {
                if(quest[0].id == question[0].id){
                    quest[0].isDisable = true;
                }
            })
            setQuestions(newQuestions)
        });



        socketRef.current.on(RANKING, (rank) => {
            console.log(rank.ranking[0]);
            let ranks = [];
            rank.ranking.forEach((competitor, i) => {
                const incomingRank = [i + 1, competitor.name, competitor.score];
                ranks.push(incomingRank);
            });
            setRanking(ranks);
        });

        socketRef.current.on(RESPONSES, (userResponses) => {
            if(userResponses[0].type == "Photo"){
                const incomingResponse = {
                    ...userResponses,
                    type : "Responses",
                };
                setQuestionsVoting((ResponsesVoting) => [...ResponsesVoting, incomingResponse,]);
            }
            setResponses(userResponses)
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
        });
    };

    const sendQuestion = (question, responses, type, timer) => {
        socketRef.current.emit(NEW_VOTING_QUESTIONS, {
            question: question,
            answer: responses,
            type: type,
            timer: timer,
            senderId: socketRef.current.id,
        });
    };
    const sendQuestionVotingResult = (vote, questionlist, question) => {
        socketRef.current.emit(NEW_VOTING_QUESTIONS_RESPONSE, {
            question: question,
            vote: vote,
        });
        removeItemOnceFromQuestionsVoting(questionlist, question);
    };
    const orderQuestionsList = (questionsList) =>{
        socketRef.current.emit(UPDATE_QUESTIONS_ORDER, questionsList);
    }
    const orderQuestionsListVote = (vote, questionlist, question) =>{
        socketRef.current.emit(UPDATE_QUESTIONS_ORDER_VOTING, vote);
        removeItemOnceFromQuestionsVoting(questionlist, question);
    }
    const sendResponseVote = (vote, questionlist, question) =>{
        socketRef.current.emit(RESPONSES_VOTING, vote);
        removeItemOnceFromQuestionsVoting(questionlist, question);
    }

    const removeItemOnceFromQuestionsVoting = (arr, value) => {
        var array = [...arr];
        var index = -1;
        if (array[0] != null) {
            array.forEach((element, i) => {
                if (element.id == value.id) {
                    index = element;
                }
            });
        }

        if (index !== -1) {
            array.splice(index, 1);
        }
        setQuestionsVoting(array);
    };
    


    return {
        messages,
        questionsVoting,
        questions,
        ranking,
        responses,
        sendMessage,
        sendQuestion,
        sendQuestionVotingResult,
        orderQuestionsList,
        orderQuestionsListVote,
        sendResponseVote,
    };
};

export default useServer;
