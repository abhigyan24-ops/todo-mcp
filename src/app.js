// Minimal JavaScript to demonstrate a todo list placeholder
document.addEventListener('DOMContentLoaded', () => {
  const appDiv = document.getElementById('app');
  const todoList = document.createElement('ul');
  todoList.innerHTML = '<li>Loading todos...</li>';
  appDiv.appendChild(todoList);
});
