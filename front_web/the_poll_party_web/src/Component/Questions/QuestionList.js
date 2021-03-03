import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography"
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import ImageIcon from '@material-ui/icons/Image';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import VibrationIcon from '@material-ui/icons/Vibration';

const QuestionList = (props) => {
    const {questions, orderQuestionsList } = props;

    let questionsEnable = [];
    questions.map(question => (
        !question.isDisable? questionsEnable.push(question): null
    ))

    const sendReOrderQuestions = () => {
        orderQuestionsList(questions)
      };

    return(
        <div>
            <h2>Questions</h2>
            <Divider />
            <List>
            {questions.map((question, i) => (
                <Card className={question.isDisable? "question_disable": "question_actived"} variant="outlined">
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                {question.type === "Libre"?  <TextFieldsIcon />: null}
                                {question.type === "Slider"?  <VibrationIcon />: null}
                                {question.type === "Photo"?  <ImageIcon />: null}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={"Question "+(i+1)} secondary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>{question.question}</Typography>} />
                    </ListItem>
                </Card>
            ))}
            </List>
            {questionsEnable.length > 1?<Button variant="contained" size="large" color="primary" onClick={() => {sendReOrderQuestions()}} ><strong>Changer l'ordre des questions</strong></Button>:null}
            
        </div>
    );
}
export default QuestionList;