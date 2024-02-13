import React from "react";
import axios from "axios";
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

  const postTodo = async () => {
    try {
      await axios.post("http://localhost:8000/api/todo/", newTodo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={postTodo}>
        <input
          type="text"
          placeholder="Add Todo"
          className="input input-bordered input-accent w-full max-w-xs"
          onChange={handleChange}
          value={newTodo.body}
        />
        <button type="submit" className="btn btn-outline btn-primary ml-2">
          Add Todo
        </button>
      </form>
    </div>
  );
}
