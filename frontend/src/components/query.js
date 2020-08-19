export const GetProducts = async (token) => {
  try {
    // Send a GET request to the server and add the signed in user's
    // access token in the Authorization header
    const response = await fetch("http://localhost:8080/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
  }
};
