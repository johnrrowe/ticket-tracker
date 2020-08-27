import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/home.js";
import { PrivateRoute } from "./components/private-route.js";
import { Dashboard } from "./views/dashboard.js";
import { Projects } from "./views/projects.js";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/projects" component={Projects} />
    </Switch>
  );
};

export default App;
