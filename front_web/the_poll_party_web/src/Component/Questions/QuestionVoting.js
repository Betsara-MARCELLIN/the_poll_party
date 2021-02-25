import React from "react";
import { useState, useEffect } from "react";

import {Row, Col  } from 'reactstrap';
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';
import Countdown from 'react-countdown';

import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardIcon from "../Card/CardIcon.js";
import CardBody from "../Card/CardBody.js";
import CardFooter from "../Card/CardFooter.js";
import CardMedia from '@material-ui/core/CardMedia';

import "./Question.css";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

const QuestionVoting = (props) => {
    const {questionsVoting, sendQuestionVotingResult, orderQuestionsListVote, sendResponseVote} = props;
    const [vote, setVote] = useState("null");
    const classes = useStyles();

    
    const displayTitle = ()=>{
        if(questionsVoting[0] == null){
            return 
        }
        switch(questionsVoting[0].type_data){
            case "Question":
                return <h3 className={classes.cardTitle}>{questionsVoting[0].question}</h3>
            case "Order":
                return <h3 className={classes.cardTitle}>Voter pour la prochaine question</h3>
            case "Responses":
                return <h3 className={classes.cardTitle}>Voter pour la meilleure réponse</h3>
            default: return
        }
    }

    const displayBody= ()=>{
        if(questionsVoting[0] == null){
            return <h4 className="text-center">En attente d'évènement</h4>
        }

        
        switch(questionsVoting[0].type_data){
            case "Question":
                return <Row className="text-center">
                            <Col md="2"><h4>Type : <span>{questionsVoting[0].type}</span> </h4></Col>
                            <Col md="10"><h4>Réponse : <span>{questionsVoting[0].answer}</span></h4></Col>
                            
                        </Row>
            case "Order":
                return 
            case "Responses":
                return
            default: return
        }

    }

    const displayFooter = ()=>{
        if(questionsVoting[0] == null){
            return 
        }
        switch(questionsVoting[0].type_data){
            case "Question":
                if (vote == "null") {
                    return <CardFooter stats >
                                <Button className="voting-button-yes" variant="contained" color="primary" onClick={() => { handleSetVote(1) }}>Pour</Button>
                                <Button className="voting-button-no" variant="contained" color="secondary" onClick={() => { handleSetVote(-1)}}>Contre</Button>
                            </CardFooter>
                }
                return <h4 className="text-center">A voté !</h4>
            case "Order":
                console.log(questionsVoting[0])
                return  //<Button  variant="contained" color="primary" > Envoyer</Button>
            case "Responses":
                return //<Button  variant="contained" color="primary" > Envoyer</Button>
            default: return <h4 className="text-center">A voté !</h4>
        }

    }
    const handleSetVote = (newVote)=>{
        setVote(newVote);
        sendQuestionVotingResult(newVote,questionsVoting,questionsVoting[0])
        setVote("null")
    }

    const senderResult =() => {
        if(vote == "null"){  
            sendQuestionVotingResult(0,questionsVoting, questionsVoting[0])
        }
        setVote("null")
    }
    const handleSendOrder = (data) =>{
        orderQuestionsListVote(questionsVoting[0][data],questionsVoting,questionsVoting[0])
    }
    const handleSendOResponseVote = (q,u) =>{
        sendResponseVote(q, u,questionsVoting,questionsVoting[0])
    }

    const renderer = ({ seconds, completed }) => {
        if(questionsVoting[0] != null){
            if (completed) {
                return "30";
            } else {
            return (<span>{seconds}</span>);
            }
        }
      };
    
    const renderTimer = () => {
        if(questionsVoting[0] != null){
            return (<Countdown date={Date.now() + 30000} renderer={renderer} /*onComplete={senderResult}*/ />);
        }else 
            return "30"
    }

    useEffect(() => {
        renderTimer();
      });

    return(
        <Row>
            <Col md="12">
                <Card>
                    <CardHeader color="info" icon>
                        <CardIcon color="info">
                            <Icon>Voter pour la Question</Icon>
                        </CardIcon>
                        <CardIcon color="warning" className="voting-timer">
                            <Icon>
                                {renderTimer()}
                            </Icon>
                        </CardIcon>
                        {displayTitle()}
                    </CardHeader>
                    <CardBody>
                    {displayBody()}

                    {questionsVoting[0]? questionsVoting[0].type_data == "Order" ? 
                    <Row>
                        {questionsVoting.map(questions =>{
                            return Object.values(questions).map(question=>{
                                if(question.question){
                                    if(!question.isDisable)
                                        return <Col md="6">
                                                    <Card onClick={() => { handleSendOrder(question.id) }}>
                                                        <CardHeader color="success">
                                                            {question.question}
                                                        </CardHeader>
                                                        <CardBody>
                                                            <Row>
                                                                <Col md="2">
                                                                    {question.type}
                                                                </Col>
                                                                <Col md="10">
                                                                    {question.answer} 
                                                                </Col>
                                                            </Row>
                                                            
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                        
                                }

                            })
                        })}</Row>:<div></div>:<div></div>}

                    {questionsVoting[0]? questionsVoting[0].type_data == "Responses" ? 
                    <Row>
                        {questionsVoting.map(responses =>{
                            return Object.values(responses).map(response=>{
                                if(response.response)
                                return <Col md="6">
                                            <Card onClick={() => {handleSendOResponseVote(response.questionId, response.senderId) }}>
                                                <CardHeader color="success">
                                                    {response.name}
                                                </CardHeader>
                                                <CardBody>
                                                    <img className="media" src={response.response} alt={response.name}/>
                                                </CardBody>
                                            </Card>
                                        </Col>
                            })
                        })}</Row>:<div></div>:<div></div>}
                    </CardBody>
                    {displayFooter()}
                </Card>
            </Col>
        </Row>
    )
}
export default QuestionVoting;