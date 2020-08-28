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
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <NavLoggedIn />
      </div>
      <div className="flex-auto flex-col">
        <div className="flex flex-none flex-row h-16 p-4 items-center justify-between">
          <div className="text-lg">Projects</div>
          <button className="rounded bg-blue-600 focus:outline-none text-white px-2 py-1">
            Create Project
          </button>
        </div>
        <div className="flex-none flex-col h-24 p-4 space-y-4">
          <div className="flex-none text-base">Search and Filter</div>
        </div>
        <div className="flex-auto bg-gray-400 h-full p-4">
          <div className="flex flex-row border-b border-gray-700 justify-between">
            <div>star</div>
            <div>name</div>
            <div>type</div>
            <div>lead</div>
          </div>
          <div className="flex flex-col space-y-1">
            <ProjectList projects={projects} />
          </div>
          <div className="border-b border-gray-700" />
        </div>
      </div>
    </div>
  );
};

const projects = [
  { name: "proj1", type: "sprint tracker", lead: "john", star: "yes" },
  { name: "proj2", type: "sprint tracker", lead: "john", star: "no" },
  { name: "proj3", type: "bug tracker", lead: "john", star: "no" },
  { name: "proj4", type: "sprint tracker", lead: "john", star: "no" },
  { name: "proj5", type: "bug tracker", lead: "john", star: "no" },
];

const ProjectList = (props) => {
  return (
    <div className="flex flex-col space-y-1">
      {props.projects.map((project) => (
        <div
          key={project.name}
          className="flex items-center justify-between p-3"
        >
          <div>{project.star}</div>
          <div>{project.name}</div>
          <div>{project.type}</div>
          <div>{project.lead}</div>
        </div>
      ))}
    </div>
  );
};
