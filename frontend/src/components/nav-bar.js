import React, { useState } from "react";
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
        <div className="flex flex-row space-x-4">
          <button className="focus:outline-none">
            <Link to="/dashboard">Ticket Tracker</Link>
          </button>
          <NavMenuButtons
            buttons={[
              { name: "Projects", ID: 1, content: <ProjectMenu /> },
              { name: "Filters", ID: 2, content: "Filters" },
              { name: "Create", ID: 3, content: "Create" },
            ]}
          />
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

// -----------------------------------------------------------------------------------------
// NavBar Helper Functions
// -----------------------------------------------------------------------------------------
const ProjectMenu = () => {
  return (
    <button className="focus:outline-none font-bold hover:text-blue-700">
      <Link to="/projects">View All Projects</Link>
    </button>
  );
};

const DropdownButton = (props) => {
  const ToggleMenu = () => {
    if (props.currentMenu === props.menuID) {
      props.setMenu(0);
    } else {
      props.setMenu(props.menuID);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          ToggleMenu();
        }}
        className="focus:outline-none"
      >
        <div>{props.name}</div>
      </button>
      {props.currentMenu === props.menuID && (
        <div className="shadow absolute rounded w-64 bg-gray-200 text-center p-3">
          {props.content}
        </div>
      )}
    </div>
  );
};

const NavMenuButtons = (props) => {
  const [currentMenu, setMenu] = useState(0);

  return (
    <div className="flex flex-row space-x-4">
      {props.buttons.map((button) => (
        <DropdownButton
          name={button.name}
          currentMenu={currentMenu}
          menuID={button.ID}
          content={button.content}
          setMenu={setMenu}
          key={button.ID}
        />
      ))}
    </div>
  );
};
