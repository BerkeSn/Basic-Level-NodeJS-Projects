https://roadmap.sh/projects/nodejs-file-counter

# File Counter CLI

A lightweight command-line tool built with Node.js that analyzes and counts lines, words, and characters in any given text file.

---

## Features

- **Line Counting:** Counts total lines in the file.
- **Word Counting:** Parses words separated by whitespace and line breaks.
- **Character Counting:** Computes the total character count, including whitespace and newlines.
- **Safe Error Handling:** Streams friendly error messages to `stderr` and exits with code `1` on failure.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)

---

## Setup

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd file-counter
```

Create a sample file to test:

```bash
echo "Node makes CLI tools useful.
Files are common input." > notes.txt
```

---

## Usage

Run the tool by passing the target file path as an argument:

```bash
node file-counter.js <path-to-file>
```

### Examples

**1. Normal execution:**

```bash
node file-counter.js notes.txt
```

*Output:*
```text
File: notes.txt
Lines: 2
Words: 9
Characters: 52
```

**2. Missing file path argument:**

```bash
node file-counter.js
```

*Stderr Output (Exit Code: 1):*
```text
error: please provide a file path
```

**3. Target file does not exist:**

```bash
node file-counter.js missing.txt
```

*Stderr Output (Exit Code: 1):*
```text
error: could not read file: missing.txt
```

---

## Tech Stack

- **`node:process`** – Reading command-line arguments (`process.argv`) and managing process lifecycle (`process.exit`).
- **`node:fs/promises`** – Reading file contents asynchronously via `fs.readFile`.
- **`node:path`** – Extracting clean filenames using `path.basename`.

---

## License

This project is licensed under the MIT License.