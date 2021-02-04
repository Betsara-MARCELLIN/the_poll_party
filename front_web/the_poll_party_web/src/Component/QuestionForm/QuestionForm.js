import React from 'react';
import {useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col} from 'reactstrap';

const QuestionForm = (props) => {
    const { sendQuestion } = props; //get send question from parent
    const [question, setQuestion] = useState("");
    const [reponses, setResponses] = useState("");
    const [questionType, setQuestionType] = useState("Libre");
    const [timer, setTimer] = useState("");

    const handleSendQuestion = () => {
        setTimer(30);
        sendQuestion(question, reponses,questionType,timer);
        setQuestion("");
        setResponses("");
      };

    const createAnswer = (event) => {
        if( questionType === "Libre"){
            setResponses(event.target.value)
        }else if (questionType === "QCM"){
            setResponses("5")
        }else{
            setResponses("null")
        }
    }
    function displayFormAnswerType(){
        switch(questionType){
            case "Libre":
                return <FormGroup>
                    <Label for="textlibre">Réponse</Label>
                    <Input required type="text" name="textlibre" id="textlibre" placeholder="Reponse" onChange={createAnswer} value={reponses}/>
                </FormGroup>
            case "QCM":
                return <div>
                        <FormGroup>
                            <Label for="qcmtext_1">Réponses</Label>
                            <Row>
                                <Col>
                                    <Input required type="text" name="qcmtext_1" id="qcmtext_1" placeholder="Reponse A" onChange={createAnswer}/>
                                </Col>
                                <Col>
                                    <Input required type="text" name="qcmtext_2" id="qcmtext_2" placeholder="Reponse B" onChange={createAnswer} />
                                </Col>
                            </Row>
                            <Row>
                                <Col><Input required type="text" name="qcmtext_3" id="qcmtext_3" placeholder="Reponse C" onChange={createAnswer}/></Col>
                                <Col><Input required type="text" name="qcmtext_4" id="qcmtext_4" placeholder="Reponse D" onChange={createAnswer}/></Col>
                            </Row>
                            
                        </FormGroup>
                        <FormGroup>
                            <Label for="qcmRightAnswer">Selectionner la bonne réponse</Label>
                            <Input type="select" name="qcmRightAnswer" id="qcmRightAnswer" onChange={createAnswer}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Input>
                        </FormGroup>
                    </div>
            default:
                return
        }
            
    }

    return (
        <Form>
            <FormGroup>
                <Label for="question">Question</Label>
                <Input required type="text" name="question" id="question" placeholder="Question" value={question} onChange={(event)=> {setQuestion(event.target.value)}}/>
            </FormGroup>
            <FormGroup>
                <Label for="image">Image ( optionnel )</Label>
                <Input type="file" name="image" id="image" />
                <FormText color="muted">
                    <div>
                        Image coupler a la question
                    </div>
                </FormText>
            </FormGroup>
            <FormGroup>
                <Label for="questionType">Type de question</Label>
                <Input required type="select" name="questionType" id="questionType" onChange={(event)=> {setQuestionType(event.target.value)}}>
                    <option value="Libre">Libre</option>
                    <option value="QCM">QCM</option>
                    <option value="Slider">Slider(shake)</option>
                    <option value="Photo">Photo</option>
                    <option value="Dessins">Dessins</option>
                </Input>
            </FormGroup>
            {displayFormAnswerType()}
            <Button onClick={handleSendQuestion} >Submit</Button>
        </Form>
    );
}

export default QuestionForm;