import React from "react";
import { useState } from "react";

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



import "./Question.css";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

const QuestionVoting = (props) => {
    const {questionsVoting, sendQuestionVotingResult, removeItemOnceFromQuestionsVoting} = props;
    const [vote, setVote] = useState("null");
    const classes = useStyles();

    const displayFooter = ()=>{
        if(questionsVoting[0] == null){
            return <h4 className="text-center">En attente de question</h4>
        }
        
        if (vote == "null") {
            return <CardFooter stats >
                <Button className="voting-button-yes" variant="contained" color="primary" onClick={() => { handleSendVote(1) }}>Pour</Button>
                <Button className="voting-button-no" variant="contained" color="secondary" onClick={() => { handleSendVote(-1)}}>Contre</Button>
            </CardFooter>
        }else {
            return <h4 className="text-center">A voté !</h4>
        }

    }
    const handleSendVote = (newVote)=>{
        setVote(newVote);
    }
    const renderer = ({ seconds, completed }) => {
        if(questionsVoting[0] != null){
            if (completed) {
                if(vote != "null"){
                    sendQuestionVotingResult(vote,questionsVoting[0])
                    
                }else{
                    sendQuestionVotingResult(0,questionsVoting[0])
                }
                removeItemOnceFromQuestionsVoting(questionsVoting,questionsVoting[0]);
                setVote("null")
            return "30";
            } else {
            return (<span>{seconds}</span>);
            }
        }
      };
    
    const renderTimer = () => {
        if(questionsVoting[0] != null){
            return (<Countdown date={Date.now() + 5000} renderer={renderer} />);
        }else 
            return "30"
    }

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
                        <h3 className={classes.cardTitle}>{questionsVoting[0]? questionsVoting[0].question:""}</h3>
                    </CardHeader>
                    <CardBody>
                        <h4>Type : <span>{questionsVoting[0]? questionsVoting[0].type:""}</span> </h4>
                        <h4>Réponse : <span>{questionsVoting[0]? questionsVoting[0].answer:""}</span></h4>
                    </CardBody>
                    {displayFooter()}
                </Card>
            </Col>
        </Row>
    )
}
export default QuestionVoting;