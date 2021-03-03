import React from "react";
import Fade from '@material-ui/core/Fade';
import ToggleButton from '@material-ui/lab/ToggleButton';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import "./ResponsesRoom.css";
import { Divider } from "@material-ui/core";

const ResponsesRoom = (props) => {
  const {questions, responses } = props; // Gets messages, sendMessage from parents
  const [checked, setChecked] = React.useState(false);


  return (<div>
            <ToggleButton className="responses-room-toogle-button" selected={checked} onChange={() => {setChecked(!checked);}}>
              <DoneAllIcon />
            </ToggleButton>
            <Fade in={checked}>
            <div className="responses-room-container">
              <div className="responses-container">
                  {responses[0]?<h3>{questions.find(question => question.id === responses[0].questionId).question}</h3>: <h3>Pas de réponse pour le moment</h3> }
                <div className="responses-list"> <br />
                  {responses.map((response, i) => (
                      <CardHeader color="info">
                      {response.name} : {response.response}
                  </CardHeader>
                  ))}
                </div>
              </div>
            </div>
            </Fade>
        </div>
    
  );
};

export default ResponsesRoom;