import React from "react";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

export default function Table({ todos, setTodos, isLoading }) {
  return (
    <div className="py-8">
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-gray-100">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              CheckBox
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              To Do
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Date Created
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <div>Loading</div>
          ) : (
            <>
              {todos.map((todoItem, index) => {
                return (
                  <tr key={todoItem.id} className="border-b border-gray-100">
                    <td className="p-3">
                      <span className="inline-block cursor-pointer">
                        {todoItem.completed ? (
                          <MdOutlineCheckBox />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank />
                        )}
                      </span>
                    </td>
                    <td className="p-3 text-sm">{todoItem.body}</td>
                    <td className="p-3 text-sm text-black capitalize text-left">
                      <span
                        className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${todoItem.completed ? "bg-green-300" : "bg-red-300"}`}
                      >
                        {todoItem.completed ? "Done" : "incomplete"}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(todoItem.created).toLocaleString()}
                    </td>
                    <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-1">
                      <span className="text-xl cursor-pointer">
                        <MdEditNote />
                      </span>
                      <span className="text-xl cursor-pointer">
                        <MdOutlineDeleteOutline />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
