import React, { useState, useContext, useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import {
  CreateSprint,
  GetSprints,
  StartSprint,
  GetActiveSprint,
} from "../components/query.js";
import { useForm } from "../components/custom-hooks.js";
import { PopupMenu, StandardView } from "../components/ui-elements.js";
import {
  SprintContext,
  DispatchContext,
  ProjectContext,
} from "../model_update/model.js";

export const Backlog = () => {
  const [showCreateSprint, setShowCreateSprint] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showCreateJob, setShowCreateJob] = useState(false);

  return (
    <StandardView
      header={<div className="text-lg">Backlog Header</div>}
      top={
        <div className="flex flex-none flex-row p-4 text-base justify-between">
          <div>Sprints</div>
          <button
            onClick={() => {
              setShowCreateSprint(!showCreateSprint);
            }}
            className="rounded bg-blue-600 focus:outline-none text-white px-2 py-1"
          >
            Create Sprint
          </button>
          {showCreateSprint && <CreateSprintMenu close={setShowCreateSprint} />}
        </div>
      }
      bottom={
        <div className="flex-none flex-col h-full p-4 space-y-8">
          <SprintList
            setShowMenu={setShowStartMenu}
            setShowCreateJob={setShowCreateJob}
          />
          {showStartMenu && (
            <StartSprintMenu
              close={setShowStartMenu}
              sprintID={showStartMenu}
            />
          )}
          {showCreateJob && (
            <CreateJobMenu close={setShowCreateJob} sprintID={showCreateJob} />
          )}
        </div>
      }
    />
  );
};

const SprintList = (props) => {
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

  const layout = (sprint) => {
    return (
      <div
        key={sprint.ID}
        className="flex flex-col h-full w-full shadow rounded bg-gray-200 p-3"
      >
        <div className="flex justify-between">
          {sprint.name}
          <ManageSprintBtns
            activeSprint={sprintCtx.active.ID}
            sprintID={sprint.ID}
          />
        </div>
        <button
          onClick={() => {
            props.setShowCreateJob(sprint.ID);
          }}
          className="flex w-24 rounded bg-blue-600 focus:outline-none text-white px-2 py-1"
        >
          Create Job
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-6">
      {sprintCtx.sprints && sprintCtx.sprints.map(layout)}
      <div className="shadow rounded h-full w-full bg-gray-200 text-center p-3">
        Backlog
      </div>
    </div>
  );
};

const CreateSprintMenu = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const submit = () => {
    getAccessTokenSilently().then((token) => {
      CreateSprint(
        {
          name: values.sprint_name,
        },
        token
      );
    });
  };

  const validate = (values) => {
    let errors = {};
    if (!values.sprint_name) {
      errors.sprint_name = "Sprint name is required";
    } else if (!/^[a-zA-Z0-9_ -]{1,}$/.test(values.sprint_name)) {
      errors.sprint_name = "Sprint name is invalid";
    }

    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    submit,
    { sprint_name: "" },
    validate
  );
  console.log(values.sprint_name);
  return (
    <PopupMenu
      close={props.close}
      handleSubmit={handleSubmit}
      formContent={[
        <React.Fragment>
          <label>Sprint Name</label>{" "}
          <div className="flex flex-col">
            <input
              id="sprint_name"
              value={values.sprint_name}
              onChange={handleChange}
              type="text"
              className="focus:outline-none px-2"
            />
            {errors.sprint_name && (
              <p className="text-red-700">{errors.sprint_name}</p>
            )}
          </div>
        </React.Fragment>,
      ]}
    />
  );
};

const StartSprintMenu = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const submit = () => {
    getAccessTokenSilently().then((token) => {
      StartSprint(
        {
          ID: values.ID,
          start: values.startDate,
          end: values.endDate,
        },
        token
      );
    });
  };

  const validate = (values) => {
    const errors = {};
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    submit,
    { ID: props.sprintID, startDate: "", endDate: "" },
    validate
  );
  return (
    <PopupMenu
      close={props.close}
      handleSubmit={handleSubmit}
      formContent={[
        <React.Fragment>
          <label>Start Date</label>
          <div className="flex flex-col">
            <input
              id="startDate"
              value={values.startDate}
              onChange={handleChange}
              type="date"
              className="focus:outline-none"
            />
          </div>
        </React.Fragment>,
        <React.Fragment>
          <label>End Date</label>
          <div className="flex flex-col">
            <input
              id="endDate"
              value={values.endDate}
              onChange={handleChange}
              type="date"
              className="focus:outline-none"
            />
          </div>
        </React.Fragment>,
      ]}
    />
  );
};

const ManageSprintBtns = (props) => {
  return (
    <div>
      {props.activeSprint ? (
        <div>
          {props.activeSprint === props.sprintID ? (
            <button className="rounded bg-gray-500 focus:outline-none text-gray-700 px-2 py-1">
              Complete Sprint
            </button>
          ) : (
            <button className="rounded bg-gray-400 focus:outline-none text-gray-500 px-2 py-1">
              Start Sprint
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={() => {
            props.setShowMenu(props.sprintID);
          }}
          className="rounded bg-blue-600 focus:outline-none text-white px-2 py-1"
        >
          Start Sprint
        </button>
      )}
    </div>
  );
};

const CreateJobMenu = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const submit = () => {
    getAccessTokenSilently().then((token) => {
      // CreateJob(
      //   {
      //     ID: values.ID,
      //     start: values.startDate,
      //     end: values.endDate,
      //   },
      //   token
      // );
    });
  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Job name is required";
    } else if (!/^[a-zA-Z0-9_ -]{1,}$/.test(values.name)) {
      errors.name = "Job name is invalid";
    }

    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    submit,
    { name: "" },
    validate
  );
  return (
    <PopupMenu
      close={props.close}
      handleSubmit={handleSubmit}
      formContent={[
        <React.Fragment>
          <label>Name</label>
          <div className="flex flex-col">
            <input
              id="name"
              value={values.name}
              onChange={handleChange}
              type="text"
              className="focus:outline-none"
            />
            {errors.name && <p className="text-red-700">{errors.name}</p>}
          </div>
        </React.Fragment>,
      ]}
    />
  );
};
