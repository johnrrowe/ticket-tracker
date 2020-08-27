import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Loading } from "./loading.js";
import { NavLoggedOut } from "./nav-bar.js";

export const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => (
        <div className="flex flex-col h-screen">
          <div className="flex-none">
            <NavLoggedOut />
          </div>
          <div className="flex-auto">
            <Loading />
          </div>
        </div>
      ),
    })}
    {...args}
  />
);
