// tests/task.test.js - Unit tests for Task Logic
import assert from 'node:assert';
import {
  createTask,
  deleteTask,
  toggleTask,
  saveTasks,
  loadTasks
} from '../src/task.js';

// Setup mock window.localStorage if running in Node
if (typeof globalThis.window === 'undefined') {
  const store = new Map();
  globalThis.window = {
    localStorage: {
      getItem: (k) => store.get(k) || null,
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
      clear: () => store.clear()
    }
  };
}

console.log("Running Unit Tests for Task Logic...");

// 1. Test createTask
const sampleTasks = [
  { id: '1', name: 'First task', completed: false },
  { id: '2', name: 'Second task', completed: true }
];

const added = createTask('New Task', sampleTasks);
assert.strictEqual(added.length, 3, "createTask should increment task list length");
assert.strictEqual(added[2].name, 'New Task', "createTask should assign correct name");
assert.strictEqual(added[2].completed, false, "createTask should default to completed: false");
console.log("✓ createTask passed");

// 2. Test deleteTask
const deleted = deleteTask('1', sampleTasks);
assert.strictEqual(deleted.length, 1, "deleteTask should decrement task list length");
assert.strictEqual(deleted[0].id, '2', "deleteTask should remove only target id");
console.log("✓ deleteTask passed");

// 3. Test toggleTask
const toggled = toggleTask('1', sampleTasks);
assert.strictEqual(toggled[0].completed, true, "toggleTask should flip false to true");
const toggledBack = toggleTask('2', sampleTasks);
assert.strictEqual(toggledBack[1].completed, false, "toggleTask should flip true to false");
console.log("✓ toggleTask passed");

// 4. Test Persistence
window.localStorage.clear();
saveTasks(sampleTasks);
const loaded = loadTasks();
assert.strictEqual(loaded.length, 2, "loadTasks should retrieve saved tasks");
assert.strictEqual(loaded[0].name, 'First task', "loadTasks should preserve task attributes");
console.log("✓ saveTasks and loadTasks passed");

console.log("All task logic unit tests passed successfully!");
process.exit(0);
