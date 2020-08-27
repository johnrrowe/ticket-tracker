import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Loading } from "../components/loading.js";
import { NavLoggedIn, NavLoggedOut } from "../components/nav-bar.js";

const Home = () => {
  const { isAuthenticated, loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        {isAuthenticated ? <NavLoggedIn /> : <NavLoggedOut />}
      </div>
      <div className="flex-auto bg-gray-600">Hello World</div>
    </div>
  );
};

export default Home;
