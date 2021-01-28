import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
const ENDPOINT = "http://93.23.204.103:3000";


function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    //const socket = socketIOClient(ENDPOINT);
    const socket = openSocket(ENDPOINT,  {transports: ['websocket']});
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;