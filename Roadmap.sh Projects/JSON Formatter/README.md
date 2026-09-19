https://roadmap.sh/projects/nodejs-json-formatter
# JSON Formatter CLI

A lightweight Node.js command-line interface (CLI) tool that reads a JSON file, validates its structure, and prints beautifully indented (pretty-printed) JSON output directly to the terminal.

---

## Features

- **Pretty-Print Output:** Automatically indents valid JSON with 2-space formatting.
- **Robust Error Handling:** Distinguishes between missing arguments, missing files, permission issues, and invalid JSON syntax.
- **Standard Stream Compliant:** Prints formatted content to `stdout` and all error messages to `stderr`.
- **Exit Codes:** Exits with a non-zero status code (`1`) on any failure, making it ideal for CI/CD pipelines and shell scripting.

---

## Requirements

- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)

---

## File Setup

Create the following files in your project directory:

### 1. `json-formatter.js`

```javascript
const fs = require('node:fs/promises');

const filePath = process.argv[2];

async function formatJson(file) {
  // 1. Check if argument is provided
  if (!file) {
    console.error('error: please provide a JSON file path');
    process.exit(1);
  }

  try {
    // 2. Read file content
    const fileContent = await fs.readFile(file, 'utf-8');

    // 3. Parse and format JSON
    const parsedData = JSON.parse(fileContent);
    const formattedJson = JSON.stringify(parsedData, null, 2);

    console.log(formattedJson);
  } catch (err) {
    // 4. Differentiate error types
    if (err.code === 'ENOENT') {
      console.error(`error: could not read file: ${file}`);
    } else if (err instanceof SyntaxError) {
      console.error(`error: invalid JSON in file: ${file}`);
    } else {
      console.error(`error: could not read file: ${file}`);
    }
    process.exit(1);
  }
}

formatJson(filePath);