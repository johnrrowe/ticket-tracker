import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLoggedIn } from "../components/nav-bar.js";
import { AddUserIfNotExist } from "../components/query.js";

const LoggedIn = () => {
  const { getAccessTokenSilently, loading, user } = useAuth0();

  useEffect(() => {
    const addUserIfNotExist = async () => {
      const token = await getAccessTokenSilently();
      await AddUserIfNotExist(token);
    };
    addUserIfNotExist();
  }, [getAccessTokenSilently]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavLoggedIn />
      <div className="App text-center">
        <h1>Ticket Tracker</h1>
        <p>
          Hi, {user.name}! Below you'll find the latest games that need
          feedback. Please provide honest feedback so developers can make the
          best games.
        </p>
      </div>
    </div>
  );
};

export default LoggedIn;
