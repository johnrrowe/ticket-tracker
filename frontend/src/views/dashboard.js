import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { AddUserIfNotExist } from "../components/query.js";
import { NavLoggedIn } from "../components/nav-bar.js";

const projects = [
  { name: "proj1" },
  { name: "proj2" },
  { name: "proj3" },
  { name: "proj4" },
  { name: "proj5" },
];

const ProjectBoxes = (props) => {
  return (
    <div className="flex flex-row space-x-6 h-40">
      {props.projects.map((project) => (
        <div
          key={project.name}
          className="shadow rounded h-full w-64 bg-gray-200 text-center p-3"
        >
          {project.name}
        </div>
      ))}
    </div>
  );
};

export const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const addUserIfNotExist = async () => {
      const token = await getAccessTokenSilently();
      await AddUserIfNotExist(token);
    };
    addUserIfNotExist();
  }, [getAccessTokenSilently]);

  const [recentView, setRecentView] = useState(0);
  const RecentButton = (props) => {
    return (
      <button
        className="focus:outline-none font-bold hover:text-blue-700"
        onClick={() => {
          setRecentView(props.view);
        }}
      >
        {props.name}
      </button>
    );
  };

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
            <ProjectBoxes projects={projects} />
          </div>
        </div>
        <div className="flex-auto bg-gray-400 h-full p-4">
          <div className="flex flex-row border-b border-gray-700 space-x-6">
            <RecentButton view={0} name="Changed" />
            <RecentButton view={1} name="Viewed" />
            <RecentButton view={2} name="Assigned" />
            <RecentButton view={3} name="Starred" />
          </div>
          <RecentView view={recentView} />
          <div className="border-b border-gray-700" />
        </div>
      </div>
    </div>
  );
};

const RecentView = (props) => {
  switch (props.view) {
    case 0:
      return (
        <div>
          <Changed changes={changes} />
        </div>
      );
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

const changes = [
  { name: "job1", proj_name: "proj1", action: "created", user: "john" },
  { name: "job2", proj_name: "proj2", action: "created", user: "john" },
  { name: "job3", proj_name: "proj3", action: "updated", user: "john" },
  { name: "job4", proj_name: "proj4", action: "created", user: "john" },
  { name: "job5", proj_name: "proj5", action: "updated", user: "john" },
];

const Changed = (props) => {
  return (
    <div className="flex flex-col space-y-1">
      {props.changes.map((change) => (
        <div
          key={change.name}
          className="flex items-center justify-between p-3"
        >
          <div>
            {change.name}:{change.proj_name}
          </div>
          <div>{change.action}</div>
          <div>{change.user}</div>
        </div>
      ))}
    </div>
  );
};
