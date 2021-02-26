import React from "react";
import {Row, Col  } from 'reactstrap';

import UserList from "./UserList"
import QuestionResponses from "./QuestionResponse"

import "./VizuRoom.css"
const VizuRoom = (props) => {
    const {roomId,
        questionList,
        responses,
        publics,
        competitors,
        competitorRanking,
        publicRanking} = props.location.query

    return (
        <div>
            <Row>
                <Col md="2" className="user_list_container publics">
                    <UserList users={publics} userType="Publics" />
                </Col>
                <Col md="8" className="visualisation">
                    <h1 className="room-name">Déroulement de la partie pour la salle : {roomId}</h1>
                    <QuestionResponses questionList={questionList} responses={responses} competitorRanking={competitorRanking} publicRanking={publicRanking} />
                </Col>
                <Col md="2" className="user_list_container competitors">
                    <UserList users={competitors} userType="Competiteurs" />
                </Col>
            </Row>
        </div>
    );
    
}

export default VizuRoom;