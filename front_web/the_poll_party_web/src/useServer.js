import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_MESSAGE_EVENT = "newMessage";
const NEW_VOTING_QUESTIONS = "addQuestionsforVoting";
const NEW_VOTING_QUESTIONS_RESPONSE = "addQuestionsforVotingResponse";
const RANKING = "ranking";
const SOCKET_SERVER_URL = "http://127.0.0.1:3000";

const useServer = (roomId) => {
  const [messages, setMessages] = useState([]);
  const [questionVoting, setQuestionVoting] = useState(null);
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

    socketRef.current.on(NEW_VOTING_QUESTIONS, (question) => {
      setQuestionVoting(question);
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

  const sendQuestion = (question,responses,type,timer) => {
    socketRef.current.emit(NEW_VOTING_QUESTIONS, {
      question: question,
      answer: responses,
      type: type,
      timer: timer,
      senderId: socketRef.current.id,
    });
  };
  const sendQuestionVotingResult = (vote, question) => {
    socketRef.current.emit(NEW_VOTING_QUESTIONS_RESPONSE, {
      question: question,
      vote: vote,
    });
    setQuestionVoting(null);
  };

  return { messages, questionVoting, sendMessage, sendQuestion,sendQuestionVotingResult};
};

export default useServer;