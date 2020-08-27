import React from "react";
const loading =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

export const Loading = () => (
  <div className="spinner">
    <img src={loading} alt="Loading" />
  </div>
);
