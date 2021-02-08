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
    const {questionVoting, sendQuestionVotingResult} = props;
    const [vote, setVote] = useState("null");
    const classes = useStyles();

    const displayFooter = ()=>{
        if(questionVoting == null){
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
        sendQuestionVotingResult(newVote,questionVoting)
        setVote("null");
    }
    const renderer = ({ seconds, completed }) => {
        if (completed) {
            if(vote == "null"){
                handleSendVote(0);
            }
          return "30";
        } else {
          return (<span>{seconds}</span>);
        }
      };
    
    const renderTimer = () => {
        if(questionVoting != null){
            return (<Countdown date={Date.now() + 30000} renderer={renderer} />);
        }else 
            return "30"
    }

    return(
        <Row>
            <Col md="12">
                <Card>
                    <CardHeader color="info" icon>
                        <CardIcon color="info">
                            <Icon>Voter pour la Question </Icon>
                        </CardIcon>
                        <CardIcon color="warning" className="voting-timer">
                            <Icon>
                                {renderTimer()}
                            </Icon>
                        </CardIcon>
                        <h3 className={classes.cardTitle}>{questionVoting? questionVoting.question:""}</h3>
                    </CardHeader>
                    <CardBody>
                        <h4>Type : <span>{questionVoting? questionVoting.type:""}</span> </h4>
                        <h4>Réponse : <span>{questionVoting? questionVoting.answer:""}</span></h4>
                    </CardBody>
                    {displayFooter()}
                </Card>
            </Col>
        </Row>
    )
}
export default QuestionVoting;