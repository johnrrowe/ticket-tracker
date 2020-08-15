import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";

import Loading from "./loading.js";

const Home = () => {
  const { isAuthenticated, loading, loginWithRedirect, logout } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <container>
      <div className="App jumbotron text-center mt-5">
        <h1>Ticket Tracker</h1>
        {isAuthenticated ? (
          <div>
            <Link to="/products">Products</Link>
            <button
              className="btn btn-primary btn-lg btn-login btn-block"
              onClick={() => logout({})}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary btn-lg btn-login btn-block"
            onClick={() => loginWithRedirect({})}
          >
            Login
          </button>
        )}
      </div>
    </container>
  );
};

export default Home;
