import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { NavLoggedIn } from "../components/nav-bar.js";
import { Loading } from "../components/loading.js";

export const Projects = () => {
  const { getAccessTokenSilently, loading, user } = useAuth0();

  if (loading || !user) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <NavLoggedIn />
      <div className="flex flex-col text-center">
        <div>Projects</div>
        <div>Hi, {user.name}!</div>
      </div>
    </div>
  );
};
