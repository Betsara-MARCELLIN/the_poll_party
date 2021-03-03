import React from "react";
import {Row, Col  } from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';

import useServer from "../../useServer";
import ChatRoom from "../ChatRoom/ChatRoom";
import ResponsesRoom from "../ResponsesRoom/ResponsesRoom";
import QuestionList from "../Questions/QuestionList"
import QuestionListVoting from "../Questions/QuestionListVoting"
import QuestionVoting from "../Questions/QuestionVoting"
import EventsTabs from "../EventsTabs/EventsTabs"
import Classement from "../Classement/Classement"


import "./GameRoom.css";
import 'react-toastify/dist/ReactToastify.css';

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



    return (
        <div>
            <Row>
                <Col md="2" className="Question-list">
                    <QuestionList questions={questions} orderQuestionsList={orderQuestionsList} competitorLenght={competitorRanking.length}/>
                </Col>
                <Col md="9" >
                    <h1 className="room-name">Salle: {props.location.query.roomId}</h1>
                    {!isClosedGame || questionsVoting[0] != null?
                        <div>
                        <QuestionListVoting questionsVoting={questionsVoting}/>
                        <QuestionVoting questionsVoting={questionsVoting} sendQuestionVotingResult={sendQuestionVotingResult} orderQuestionsListVote={orderQuestionsListVote} sendResponseVote={sendResponseVote}/>
                        <Row>
                            <Col md="8">
                                <EventsTabs sendQuestion={sendQuestion} isClosedQuestion={isClosedQuestion} />
                            </Col>
                            <Col md="4">
                                <Classement users={competitorRanking} name="Classement"/>
                            </Col>
                        </Row>
                        </div>
                        :
                        <Link to={{ 
                            pathname:`/${roomId}/vizu`,
                            query :{roomId:roomId,
                                questionList: questions, 
                                responses: responses,
                                publics:publics,
                                competitors: competitors,
                                competitorRanking: competitorRanking,
                                publicRanking: publicsRanking
                            }}} className="visu-room-button">
                                Voir le récapitulatif de la partie
                        </Link> }  
                        <ChatRoom messages={messages} sendMessage={sendMessage}/>
                        <ResponsesRoom questions={questions} responses={responses} />
                </Col>
            </Row>
            <ToastContainer />
        </div>
    );
};

export default GameRoom;