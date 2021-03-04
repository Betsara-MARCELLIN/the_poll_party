import React from 'react';
import {useState } from "react";
import { Button, FormGroup, Label, Input, FormText} from 'reactstrap';
import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
import schema from "./schema"

const QuestionForm = (props) => {
    const { sendQuestion } = props; //get send question from parent
    const [questionType, setQuestionType] = useState('Libre')
    const [formData, setFormData] = useState({
		question: '',
		reponses: '',
        timer: '',

	});
    const handleChange = (newData) => { setFormData(newData); };
    const handleChangeResponse = (response) => {setFormData({reponses: response});}

    const handleSendQuestion = () => {
        sendQuestion(formData.question, formData.reponses, questionType, formData.timer);
        setFormData({reponses: "", question: ""});
      };

    /**const createAnswer = (event) => {
        if( questionType === "Libre"){
            setResponses(event.target.value)
        }else if (questionType === "QCM"){
            setResponses("5")
        }else{
            setResponses("null")
        }
    }*/

    function displayFormAnswerType(){
        switch(questionType){
            case "Libre":
                return <FormGroup>
                    <Label for="reponses">Réponse</Label>
                    <Field component={Input} type="input" name="reponses" id="reponses" placeholder="Reponse" value={formData.reponses} />
                    <FieldError name="reponses" />
                </FormGroup>
            case "Slider":
                return <FormGroup>
                <Label for="reponses">Réponse</Label>
                <Field component={Input} type="input" name="reponses" id="reponses" placeholder="Reponse" value={formData.reponses} />
                <FieldError name="reponses" />
            </FormGroup>
            case "Photo":
                return
                
            default:
                return 
        }
            
    }

    return (
		<Form
			data={formData}
			onChange={handleChange}
			onSubmit={handleSendQuestion}
			schema={schema}
		>
            <FormGroup>
                <Label for="question">Question</Label>
                <Field component={Input} type="input" name="question" id="question" placeholder="Question" value={formData.question} />
                <FieldError name="question" />
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
            <Button type="submit" color="info">Envoyer</Button>
        </Form>
    );
}

export default QuestionForm;