import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/home.js";
// import { PrivateRoute } from "./components/private-route.js";
import LoggedIn from "./views/logged-in.js";
import { PrivateRoute } from "./components/private-route.js";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/projects" component={LoggedIn} />
    </Switch>
  );
};

export default App;
