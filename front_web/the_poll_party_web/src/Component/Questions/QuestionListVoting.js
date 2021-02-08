import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardIcon from "../Card/CardIcon.js";
import CardBody from "../Card/CardBody.js";
import CardFooter from "../Card/CardFooter.js";
import {Row, Col  } from 'reactstrap';


import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

const QuestionListVoting = (props) => {
    const classes = useStyles();

    return(
        <div>
            <h4>Vous êtes actuellement : 6/15 </h4>
            <Row>
                <Col md="3">
                    <Card>
                        <CardHeader icon>
                            <CardIcon color="success">
                                <Icon>1</Icon>
                            </CardIcon>
                            <CardBody>
                                <h4 className={classes.cardTitle}>Question</h4>
                                <p className={classes.cardCategory}>La Capital de la france ?</p>
                            </CardBody>
                        </CardHeader>
                    </Card>
                </Col>
                <Col md="3">
                    <Card>
                        <CardHeader  icon>
                            <CardIcon color="success">
                                <Icon>2</Icon>
                            </CardIcon>
                            <CardBody>
                                <h4 className={classes.cardTitle}>Question</h4>
                                <p className={classes.cardCategory}>La Capital de la france ?</p>
                            </CardBody>
                        </CardHeader>
                    </Card>
                </Col>
                <Col md="3">
                    <Card>
                        <CardHeader icon>
                            <CardIcon color="success">
                                <Icon>3</Icon>
                            </CardIcon>
                            <CardBody>
                                <h4 className={classes.cardTitle}>Question</h4>
                                <p className={classes.cardCategory}>La Capital de la france ?</p>
                            </CardBody>
                        </CardHeader>
                    </Card>
                </Col>
                <Col md="3">
                    <Card>
                        <CardHeader icon>
                            <CardIcon color="success">
                                <Icon>4</Icon>
                            </CardIcon>
                            <CardBody>
                                <h4 className={classes.cardTitle}>Question</h4>
                                <p className={classes.cardCategory}>La Capital de la france ?</p>
                            </CardBody>
                        </CardHeader>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
export default QuestionListVoting;