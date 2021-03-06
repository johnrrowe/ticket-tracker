import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Loading } from "../components/loading.js";
import {
  LinkTable,
  PopupMenu,
  StandardView,
} from "../components/ui-elements.js";
import { useForm } from "../components/custom-hooks.js";
import { CreateProject, GetUserProjects } from "../components/query.js";
import { ProjectContext, DispatchContext } from "../model_update/model.js";

export const Projects = () => {
  const { loading, user } = useAuth0();
  const [showMenu, setShowMenu] = useState(false);

  if (loading || !user) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <StandardView
      header={
        <div className="flex flex-row items-center justify-between">
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
      }
      top={
        <div className="flex-none flex-col h-24 p-4 space-y-4">
          <div className="flex-none text-base">Search and Filter</div>
        </div>
      }
      bottom={<ProjectList />}
    />
  );
};

const CreateProjectMenu = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const submit = () => {
    getAccessTokenSilently().then((token) => {
      CreateProject({ name: values.proj_name, type: values.proj_type }, token);
    });
  };

  const validate = (values) => {
    let errors = {};
    if (!values.proj_name) {
      errors.proj_name = "Project name is required";
    } else if (!/^[a-zA-Z0-9_ -]{1,}$/.test(values.proj_name)) {
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
      formContent={[
        <React.Fragment>
          <label>Project Name</label>
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
        </React.Fragment>,
        <React.Fragment>
          <label>Project Type</label>
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
        </React.Fragment>,
      ]}
    />
  );
};

const ProjectList = () => {
  const { dispatch } = useContext(DispatchContext);
  const projects = useContext(ProjectContext);

  useEffect(() => {
    dispatch({
      type: "fetch",
      query: GetUserProjects,
      callback: (response) => {
        if (response) {
          dispatch({
            type: "setState",
            key: "projects",
            payload: response,
          });
        }
      },
    });
  }, []);

  const layout = (project) => {
    return (
      <Link
        to={`/projects/backlog/?project=${project.ID}`}
        className="flex items-center justify-between p-3"
      >
        <div className="flex flex-row space-x-6">
          <div className="flex">{project.star}</div>
          <div className="flex">{project.name}</div>
        </div>
        <div>{project.type}</div>
        <div>{project.lead}</div>
      </Link>
    );
  };

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
        <LinkTable table={projects.map(layout)} />
      </div>
      <div className="border-b border-gray-700" />
    </div>
  );
};
