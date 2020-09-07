import React, { useState, useEffect } from "react";

import { NavLoggedIn } from "../components/nav-bar.js";
import { useAuth0 } from "@auth0/auth0-react";
import { CreateSprint, GetSprints } from "../components/query.js";
import { useForm } from "../components/custom-hooks.js";
import { PopupMenu, LinkTable } from "../components/ui-elements.js";

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
          <div className="flex flex-none flex-row text-base justify-between">
            <div>Sprints</div>
            <button
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              className="rounded bg-blue-600 focus:outline-none text-white px-2 py-1"
            >
              Create Sprint
            </button>

            {showMenu && <CreateSprintMenu close={setShowMenu} />}
          </div>
          <SprintList />
        </div>
      </div>
    </div>
  );
};

const SprintList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [sprints, setSprints] = useState(null);

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        return GetSprints(token);
      })
      .then((sprintData) => {
        if (sprintData) {
          setSprints(sprintData);
        }
      });
  }, []);

  return (
    <div className="flex flex-col space-y-6 h-64">
      {sprints &&
        sprints.map((sprint, index) => (
          <div
            key={index}
            className="shadow rounded h-full w-full bg-gray-200 text-center p-3"
          >
            {sprint.name}
          </div>
        ))}
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
    { sprint_name: "" },
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
      ]}
    />
  );
};
