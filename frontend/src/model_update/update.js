import { useAuth0 } from "@auth0/auth0-react";
import { useReducer } from "react";

export const useAppReducer = () => {
  const { getAccessTokenSilently } = useAuth0();

  const init = {
    projects: [],
    selected_proj: null,
    sprints: [],
    active_sprint: null,
    jobs: [],
    selected_job: null,
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "get": {
        getAccessTokenSilently()
          .then((token) => {
            return action.query(action.params, token);
          })
          .then((response) => {
            if (response) {
              dispatch({
                type: "setState",
                key: action.key,
                payload: response,
              });
            }
          });
        return state;
      }
      case "setState": {
        return { ...state, [action.key]: action.payload };
      }
      case "print": {
        console.log(action.payload);
        return state;
      }
      default: {
        return state;
      }
    }
  }, init);

  return [state, dispatch];
};
