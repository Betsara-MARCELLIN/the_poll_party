import React from "react";
import Fade from '@material-ui/core/Fade';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ChatIcon from '@material-ui/icons/Chat';

import "./ChatRoom.css";

const ChatRoom = (props) => {
  const { messages, sendMessage } = props; // Gets messages, sendMessage from parents
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent
  const [checked, setChecked] = React.useState(false);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  
  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (<div>
            <ToggleButton className="chat-room-toogle-button" value="bold" selected={checked} aria-label="bold" onChange={() => {setChecked(!checked);}}>
              <ChatIcon />
            </ToggleButton>
            <Fade in={checked}>
            <div className="chat-room-container">
              <div className="messages-container">
                <ol className="messages-list">
                  {messages.map((message, i) => (
                    <li
                      key={i}
                      className={`message-item ${
                        message.ownedByCurrentUser ? "my-message" : "received-message"
                      }`}
                    >
                      {message.body}
                    </li>
                  ))}
                </ol>
              </div>
              <textarea
                value={newMessage}
                onChange={handleNewMessageChange}
                placeholder="Write message..."
                className="new-message-input-field"
              />
              <button onClick={handleSendMessage} className="send-message-button">
                Chat
              </button>
            </div>
            </Fade>
        </div>
    
  );
};

export default ChatRoom;