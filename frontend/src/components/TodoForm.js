import React from "react";
import { useState } from "react";

export default function TodoForm() {
  const [newTodo, setnewTodo] = useState({
    body: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    setnewTodo((prev) => ({
      ...prev,
      body: e.target.value,
    }));
  };
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Add Todo"
          className="input input-bordered input-accent w-full max-w-xs"
          onChange={handleChange}
          value={newTodo.body}
        />
        <button className="btn btn-outline btn-primary ml-2">Add Todo</button>
      </form>
    </div>
  );
}
