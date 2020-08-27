import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLoggedIn } from "../components/nav-bar.js";
import { AddUserIfNotExist } from "../components/query.js";

const ProjectBox = () => {
  return (
    <div className="shadow rounded h-full w-64 bg-gray-200 text-center p-3">
      Project Name
    </div>
  );
};

const Button = (props) => {
  return (
    <button
      onClick={props.clickFn}
      className="focus:outline-none font-bold hover:text-blue-700"
    >
      {props.name}
    </button>
  );
};

const RecentView = (props) => {
  switch (props.view) {
    case 0:
      return <div>Changed</div>;
    case 1:
      return <div>Viewed</div>;
    case 2:
      return <div>Assigned</div>;
    case 3:
      return <div>Starred</div>;
    default:
      return <div>Changed</div>;
  }
};

export const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [recentView, setRecentView] = useState(0);

  useEffect(() => {
    const addUserIfNotExist = async () => {
      const token = await getAccessTokenSilently();
      await AddUserIfNotExist(token);
    };
    addUserIfNotExist();
  }, [getAccessTokenSilently]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <NavLoggedIn />
      </div>
      <div className="flex-auto flex-col">
        <div className="flex-none h-16 p-4 text-lg">Dashboard Header</div>
        <div className="flex-none flex-col h-56 p-4 space-y-4">
          <div className="flex-none text-base">Projects</div>
          <div className="flex flex-row space-x-6 h-40">
            <ProjectBox />
            <ProjectBox />
            <ProjectBox />
          </div>
        </div>
        <div className="flex-auto bg-gray-400 h-full p-4">
          <div className="flex flex-row border-b border-gray-700 space-x-6">
            <Button
              clickFn={() => {
                setRecentView(0);
              }}
              name="Changes"
            />
            <Button
              clickFn={() => {
                setRecentView(1);
              }}
              name="Viewed"
            />
            <Button
              clickFn={() => {
                setRecentView(2);
              }}
              name="Assigned"
            />
            <Button
              clickFn={() => {
                setRecentView(3);
              }}
              name="Starred"
            />
          </div>
          <RecentView view={recentView} />
        </div>
      </div>
    </div>
  );
};
