import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, input.trim()]);
    setInput("");
  };

  return (
    <div className="todo-container">
      <form className="todo-form" onSubmit={addTask}>
        <input
          type="text"
          value={input}
          placeholder="Add a new task"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul className="todo-list">
        {tasks.map((task, idx) => (
          <li key={idx}>{task}</li>
        ))}
      </ul>
    </div>
  );
}
