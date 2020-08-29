import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { NavLoggedIn } from "../components/nav-bar.js";
import { Loading } from "../components/loading.js";
import { LinkTable, PopupMenu } from "../components/ui-elements.js";
import { useForm } from "../components/custom-hooks.js";

export const Projects = () => {
  const { getAccessTokenSilently, loading, user } = useAuth0();
  const [showMenu, setShowMenu] = useState(false);

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
          <div>
            <button
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              className="rounded bg-blue-600 focus:outline-none text-white px-2 py-1"
            >
              Create Project
            </button>

            {showMenu && <CreateProjectMenu close={setShowMenu} />}
          </div>
        </div>
        <div className="flex-none flex-col h-24 p-4 space-y-4">
          <div className="flex-none text-base">Search and Filter</div>
        </div>
        <div className="flex-auto bg-gray-400 h-full p-4">
          <ProjectList />
        </div>
      </div>
    </div>
  );
};

const CreateProjectMenu = (props) => {
  const submit = () => {
    console.log("Submitted!!");
  };

  const validate = (values) => {
    let errors = {};
    if (!values.proj_name) {
      errors.proj_name = "Project name is required";
    } else if (!/^[a-z0-9_-]{3,16}$/.test(values.proj_name)) {
      errors.proj_name = "Project name is invalid";
    }

    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    submit,
    { proj_name: "", proj_type: "Lime" },
    validate
  );

  return (
    <PopupMenu
      close={props.close}
      handleSubmit={handleSubmit}
      left={
        <React.Fragment>
          <label>Project Name</label>
          <label>Project Type</label>
        </React.Fragment>
      }
      right={
        <React.Fragment>
          <div className="flex flex-col">
            <input
              id="proj_name"
              value={values.proj_name}
              onChange={handleChange}
              type="text"
              className="focus:outline-none px-2"
            />
            {errors.proj_name && (
              <p className="text-red-700">{errors.proj_name}</p>
            )}
          </div>
          <select
            id="proj_type"
            value={values.proj_type}
            onChange={handleChange}
            className="focus:outline-none"
          >
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </React.Fragment>
      }
    />
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

  return (
    <div>
      <div className="flex flex-row border-b border-gray-700 justify-between p-3">
        <div className="flex flex-row space-x-6">
          <div>star</div>
          <div>name</div>
        </div>
        <div>type</div>
        <div>lead</div>
      </div>
      <div className="flex flex-col space-y-1">
        <LinkTable table={projects} />
      </div>
      <div className="border-b border-gray-700" />
    </div>
  );
};
