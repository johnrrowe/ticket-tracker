import React from "react";

import { NavLoggedIn } from "../components/nav-bar.js";

export const Backlog = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <NavLoggedIn />
      </div>
      <div className="flex-auto flex-col">
        <div className="flex-none h-16 p-4 text-lg">Backlog Header</div>
        <div className="flex-none flex-col h-full p-4 space-y-4">
          <div className="flex-none text-base">Sprints</div>
          <div className="flex flex-row space-x-6 h-64">sprint list . . .</div>
        </div>
      </div>
    </div>
  );
};
