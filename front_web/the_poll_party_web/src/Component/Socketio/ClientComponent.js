import React, { useEffect, useState } from "react";
import openSocket from "socket.io-client";
const ENDPOINT = "http://93.23.204.103:3000";

export default function ClientComponent() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = openSocket(ENDPOINT,  {transports: ['websocket']});
    socket.on("FromAPI", data => {
      setResponse(data);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //

  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}