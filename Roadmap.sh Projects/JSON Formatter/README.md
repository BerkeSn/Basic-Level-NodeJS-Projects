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
