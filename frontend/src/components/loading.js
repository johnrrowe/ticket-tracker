import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Loading = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }
};

export default Loading;
