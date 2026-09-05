import React, { useState } from 'react';
import TaskItem from './components/TaskItem';
import './App.css';

function App() {
  // Initial list of tasks. In a real app this might be fetched or persisted.
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Call Mom', completed: false },
  ]);

  // Toggle the completed status of a task
  const toggleCompleted = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
