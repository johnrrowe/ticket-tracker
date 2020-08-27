import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const NavigationBar = (props) => {
  return (
    <div className="flex items-center justify-between shadow p-3">
      <div>{props.left}</div>
      <div>{props.right}</div>
    </div>
  );
};

export const NavLoggedIn = () => {
  const { logout } = useAuth0();

  return (
    <NavigationBar
      left={
        <div className="flex space-x-4">
          <nav className="items-center space-x-4">
            <button className="focus:outline-none">
              <Link to="/dashboard">Ticket Tracker</Link>
            </button>
            <button className="focus:outline-none">
              <Link to="/projects">Projects</Link>
            </button>
            <button className="focus:outline-none">Filters</button>
            <button className="focus:outline-none">Create</button>
          </nav>
        </div>
      }
      right={
        <div className="flex space-x-4">
          <input
            className="bg-white focus:outline-none border border-gray-300 rounded py-1 px-2 appearance-none"
            type="search"
            placeholder="Search"
          />
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="focus:outline-none"
          >
            Logout
          </button>
        </div>
      }
    />
  );
};

export const NavLoggedOut = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <NavigationBar
      left={"Ticket Tracker"}
      right={
        <button
          onClick={() => loginWithRedirect({})}
          className="focus:outline-none"
        >
          Login
        </button>
      }
    />
  );
};
