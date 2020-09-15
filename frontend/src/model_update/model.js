import React, { createContext } from "react";

import { useAppReducer } from "./update.js";

export const ProjectContext = createContext(null);
export const SprintContext = createContext(null);
export const JobContext = createContext(null);
export const DispatchContext = createContext(null);

export const GlobalContext = ({ component }) => {
  const [state, dispatch] = useAppReducer();

  return (
    <DispatchContext.Provider value={dispatch}>
      <ProjectContext.Provider
        value={{ projects: state.projects, selected: state.selected_proj }}
      >
        <SprintContext.Provider
          value={{ sprints: state.sprints, active: state.active_sprint }}
        >
          <JobContext.Provider
            value={{ jobs: state.jobs, selected: state.selected_job }}
          >
            {component}
          </JobContext.Provider>
        </SprintContext.Provider>
      </ProjectContext.Provider>
    </DispatchContext.Provider>
  );
};
