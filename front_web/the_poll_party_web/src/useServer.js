import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_MESSAGE_EVENT = "newMessage";
const NEW_QUESTIONS = "addQuestions";
const NEW_VOTING_QUESTIONS = "addQuestionsforVoting";
const NEW_VOTING_QUESTIONS_RESPONSE = "addQuestionsforVotingResponse";
const RANKING = "ranking";
const SOCKET_SERVER_URL = "http://127.0.0.1:3000";

const useServer = (roomId) => {
    const [messages, setMessages] = useState([]);
    const [questionsVoting, setQuestionsVoting] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [ranking, setRanking] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
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
            };
            setQuestionsVoting((questionsVoting) => [
                ...questionsVoting,
                incomingQuestion,
            ]);
        });

        socketRef.current.on(NEW_QUESTIONS, (question) => {
            if (question != "refuse") {
                const incomingQuestion = {
                    ...question,
                };
                setQuestions((questions) => [...questions, incomingQuestion]);
            }
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
        sendMessage,
        sendQuestion,
        sendQuestionVotingResult,
    };
};

export default useServer;
