import React from 'react';

const TaskItem = ({ task, toggleCompleted }) => {
  return (
    <li
      className={task.completed ? 'completed' : ''}
      onClick={() => toggleCompleted(task.id)}
    >
      {task.text}
    </li>
  );
};

export default TaskItem;
