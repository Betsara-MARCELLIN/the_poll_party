import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./index.css";
import Home from "./Component/Home/Home";
import GameRoom from "./Component/GameRoom/GameRoom";

const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:roomId" component={GameRoom} />
      </Switch>
    </Router>
  );
}

export default App;