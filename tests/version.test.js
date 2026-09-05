import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve path to the root index.html from the test file location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexPath = path.resolve(__dirname, '..', 'index.html');

// Read the HTML content
const content = fs.readFileSync(indexPath, 'utf8');

// Regular expression to match the version span exactly
const versionRegex = /<span[^>]*id=["']app-version["'][^>]*>\s*v1\.0\.1\s*<\/span>/;

// Assert that the version element exists with the correct text
assert(
  versionRegex.test(content),
  'Version element with id="app-version" and text "v1.0.1" not found in index.html'
);

console.log('✅ Version badge test passed.');
