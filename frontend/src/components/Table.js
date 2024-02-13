import React, { useState } from "react";
import axios from "axios";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

export default function Table({ todos, setTodos, isLoading }) {
  const [editText, setEditText] = useState({
    body: "",
  });
  const handleClick = () => {
    handleEdit(editText.id, editText);
    setEditText({
      body: "",
    });
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/todo/${id}/`);
      const newList = todos.filter((todo) => todo.id !== id);
      setTodos(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/todo/${id}/`,
        value,
      );
      const newTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo,
      );
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = (id, value) => {
    handleEdit(id, {
      completed: !value,
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setEditText((prev) => ({
      ...prev,
      body: e.target.value,
    }));
    console.log(editText);
  };
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
                      <span
                        onClick={() =>
                          handleCheckbox(todoItem.id, todoItem.completed)
                        }
                        className="inline-block cursor-pointer"
                      >
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
                        <label htmlFor="my_modal_6" className="btn">
                          <MdEditNote onClick={() => setEditText(todoItem)} />
                        </label>
                      </span>
                      <span className="text-xl cursor-pointer">
                        <MdOutlineDeleteOutline
                          onClick={() => handleDelete(todoItem.id)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Todo</h3>
          <input
            type="text"
            value={editText.body}
            onChange={handleChange}
            className="input input-bordered input-success w-full max-w-xs my-5"
          />
          <br />
          <button className="btn btn-success mr-1" onClick={handleClick}>
            Edit
          </button>
          <label htmlFor="my_modal_6" className="btn btn-primary">
            Close!
          </label>
        </div>
      </div>
    </div>
  );
}
