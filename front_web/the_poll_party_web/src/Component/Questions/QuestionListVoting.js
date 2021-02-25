import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardIcon from "../Card/CardIcon.js";
import CardBody from "../Card/CardBody.js";
import {Row, Col  } from 'reactstrap';


import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

const QuestionListVoting = (props) => {
    const {questionsVoting}= props;
    const classes = useStyles();

    let colorCard = "success";
    return(
        <div>
            <h4>Total de question à voter : {questionsVoting.length}</h4>
            <Row>
            {questionsVoting.slice(1,5).map((questionVoting, i) => (
                <Col md="3" key={i}>
                    <Card>
                        <CardHeader icon>
                            <div className="None">
                                {questionVoting.type === "Order"? colorCard= "info":null}
                                {questionVoting.type === "Responses"? colorCard= "warning":null}
                            </div>
                            <CardIcon color={colorCard}>
                                <Icon>{i+1}</Icon>
                            </CardIcon>
                            <CardBody>
                                <h4 className={classes.cardTitle}>{questionVoting.type}</h4>
                                <p className={classes.cardCategory}>{questionVoting.question}</p>
                            </CardBody>
                        </CardHeader>
                    </Card>
                </Col>
          ))}
            </Row>
        </div>
    );
}
export default QuestionListVoting;