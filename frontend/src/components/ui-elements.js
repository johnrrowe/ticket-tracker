import React from "react";
import { NavLoggedIn } from "./nav-bar";

export const StandardView = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none">
        <NavLoggedIn />
      </div>
      <div className="flex-auto flex-col">
        <div className="flex-none h-16 p-4">{props.header}</div>
        {props.top}
        <div className="flex-auto bg-gray-400 h-full p-4">{props.bottom}</div>
      </div>
    </div>
  );
};

export const LinkTable = (props) => {
  return (
    <div className="flex flex-col space-y-1">
      {props.table.map((entry, index) => (
        <button key={index} className="hover:bg-gray-200 focus:outline-none">
          {entry}
        </button>
      ))}
    </div>
  );
};

export const BoxedList = (props) => {
  return (
    <div className="flex flex-row space-x-6 h-full">
      {props.list.map((item, index) => (
        <div
          key={index}
          className="shadow rounded h-full w-64 bg-gray-200 text-center p-3"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export const PopupMenu = (props) => {
  return (
    <div className="flex fixed top-0 right-0 h-full w-full bg-gray-700 bg-opacity-25 justify-center">
      <div className="shadow rounded h-auto w-auto bg-gray-200 text-center self-center p-3">
        <button
          onClick={() => {
            props.close(false);
          }}
          className="focus:outline-none"
        >
          Close
        </button>
        <form
          onSubmit={props.handleSubmit}
          className="flex flex-col space-y-2"
          noValidate
        >
          {props.formContent.map((item, index) => (
            <div
              key={index}
              className="flex text-center justify-between space-x-4"
            >
              {item}
            </div>
          ))}
        </form>
        <button onClick={props.handleSubmit} className="focus:outline-none">
          Create
        </button>
      </div>
    </div>
  );
};
