// src/task.js - Core Task Logic

export function createTask(name, tasks = []) {
  const newTask = {
    id: String(Date.now() + Math.random()),
    name: name,
    completed: false
  };
  return [...tasks, newTask];
}

export function deleteTask(id, tasks = []) {
  return tasks.filter(t => t.id !== id);
}

export function toggleTask(id, tasks = []) {
  return tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
}

export function saveTasks(tasks) {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

export function loadTasks() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const raw = window.localStorage.getItem('tasks');
    return raw ? JSON.parse(raw) : [];
  }
  return [];
}
