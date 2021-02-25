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
import { version } from "react";
import { Link } from "react-router-dom";

const GameRoom = (props) => {
    const {roomId, publicName} = props.location.query
    const {messages,
        questionsVoting,
        questions,
        competitorRanking,
        publicsRanking,
        responses,
        isClosedQuestion,
        isClosedGame,
        publics,
        competitors,
        sendMessage,
        sendQuestion,
        sendQuestionVotingResult,
        orderQuestionsList,
        orderQuestionsListVote,
        sendResponseVote } = useServer(roomId, publicName); // Creates a websocket and manages 

        if(isClosedGame){
            return <Link to={{ 
                        pathname:`/${roomId}/vizu`,
                        query :{questionList: questions, 
                            responses: responses,
                            publics:publics,
                            competitors: competitors,
                            competitorRanking: competitorRanking,
                            publicRanking: publicsRanking
                        }}} >
                        GO TO VISU
                      </Link>
        }

    return (
        <div>
            <Row>
                <Col md="2" className="Question-list">
                    <QuestionList questions={questions} orderQuestionsList={orderQuestionsList}/>
                </Col>
                <Col md="8" >
                    <h1 className="room-name">Salle: {props.location.query.roomId}</h1>
                    <QuestionListVoting questionsVoting={questionsVoting}/>
                    <QuestionVoting questionsVoting={questionsVoting} sendQuestionVotingResult={sendQuestionVotingResult} orderQuestionsListVote={orderQuestionsListVote} sendResponseVote={sendResponseVote}/>
                    <Row>
                        <Col md="8">
                            <EventsTabs sendQuestion={sendQuestion} isClosedQuestion={isClosedQuestion} />
                        </Col>
                        <Col md="4">
                            <Classement competitorRanking={competitorRanking}/>
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