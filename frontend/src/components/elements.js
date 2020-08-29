import React from "react";

export const LinkTable = (props) => {
  return (
    <div className="flex flex-col space-y-1">
      {props.table.map((entry, index) => (
        <button className="hover:bg-gray-200 focus:outline-none">
          <div key={index} className="flex items-center justify-between p-3">
            {entry}
          </div>
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
