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

export const GetUserProjects = (_, token) => {
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

export const GetSprints = (projectID, token) => {
  return AuthorizedFetch(
    "/get_sprints",
    "GET",
    { project: projectID },
    null,
    token
  );
};

export const StartSprint = (sprint, token) => {
  const project_id = new URLSearchParams(window.location.search).get("project");
  AuthorizedFetch(
    "/start_sprint",
    "POST",
    null,
    {
      ID: sprint.ID,
      project: project_id,
      start: sprint.start,
      end: sprint.end,
    },
    token
  );
};

export const GetActiveSprint = (projectID, token) => {
  return projectID
    ? AuthorizedFetch("/get_active", "GET", { project: projectID }, null, token)
    : null;
};

export const GetJobStatuses = (sprintID, token) => {
  return AuthorizedFetch(
    "/get_statuses",
    "GET",
    { sprint: sprintID },
    null,
    token
  );
};
