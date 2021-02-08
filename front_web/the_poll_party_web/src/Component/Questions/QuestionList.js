import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography"

const QuestionList = (props) => {

    return(
        <div>
            <h2>Question list</h2>
            <List>
                <ListItem>
                    <ListItemText primary="QUESTIONS 1" secondary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>Quel est la hauteur de la tour effel?</Typography>} />
                </ListItem>
                <ListItem>
                <ListItemText primary="QUESTIONS 1" secondary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>Quel est la hauteur de la tour effel?</Typography>} />
                </ListItem>
                <ListItem>
                <ListItemText primary="QUESTIONS 1" secondary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>Quel est la hauteur de la tour effel?</Typography>} />
                </ListItem>
                <ListItem>
                <ListItemText primary="QUESTIONS 1" secondary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>Quel est la hauteur de la tour effel?</Typography>} />
                </ListItem>
                <ListItem>
                <ListItemText primary="QUESTIONS 1" secondary={<Typography variant="body2" style={{ color: '#FFFFFF' }}>Quel est la hauteur de la tour effel?</Typography>} />
                </ListItem>

            </List>
        </div>
    );
}
export default QuestionList;