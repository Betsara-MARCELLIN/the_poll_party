import React from "react";
import {Row, Col  } from 'reactstrap';

import { makeStyles } from "@material-ui/core/styles";

import useServer from "../../useServer";
import ChatRoom from "../ChatRoom/ChatRoom";
import QuestionList from "../Questions/QuestionList"
import QuestionListVoting from "../Questions/QuestionListVoting"
import QuestionVoting from "../Questions/QuestionVoting"
import EventsTabs from "../EventsTabs/EventsTabs"
import Classement from "../Classement/Classement"

import "./GameRoom.css";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

const GameRoom = (props) => {
    const { roomId } = props.match.params; // Gets roomId from URL
    const { messages, sendMessage, sendQuestion } = useServer(roomId); // Creates a websocket and manages 
    const classes = useStyles(); 

    return (
        <div>
            <Row>
                <Col md="2" className="Question-list">
                    <QuestionList />
                </Col>
                <Col md="8" >
                    <h1 className="room-name">Room: {roomId}</h1>
                    <QuestionListVoting />
                    <QuestionVoting />
                    <Row>
                        <Col md="8">
                            <EventsTabs sendQuestion={sendQuestion} />
                        </Col>
                        <Col md="4">
                            <Classement />
                        </Col>
                    </Row> 
                </Col>
                <Col md="2">
                    <ChatRoom messages={messages} sendMessage={sendMessage}/>
                </Col>
            </Row>
        </div>
    );
};

export default GameRoom;