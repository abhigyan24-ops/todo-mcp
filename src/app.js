// Handles task creation in the Todo list app
// ---------------------------------------------------
// Listens for form submission, creates a new <li> element
// with the entered task text, appends it to the <ul id="task-list>,
// and clears the input field.

// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Grab references to the DOM elements
  const form   = document.querySelector('#task-form');   // <form>
  const input  = document.querySelector('#task-input');  // <input>
  const list   = document.querySelector('#task-list');   // <ul>

  // Attach submit handler to the form
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the form from doing a page refresh

    // Trim whitespace from the input value
    const taskText = input.value.trim();

    // Only proceed if the input is non-empty
    if (!taskText) return;

    // Create a new <li> element for the task
    const li = document.createElement('li');
    li.textContent = taskText;

    // Append the new <li> to the task list
    list.appendChild(li);

    // Clear the input field for the next task
    input.value = '';
  });
});
