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
      setQuestionsVoting((questionsVoting) => [...questionsVoting, incomingQuestion]);
    });

    socketRef.current.on(NEW_QUESTIONS, (question) => {
      if(question != "refuse"){
        const incomingQuestion = {
          ...question,
        };
        setQuestions((questions) => [...questions, incomingQuestion]);
      }
    });

    socketRef.current.on(RANKING, (rank) => {
      setRanking(rank);
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
    
  };

  const removeItemOnceFromQuestionsVoting = (arr, value) => {
    let index = -1;
    console.log (arr)
    if (arr[0] != null){
      arr.forEach((element,i) => {
        if(element.id == value.id){
          index= i;
        }
      });
    }

    if (index > -1) {
      arr.splice(index, 1);
    }
    setQuestionsVoting(arr);
  };

  return { messages, questionsVoting, questions, ranking, sendMessage, sendQuestion, sendQuestionVotingResult, removeItemOnceFromQuestionsVoting};
};

export default useServer;