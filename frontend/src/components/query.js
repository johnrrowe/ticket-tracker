export const AddUserIfNotExist = async (token) => {
  try {
    const response = await fetch("http://localhost:8080/add_user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
