import React from "react";

export const LinkTable = (props) => {
  return (
    <div className="flex flex-col space-y-1">
      {props.table.map((entry, index) => (
        <button key={index} className="hover:bg-gray-200 focus:outline-none">
          <div className="flex items-center justify-between p-3">{entry}</div>
        </button>
      ))}
    </div>
  );
};

export const BoxedList = (props) => {
  return (
    <div className="flex flex-row space-x-6 h-40">
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
          className="flex flex-row space-x-4"
          noValidate
        >
          <div className="flex flex-col space-y-2">{props.left}</div>
          <div className="flex flex-col space-y-2">{props.right}</div>
        </form>
        <button onClick={props.handleSubmit} className="focus:outline-none">
          Create
        </button>
      </div>
    </div>
  );
};
