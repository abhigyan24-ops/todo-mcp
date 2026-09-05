// tests/task.test.js

/**
 * Test suite for the task logic module.
 *
 * The module is expected to expose the following functions:
 *  - createTask(name: string, tasks: Task[]) => Task[]
 *  - deleteTask(id: string, tasks: Task[]) => Task[]
 *  - toggleTask(id: string, tasks: Task[]) => Task[]
 *  - saveTasks(tasks: Task[]) => void
 *  - loadTasks() => Task[]
 *
 * A Task is an object with the shape:
 *   {
 *     id: string,
 *     name: string,
 *     completed: boolean
 *   }
 *
 * The persistence implementation is abstracted behind `saveTasks` and `loadTasks`.
 * For the purposes of these tests we mock the persistence layer using `localStorage`.
 */

import {
  createTask,
  deleteTask,
  toggleTask,
  saveTasks,
  loadTasks
} from '../src/task';

describe('Task Logic', () => {
  // Helper to create a deterministic task list
  const sampleTasks = [
    { id: '1', name: 'First task', completed: false },
    { id: '2', name: 'Second task', completed: true }
  ];

  beforeEach(() => {
    // Reset any persisted data before each test
    window.localStorage.clear();
  });

  test('createTask adds a new task with default completed status', () => {
    const tasks = createTask('New Task', sampleTasks);

    // New task should be appended to the list
    expect(tasks).toHaveLength(sampleTasks.length + 1);
    const newTask = tasks[tasks.length - 1];

    expect(newTask).toMatchObject({
      id: expect.any(String),
      name: 'New Task',
      completed: false
    });
  });

  test('deleteTask removes the task with the specified id', () => {
    const tasks = deleteTask('1', sampleTasks);

    expect(tasks).toHaveLength(sampleTasks.length - 1);
    // Ensure the task with id '1' is gone
    const ids = tasks.map(t => t.id);
    expect(ids).not.toContain('1');
    // Ensure other tasks remain unchanged
    expect(tasks).toContainEqual(sampleTasks[1]);
  });

  test('toggleTask flips the completed status of the specified task', () => {
    const tasks = toggleTask('2', sampleTasks);

    // Task with id '2' should have its completed status toggled
    const toggled = tasks.find(t => t.id === '2');
    expect(toggled).toBeDefined();
    expect(toggled.completed).toBe(false); // was true originally

    // Other tasks should remain untouched
    const other = tasks.find(t => t.id === '1');
    expect(other).toEqual(sampleTasks[0]);
  });

  describe('Persistence Layer', () => {
    test('saveTasks stores the tasks array to localStorage', () => {
      saveTasks(sampleTasks);

      // The raw JSON string should be stored under the key 'tasks'
      const stored = window.localStorage.getItem('tasks');
      expect(stored).not.toBeNull();
      const parsed = JSON.parse(stored);
      expect(parsed).toEqual(sampleTasks);
    });

    test('loadTasks retrieves the tasks array from localStorage', () => {
      // First, persist some tasks
      window.localStorage.setItem('tasks', JSON.stringify(sampleTasks));

      const loaded = loadTasks();

      expect(loaded).toEqual(sampleTasks);
    });

    test('loadTasks returns an empty array when nothing is stored', () => {
      // Ensure no tasks key
      window.localStorage.removeItem('tasks');

      const loaded = loadTasks();

      expect(loaded).toEqual([]);
    });
  });
});
