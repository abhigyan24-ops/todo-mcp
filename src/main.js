document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('task-list');

  // Use event delegation to handle delete button clicks
  taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const li = event.target.closest('li');
      if (li) {
        li.remove(); // Remove the parent <li> from the DOM
      }
    }
  });
});
