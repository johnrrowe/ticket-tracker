import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { NavLoggedIn } from "../components/nav-bar.js";
import { BoxedList, StandardView } from "../components/ui-elements.js";
import { useFetch } from "../components/custom-hooks.js";
import { GetActiveSprint, GetJobStatuses } from "../components/query.js";
import { act } from "react-dom/test-utils";

export const JobBoard = () => {
  return (
    <StandardView
      header={<div className="text-lg">Job Board Header</div>}
      top={<div className="flex-none">Jobs</div>}
      bottom={
        <div className="flex flex-row space-x-6 h-64">
          <JobStatuses />
        </div>
      }
    />
  );
};

const JobStatuses = () => {
  const activeSprint = useFetch(GetActiveSprint);
  if (activeSprint.length !== 0) {
    window.history.pushState(
      {},
      null,
      `/projects/boards/?project=${activeSprint.ID}&sprint=${activeSprint.project}`
    );
  }

  const jobStatuses = useFetch(GetJobStatuses);
  return !activeSprint ? (
    <div>
      <div>No Sprints Started</div>
      <Link to={`/projects/backlog/?project=${activeSprint.ProjectID}`}>
        Go to Backlog
      </Link>
    </div>
  ) : (
    <BoxedList list={jobStatuses} />
  );
};
