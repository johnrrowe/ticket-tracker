import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { AddUserIfNotExist } from "../components/query.js";
import { NavLoggedIn } from "../components/nav-bar.js";
import { LinkTable, BoxedList } from "../components/elements.js";

export const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const addUserIfNotExist = async () => {
      const token = await getAccessTokenSilently();
      await AddUserIfNotExist(token);
    };
    addUserIfNotExist();
  }, [getAccessTokenSilently]);

  const [recentView, setRecentView] = useState(0);
  const RecentButton = (props) => {
    return (
      <button
        className="focus:outline-none font-bold hover:text-blue-700"
        onClick={() => {
          setRecentView(props.view);
        }}
      >
        {props.name}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <NavLoggedIn />
      </div>
      <div className="flex-auto flex-col">
        <div className="flex-none h-16 p-4 text-lg">Dashboard Header</div>
        <div className="flex-none flex-col h-56 p-4 space-y-4">
          <div className="flex-none text-base">Projects</div>
          <div className="flex flex-row space-x-6 h-40">
            <ProjectBoxes />
          </div>
        </div>
        <div className="flex-auto bg-gray-400 h-full p-4">
          <div className="flex flex-row border-b border-gray-700 space-x-6">
            <RecentButton view={0} name="Changed" />
            <RecentButton view={1} name="Viewed" />
            <RecentButton view={2} name="Assigned" />
            <RecentButton view={3} name="Starred" />
          </div>
          <RecentView view={recentView} />
          <div className="border-b border-gray-700" />
        </div>
      </div>
    </div>
  );
};

const ProjectBoxes = () => {
  const projects = ["proj1", "proj2", "proj3", "proj4", "proj5"];

  return <BoxedList list={projects} />;
};

const RecentView = (props) => {
  switch (props.view) {
    case 0:
      return (
        <div>
          <Changed />
        </div>
      );
    case 1:
      return <div>Viewed</div>;
    case 2:
      return <div>Assigned</div>;
    case 3:
      return <div>Starred</div>;
    default:
      return <div>Changed</div>;
  }
};

const Changed = () => {
  const layout = (props) => {
    return (
      <React.Fragment>
        <div>
          {props.name} : {props.proj_name}
        </div>
        <div>{props.action}</div>
        <div>{props.user}</div>
      </React.Fragment>
    );
  };

  const changes = [
    { name: "job1", proj_name: "proj1", action: "created", user: "john" },
    { name: "job2", proj_name: "proj2", action: "created", user: "john" },
    { name: "job3", proj_name: "proj3", action: "updated", user: "john" },
    { name: "job4", proj_name: "proj4", action: "created", user: "john" },
    { name: "job5", proj_name: "proj5", action: "updated", user: "john" },
  ].map(layout);

  return <LinkTable table={changes} />;
};
