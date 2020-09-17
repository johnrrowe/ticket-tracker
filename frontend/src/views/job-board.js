import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { BoxedList, StandardView } from "../components/ui-elements.js";
import { GetActiveSprint, GetJobStatuses } from "../components/query.js";
import { JobContext, DispatchContext } from "../model_update/model.js";
import { useRequests } from "../components/custom-hooks.js";

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
  const jobs = useContext(JobContext);
  const projectID = new URLSearchParams(window.location.search).get("project");
  const { chainDispatch } = useContext(DispatchContext);

  useRequests(
    [
      chainDispatch(
        {
          type: "fetch",
          query: GetActiveSprint,
          payload: projectID,
        },
        chainDispatch(
          {
            type: "fetch",
            query: GetJobStatuses,
          },
          {
            type: "setState",
            key: "jobs",
          }
        )
      ),
    ],
    []
  );

  return jobs ? (
    <BoxedList list={jobs} />
  ) : (
    <div>
      <div>No Sprints Started</div>
      <Link to={`/projects/backlog`}>Go to Backlog</Link>
    </div>
  );
};
