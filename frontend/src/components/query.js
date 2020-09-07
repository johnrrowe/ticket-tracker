const hostname = "http://localhost:8080";

export const AddUserIfNotExist = (user, token) => {
  try {
    fetch("http://localhost:8080/add_user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: user.nickname, email: user.name }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const CreateProject = (proj, token) => {
  try {
    fetch("http://localhost:8080/create_project", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: proj.name,
        type: proj.type,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const GetUserProjects = (token) => {
  try {
    const responseData = fetch("http://localhost:8080/get_projects", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response.json();
    });

    return responseData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const CreateSprint = (sprint, token) => {
  try {
    const project_id = new URLSearchParams(window.location.search).get(
      "project"
    );

    fetch("http://localhost:8080/create_sprint", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        project: project_id,
        name: sprint.name,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const GetSprints = (token) => {
  try {
    const project_id = new URLSearchParams(window.location.search).get(
      "project"
    );

    const responseData = fetch("http://localhost:8080/get_sprints", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Project: `${project_id}`,
      },
    }).then((response) => {
      return response.json();
    });

    console.log(responseData);

    return responseData;
  } catch (error) {
    console.error(error);
  }
};
