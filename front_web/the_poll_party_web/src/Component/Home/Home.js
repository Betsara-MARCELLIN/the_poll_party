import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const [roomName, setRoomName] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div className="home-container">
      <h1> The Poll Party Game</h1>
      <input
        type="text"
        placeholder="Pseudo"
        value={userName}
        onChange={handleUserNameChange}
        className="text-input-field"
      />
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
  
      <Link to={{ pathname:`/${roomName}`, query :{roomId: roomName, public: userName }}} className="enter-room-button">
        Join room
      </Link>
    </div>
  );
};

export default Home;