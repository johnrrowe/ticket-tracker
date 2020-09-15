import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/home.js";
import { PrivateRoute } from "./components/private-route.js";
import { Dashboard } from "./views/dashboard.js";
import { Projects } from "./views/projects.js";
import { JobBoard } from "./views/job-board.js";
import { Backlog } from "./views/backlog.js";
import { GlobalContext } from "./model_update/model.js";

const App = () => {
  return (
    <GlobalContext
      component={
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/projects" component={Projects} />
          <PrivateRoute path="/projects/boards/" component={JobBoard} />
          <PrivateRoute path="/projects/backlog/" component={Backlog} />
        </Switch>
      }
    />
  );
};

export default App;
