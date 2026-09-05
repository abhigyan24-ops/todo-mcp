/* 
   Todo V2 – Add toggle complete functionality
   Features:
   - Tasks can be marked completed by clicking them
   - Completed tasks get a line‑through style
   - Task state is persisted across reloads using localStorage
*/

const STORAGE_KEY = 'todo-v2-tasks';

// Grab DOM elements
const form = document.getElementById('todo-form');
const input = document.getElementById('new-task');
const list = document.getElementById('todo-list');

/**
 * Load tasks from localStorage or return an empty array
 */
function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Save tasks array to localStorage
 */
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Render the task list based on the stored tasks
 */
function renderTasks() {
  const tasks = loadTasks();
  list.innerHTML = ''; // clear existing

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');

    // Toggle completed on click
    li.addEventListener('click', () => {
      task.completed = !task.completed;
      if (task.completed) li.classList.add('completed');
      else li.classList.remove('completed');
      saveTasks(tasks);
    });

    list.appendChild(li);
  });
}

/**
 * Add a new task to the list
 */
function addTask(text) {
  const tasks = loadTasks();
  tasks.push({ text, completed: false });
  saveTasks(tasks);
  renderTasks();
}

/**
 * Handle form submission
 */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = '';
});

/**
 * Initial render on page load
 */
document.addEventListener('DOMContentLoaded', renderTasks);
