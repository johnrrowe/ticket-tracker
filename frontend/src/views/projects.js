import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { NavLoggedIn } from "../components/nav-bar.js";
import { Loading } from "../components/loading.js";
import { LinkTable } from "../components/elements.js";

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
          <div className="flex flex-row border-b border-gray-700 justify-between p-3">
            <div className="flex flex-row space-x-6">
              <div>star</div>
              <div>name</div>
            </div>
            <div>type</div>
            <div>lead</div>
          </div>
          <div className="flex flex-col space-y-1">
            <ProjectList />
          </div>
          <div className="border-b border-gray-700" />
        </div>
      </div>
    </div>
  );
};

const ProjectList = () => {
  const layout = (props) => {
    return (
      <React.Fragment>
        <div className="flex flex-row space-x-6">
          <div className="flex">{props.star}</div>
          <div className="flex">{props.name}</div>
        </div>
        <div>{props.type}</div>
        <div>{props.lead}</div>
      </React.Fragment>
    );
  };

  const projects = [
    { name: "proj1", type: "sprint tracker", lead: "john", star: "yes" },
    { name: "proj2", type: "sprint tracker", lead: "john", star: "no" },
    { name: "proj3", type: "bug tracker", lead: "john", star: "no" },
    { name: "proj4", type: "sprint tracker", lead: "john", star: "no" },
    { name: "proj5", type: "bug tracker", lead: "john", star: "no" },
  ].map(layout);

  return <LinkTable table={projects} />;
};
