import React from "react";
import {Row, Col  } from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';

import useServer from "../../useServer";
import ChatRoom from "../ChatRoom/ChatRoom";
import QuestionList from "../Questions/QuestionList"
import QuestionListVoting from "../Questions/QuestionListVoting"
import QuestionVoting from "../Questions/QuestionVoting"
import EventsTabs from "../EventsTabs/EventsTabs"
import Classement from "../Classement/Classement"

import "./GameRoom.css";
import 'react-toastify/dist/ReactToastify.css';

const GameRoom = (props) => {
    const { roomId } = props.match.params; // Gets roomId from URL
    const { messages, questionsVoting, questions, ranking, sendMessage, sendQuestion, sendQuestionVotingResult, removeItemOnceFromQuestionsVoting } = useServer(roomId); // Creates a websocket and manages 

    console.log(questionsVoting)
    return (
        <div>
            <Row>
                <Col md="2" className="Question-list">
                    <QuestionList questions={questions}/>
                </Col>
                <Col md="8" >
                    <h1 className="room-name">Room: {roomId}</h1>
                    <QuestionListVoting questionsVoting={questionsVoting}/>
                    <QuestionVoting questionsVoting={questionsVoting} sendQuestionVotingResult={sendQuestionVotingResult} removeItemOnceFromQuestionsVoting={removeItemOnceFromQuestionsVoting} />
                    <Row>
                        <Col md="8">
                            <EventsTabs sendQuestion={sendQuestion} />
                        </Col>
                        <Col md="4">
                            <Classement ranking={ranking}/>
                        </Col>
                    </Row>
                </Col>
                <Col md="2">
                    <ChatRoom messages={messages} sendMessage={sendMessage}/>
                </Col>
            </Row>
            <ToastContainer />
        </div>
    );
};

export default GameRoom;