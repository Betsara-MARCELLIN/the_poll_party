import React from "react";
import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {Row, Col  } from 'reactstrap';
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';

import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardIcon from "../Card/CardIcon.js";
import CardBody from "../Card/CardBody.js";
import CardFooter from "../Card/CardFooter.js";

import Classement from "../Classement/Classement"


import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import { Divider } from "@material-ui/core";
const useStyles = makeStyles(styles);

const QuestionResponses = (props) => {
    const {questionList, responses, competitorRanking, publicRanking} = props
    const classes = useStyles();
    const history = useHistory();
    const [questionCounter, setQuestionCounter] = useState({value: 0,});
    const [responsesForQuestion, setResponsesForQuestion] = useState([])

    
    const handleQuit = useCallback(() => history.push('/'), [history]);
    const handleQuestionCounter = (index)=> {setQuestionCounter({value : questionCounter.value+index})}



    const displayFooter = ()=>{
        if (questionCounter.value == 0){
            return <CardFooter stats >
                        <Button className="button_next_alone"variant="contained" color="primary" onClick={() => { handleQuestionCounter(1)}}>Suivante</Button>
                    </CardFooter>
        }
        if(questionCounter.value == Object.values(questionList).length){
            return <CardFooter stats >
                        <Button className="button-prev" variant="contained" color="primary" onClick={() => {handleQuestionCounter(-1) }}>Précedente </Button>
                        <Button className="button-next" variant="contained" color="secondary" onClick={() => {handleQuit() }}>Quitter</Button>
                    </CardFooter>
        }
        return <CardFooter stats >
                    <Button className="button-prev" variant="contained" color="primary" onClick={() => {handleQuestionCounter(-1) }}>Précedente </Button>
                    <Button className="button-next" variant="contained" color="primary" onClick={() => {handleQuestionCounter(1) }}>Suivante</Button>
                </CardFooter>
        
    }
    console.log(responses.filter(r => r.questionId === questionList[questionCounter.value].id))
return(
    <Row>
        <Col md="12">
            {questionCounter.value == Object.values(questionList).length?
            <Card>
                <CardHeader color="info" icon>
                    <CardIcon color="info">
                        <Icon>Classement des participants</Icon>
                    </CardIcon>
                </CardHeader>
            <Row>
                <Col md="6">
                    <Classement users={publicRanking} name="Publics"/>
                </Col>
                <Col md="6">
                    <Classement users={competitorRanking} name="Compétiteurs"/>
                </Col>
            </Row>
            {displayFooter()}
            </Card>
            
            :
            <Card>
            <CardHeader color="info" icon>
                <CardIcon color="info">
                    <Icon>Resultat de la Question</Icon>
                </CardIcon>
                <h3 className={classes.cardTitle}>{questionList[questionCounter.value].question}</h3>
            </CardHeader>
            <CardBody>
                <Row className="text-center">
                    <Col md="2"><h4>Type : <span>{questionList[questionCounter.value].type}</span> </h4></Col>
                    <Col md="10"><h4>Réponse : <span>{questionList[questionCounter.value].answer}</span></h4></Col>
                </Row>
                <Divider />
                <Row>
                    {responses.filter(r => r.questionId === questionList[questionCounter.value].id).map(responses =>{
                        return Object.values(responses).map(response=>{
                            console.log(response)
                            if(response.type == "Photo"){
                                return <Col md="6">
                                            <Card>
                                                <CardHeader color="success">
                                                    {response.name}
                                                </CardHeader>
                                                <CardBody>
                                                    <img className="media" src={response.response} alt={response.name}/>
                                                </CardBody>
                                            </Card>
                                        </Col>
                            }else{
                                return <Col md="6">
                                            <Card>
                                                <CardHeader color="success">
                                                    {response.name}
                                                </CardHeader>
                                                <CardBody>
                                                    {response.response}
                                                </CardBody>
                                            </Card>
                                        </Col>
                            }   
                        })
                    })}
                </Row>
            </CardBody>
            {displayFooter()}
        </Card>
            }

        </Col>
    </Row>
)
}
export default QuestionResponses;