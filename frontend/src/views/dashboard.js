import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { AddUserIfNotExist } from "../components/query.js";
import {
  LinkTable,
  BoxedList,
  StandardView,
} from "../components/ui-elements.js";

export const Dashboard = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      AddUserIfNotExist(user, token);
    });
  }, [getAccessTokenSilently, user]);

  return (
    <StandardView
      header="Dashboard Header"
      top={
        <div className="flex-none flex-col h-56 p-4 space-y-4">
          <div className="flex-none text-base">Projects</div>
          <div className="flex flex-row space-x-6 h-40">
            <ProjectBoxes />
          </div>
        </div>
      }
      bottom={<Recents />}
    />
  );
};

const ProjectBoxes = () => {
  const projects = ["proj1", "proj2", "proj3", "proj4", "proj5"];

  return <BoxedList list={projects} />;
};

const Recents = (props) => {
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

  const [currentView, setCurrentView] = useState(0);
  const RecentButton = (props) => {
    return (
      <button
        className="focus:outline-none font-bold hover:text-blue-700"
        onClick={() => {
          setCurrentView(props.view);
        }}
      >
        {props.name}
      </button>
    );
  };

  return (
    <React.Fragment>
      <div className="flex flex-row border-b border-gray-700 space-x-6">
        <RecentButton view={0} name="Changed" />
        <RecentButton view={1} name="Viewed" />
        <RecentButton view={2} name="Assigned" />
        <RecentButton view={3} name="Starred" />
      </div>
      <RecentView view={currentView} />
      <div className="border-b border-gray-700" />
    </React.Fragment>
  );
};

const Changed = () => {
  const layout = (props) => {
    return (
      <Link
        to={`/dashboard/`}
        className="flex items-center justify-between p-3"
      >
        <div>
          {props.name} : {props.proj_name}
        </div>
        <div>{props.action}</div>
        <div>{props.user}</div>
      </Link>
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
