import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import Home from "./Component/Home/Home";
import ChatRoom from "./Component/ChatRoom/ChatRoom";
import GameRoom from "./Component/GameRoom/GameRoom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:roomId" component={GameRoom} />
      </Switch>
    </Router>
  );
}

export default App;