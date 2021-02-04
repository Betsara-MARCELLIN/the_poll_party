import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_MESSAGE_EVENT = "newMessage";
const NEW_QUESTIONS = "addQuestions";
const SOCKET_SERVER_URL = "http://127.0.0.1:3000";

const useServer = (roomId) => {
  const [messages, setMessages] = useState([]);
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
    socketRef.current.emit(NEW_QUESTIONS, {
      question: question,
      responses: responses,
      type: type,
      timer: timer,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage, sendQuestion};
};

export default useServer;