import React from "react";
import {Row, Col  } from 'reactstrap';

import useServer from "../../useServer";
import ChatRoom from "../ChatRoom/ChatRoom";
import QuestionForm from "../QuestionForm/QuestionForm"

import "./GameRoom.css";

const GameRoom = (props) => {
    const { roomId } = props.match.params; // Gets roomId from URL
    const { messages, sendMessage, sendQuestion } = useServer(roomId); // Creates a websocket and manages 

    return (
        <div>
            <Row>
                <Col sm="2" class='bg'>
                    <strong>Question list</strong>
                </Col>
                <Col sm="8">
                    <h1 className="room-name">Room: {roomId}</h1>
                    <QuestionForm sendQuestion={sendQuestion}/>
                </Col>
                </Row>
                <Row>
                <Col sm="2">
                    <ChatRoom messages={messages} sendMessage={sendMessage}/>
                </Col>
            </Row>
        </div>
    );
};

export default GameRoom;