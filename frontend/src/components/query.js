const AuthorizedFetch = async (path, method, headers, body, token) => {
  let request = {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  };
  if (method === "POST") {
    request.body = JSON.stringify(body);
  }

  try {
    const response = await fetch("http://localhost:8080" + path, request);
    if (response) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const AddUserIfNotExist = (user, token) => {
  AuthorizedFetch(
    "/add_user",
    "POST",
    null,
    { name: user.nickname, email: user.name },
    token
  );
};

export const CreateProject = (proj, token) => {
  AuthorizedFetch(
    "/create_project",
    "POST",
    null,
    {
      name: proj.name,
      type: proj.type,
    },
    token
  );
};

export const GetUserProjects = (token) => {
  const response = AuthorizedFetch("/get_projects", "GET", null, null, token);
  return response;
};

export const CreateSprint = (sprint, token) => {
  const project_id = new URLSearchParams(window.location.search).get("project");
  AuthorizedFetch(
    "/create_sprint",
    "POST",
    null,
    { project: project_id, name: sprint.name },
    token
  );
};

export const GetSprints = (token) => {
  const project_id = new URLSearchParams(window.location.search).get("project");
  return AuthorizedFetch(
    "/get_sprints",
    "GET",
    { project: project_id },
    null,
    token
  );
};
