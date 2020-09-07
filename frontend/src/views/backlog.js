import React, { useState } from "react";

import { NavLoggedIn } from "../components/nav-bar.js";
import { useAuth0 } from "@auth0/auth0-react";
import { CreateSprint } from "../components/query.js";
import { useForm } from "../components/custom-hooks.js";
import { PopupMenu, PopupDupe } from "../components/ui-elements.js";

export const Backlog = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <NavLoggedIn />
      </div>
      <div className="flex-auto flex-col">
        <div className="flex-none h-16 p-4 text-lg">Backlog Header</div>
        <div className="flex-none flex-col h-full p-4 space-y-4">
          <div className="flex flex-none flex-row text-base space-x-8">
            <div>Sprints</div>
            <button
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              className="rounded bg-blue-600 focus:outline-none text-white px-2 py-1"
            >
              Create Project
            </button>

            {showMenu && <CreateSprintMenu close={setShowMenu} />}
          </div>
          <SprintList />
          <div className="flex flex-row space-x-6 h-64">sprint list . . .</div>
        </div>
      </div>
    </div>
  );
};

const SprintList = () => {
  const sprints = ["s1", "s2"];

  const format_sprint = (sprint) => {
    return <div>{sprint}</div>;
  };

  return (
    <div className="flex flex-col">
      {Object.keys(sprints) === 0 ? null : sprints.map(format_sprint)}
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
          start: values.startDate,
          end: values.endDate,
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
    { sprint_name: "", startDate: {}, endDate: {} },
    validate
  );

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
        <React.Fragment>
          <label>Start Date</label>
          <input
            id="startDate"
            value={values.startDate}
            onChange={handleChange}
            type="date"
            className="focus:outline-none text-center"
          />
        </React.Fragment>,
        <React.Fragment>
          <label>End Date</label>
          <input
            id="endDate"
            value={values.endDate}
            onChange={handleChange}
            type="date"
            className="focus:outline-none text-center"
          />
        </React.Fragment>,
      ]}
    />
  );
};
