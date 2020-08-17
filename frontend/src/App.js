import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/home.js";
import PrivateRoute from "./components/private-route.js";
import LoggedIn from "./components/logged-in.js";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/products" component={LoggedIn} />
    </Switch>
  );
};

export default App;
