import React, { useState } from "react";

import { NavLoggedIn } from "../components/nav-bar.js";
import { useAuth0 } from "@auth0/auth0-react";
import {
  CreateSprint,
  GetSprints,
  StartSprint,
  GetActiveSprint,
} from "../components/query.js";
import { useForm, useFetch } from "../components/custom-hooks.js";
import { PopupMenu } from "../components/ui-elements.js";

export const Backlog = () => {
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <NavLoggedIn />
      </div>
      <div className="flex-auto flex-col">
        <div className="flex-none h-16 p-4 text-lg">Backlog Header</div>
        <div className="flex-none flex-col h-full p-4 space-y-8">
          <div className="flex flex-none flex-row text-base justify-between">
            <div>Sprints</div>
            <button
              onClick={() => {
                setShowCreateMenu(!showCreateMenu);
              }}
              className="rounded bg-blue-600 focus:outline-none text-white px-2 py-1"
            >
              Create Sprint
            </button>

            {showCreateMenu && <CreateSprintMenu close={setShowCreateMenu} />}
          </div>
          <SprintList setShowMenu={setShowStartMenu} />
          {showStartMenu && (
            <StartSprintMenu
              close={setShowStartMenu}
              sprintID={showStartMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const SprintList = (props) => {
  const activeSprintID = useFetch(GetActiveSprint).ID;
  const layout = (sprint) => {
    return (
      <div
        key={sprint.ID}
        className="flex flex-col h-full w-full shadow rounded bg-gray-200 p-3"
      >
        <div className="flex justify-between">
          {sprint.name}
          <ManageSprintBtns
            activeSprint={activeSprintID}
            sprintID={sprint.ID}
          />
        </div>
        <button className="flex focus:outline-none w-24">Create Job</button>
      </div>
    );
  };

  const sprints = useFetch(GetSprints).map(layout);

  return (
    <div className="flex flex-col space-y-6">
      {sprints}
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
