import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home.js";
import PrivateRoute from "./components/private-route.js";
import LoggedIn from "./components/logged-in.js";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <PrivateRoute path="/products">
        <LoggedIn />
      </PrivateRoute>
    </Switch>
  );
};

export default App;
