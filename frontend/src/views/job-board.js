import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { BoxedList, StandardView } from "../components/ui-elements.js";
import {
  GetActiveSprint,
  GetJobStatuses,
  GetSprints,
} from "../components/query.js";
import {
  SprintContext,
  ProjectContext,
  DispatchContext,
  JobContext,
} from "../model_update/model.js";

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
  const dispatch = useContext(DispatchContext);
  const projCtx = useContext(ProjectContext);
  useEffect(() => {
    dispatch({
      type: "get",
      query: GetSprints,
      params: projCtx.selected,
      key: "sprints",
    });
    dispatch({
      type: "get",
      query: GetActiveSprint,
      params: projCtx.selected,
      key: "active_sprint",
    });
  }, [projCtx.selected]);

  const sprintCtx = useContext(SprintContext);

  useEffect(() => {
    if (sprintCtx.active) {
      dispatch({
        type: "get",
        query: GetJobStatuses,
        params: sprintCtx.active.ID,
        key: "jobs",
      });
    }
  }, [sprintCtx.active]);

  const jobCtx = useContext(JobContext);

  return !sprintCtx.active ? (
    <div>
      <div>No Sprints Started</div>
      <Link to={`/projects/backlog`}>Go to Backlog</Link>
    </div>
  ) : (
    <BoxedList list={jobCtx.jobs} />
  );
};
