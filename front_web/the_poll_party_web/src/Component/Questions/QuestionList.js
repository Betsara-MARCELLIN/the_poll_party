import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography"

const QuestionList = (props) => {
    const { questions } = props;

    return(
        <div>
            <h2>Questions</h2><hr/>
            {questions.slice(0,4).map((question, i) => (
            <List>
                <ListItem>
                    <ListItemText primary={"Question "+(i+1)} secondary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>{question[0].question}</Typography>} />
                </ListItem>
            </List>
            ))}
        </div>
    );
}
export default QuestionList;