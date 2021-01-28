import React from "react";
import ChatRoom from "../ChatRoom/ChatRoom";

import "./GameRoom.css";

const GameRoom = (props) => {
    const { roomId } = props.match.params; // Gets roomId from URL
    console.log(roomId);
    return (
        <div>
            <h1 className="room-name">Room: {roomId}</h1>
            <ChatRoom roomId={roomId}/>
        </div>
        

    );
};

export default GameRoom;