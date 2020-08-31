export const AddUserIfNotExist = (token) => {
  try {
    fetch("http://localhost:8080/add_user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const CreateProject = (proj, token) => {
  try {
    console.log(token);
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
