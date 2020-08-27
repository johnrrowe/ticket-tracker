import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/home.js";
import LoggedIn from "./views/logged-in.js";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/projects" component={LoggedIn} />
    </Switch>
  );
};

export default App;
