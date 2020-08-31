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
