import React, { createContext } from "react";

import { useAppReducer } from "./update.js";

export const ProjectContext = createContext(null);
export const SprintContext = createContext(null);
export const JobContext = createContext(null);
export const DispatchContext = createContext(null);

export const GlobalContext = ({ component }) => {
  const [state, dispatch] = useAppReducer();

  const chainDispatch = (first, second) => {
    first.callback = (response) => {
      if (response) {
        second.payload = response;
        dispatch(second);
      }
    };
    return first;
  };

  return (
    <DispatchContext.Provider value={{ dispatch, chainDispatch }}>
      <ProjectContext.Provider value={state.projects}>
        <SprintContext.Provider
          value={{ sprints: state.sprints, active: state.active_sprint }}
        >
          <JobContext.Provider value={state.jobs}>
            {component}
          </JobContext.Provider>
        </SprintContext.Provider>
      </ProjectContext.Provider>
    </DispatchContext.Provider>
  );
};
