import React from "react";
import { Link } from "react-router-dom";

import { NavLoggedIn } from "../components/nav-bar.js";
import { BoxedList } from "../components/ui-elements.js";

export const JobBoard = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <NavLoggedIn />
      </div>
      <div className="flex-auto flex-col">
        <div className="flex-none h-16 p-4 text-lg">Job Board Header</div>
        <div className="flex-none flex-col h-full p-4 space-y-4">
          <div className="flex-none text-base">Jobs</div>
          <div className="flex flex-row space-x-6 h-64">
            <JobStatuses />
          </div>
        </div>
      </div>
    </div>
  );
};

const JobStatuses = () => {
  const projects = {};
  const projectID = new URLSearchParams(window.location.search).get("id");

  return Object.keys(projects).length === 0 ? (
    <div>
      <div>No Sprints Started</div>
      <Link to={`/projects/backlog/?id=${projectID}`}>Go to Backlog</Link>
    </div>
  ) : (
    <BoxedList list={projects} />
  );
};
