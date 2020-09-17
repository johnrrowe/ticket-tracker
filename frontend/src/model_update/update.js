import { useAuth0 } from "@auth0/auth0-react";
import { useReducer } from "react";

export const useAppReducer = () => {
  const { getAccessTokenSilently } = useAuth0();

  const init = {
    projects: [],
    sprints: [],
    active_sprint: null,
    jobs: [],
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "fetch": {
        getAccessTokenSilently()
          .then((token) => {
            return action.query(action.payload, token);
          })
          .then((response) => {
            action.callback(response);
          });
        return state;
      }
      case "setState": {
        return { ...state, [action.key]: action.payload };
      }
      default: {
        return state;
      }
    }
  }, init);

  return [state, dispatch];
};
