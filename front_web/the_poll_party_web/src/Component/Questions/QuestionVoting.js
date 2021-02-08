import React from "react";

import {Row, Col  } from 'reactstrap';
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';

import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardIcon from "../Card/CardIcon.js";
import CardBody from "../Card/CardBody.js";
import CardFooter from "../Card/CardFooter.js";


import "./Question.css";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

const QuestionVoting = (props) => {
    const classes = useStyles();
    return(
        <Row>
            <Col md="12">
                <Card>
                    <CardHeader color="info" icon>
                        <CardIcon color="info">
                            <Icon>Voter pour la Question </Icon>
                        </CardIcon>
                        <CardIcon color="warning" className="voting-timer">
                            <Icon>30 s</Icon>
                        </CardIcon>
                        <h3 className={classes.cardTitle}>Quel est la capital de la france ?</h3>
                    </CardHeader>
                    <CardBody>
                        <h4>Type : <span>LIBRE</span> </h4>
                        <h4>Réponse : <span>PARIS</span></h4>
                    </CardBody>
                    <CardFooter stats >
                        <Button className="voting-button-yes" variant="contained" color="primary">Pour</Button>
                        <Button className="voting-button-no" variant="contained" color="secondary">Contre</Button>
                    </CardFooter>
                </Card>
            </Col>
        </Row>
    )
}
export default QuestionVoting;