/* 
  Persistent Todo List – localStorage
  Key used: 'todo-v2-tasks'
*/

const STORAGE_KEY = 'todo-v2-tasks';

let tasks = []; // Array of { id, text, completed }

// ---------- Utility Functions ----------
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      tasks = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored tasks', e);
      tasks = [];
    }
  }
}

// ---------- Rendering ----------
const todoListEl = document.getElementById('todo-list');
const newTaskInput = document.getElementById('new-task-input');

function renderTasks() {
  // Clear list
  todoListEl.innerHTML = '';
  // Render each task
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    const span = document.createElement('span');
    span.textContent = task.text;
    span.style.cursor = 'pointer';
    span.addEventListener('click', () => toggleTask(task.id));

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '🗑️';
    deleteBtn.className = 'btn';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoListEl.appendChild(li);
  });
}

// ---------- Actions ----------
function addTask(text) {
  if (!text.trim()) return;
  const newTask = {
    id: Date.now(),
    text: text.trim(),
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

// ---------- Event Listeners ----------
document.getElementById('add-btn').addEventListener('click', () => {
  addTask(newTaskInput.value);
  newTaskInput.value = '';
});

newTaskInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addTask(newTaskInput.value);
    newTaskInput.value = '';
  }
});

// ---------- Init ----------
loadTasks();
renderTasks();
