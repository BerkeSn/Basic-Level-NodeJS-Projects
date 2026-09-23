# Task Tracker CLI

A lightweight command-line interface (CLI) tool built with Node.js to track, update, and manage your daily tasks. All tasks are persisted locally in a structured JSON file (`db.json`) using native Node.js APIs without external dependencies.

---

## Features

- **Zero External Dependencies:** Built entirely with Node.js built-in modules (`fs/promises`, `path`, `process`).
- **Persistent Local Storage:** Auto-generates and updates `db.json` with formatted JSON (`null, 2`).
- **CRUD Operations:** Full support for adding, updating, deleting, and listing tasks.
- **Status Filtering:** List all tasks or filter directly by status (`todo`, `in-progress`, `done`).
- **Audit Timestamps:** Tracks creation and modification times (`createdAt`, `updatedAt`) using epoch timestamps.

---

## Data Model

Each task in `db.json` adheres to the following structure:

```json
{
  "id": 1,
  "description": "Buy groceries",
  "status": "todo",
  "createdAt": 1718000000000,
  "updatedAt": 1718000000000
}
```

Available statuses:
- `todo`: Newly created task awaiting action.
- `in-progress`: Currently ongoing task.
- `done`: Completed task.

---

## Installation & Setup

1. Ensure you have [Node.js](https://nodejs.org/) installed (v16+ recommended).
2. Save the script file as `taskTracker.js` in your desired directory.
3. Open your terminal in that directory.

---

## Usage & Commands

Run the CLI using `node taskTracker.js` followed by the action command and its parameters:

### 1. Add a New Task
```bash
node taskTracker.js add "Buy groceries"
```

### 2. Update a Task Description
```bash
node taskTracker.js update 1 "Buy groceries and cook dinner"
```

### 3. Delete a Task
```bash
node taskTracker.js delete 1
```

### 4. Mark Task Status
Mark a task as currently in-progress:
```bash
node taskTracker.js mark-in-progress 1
```

Mark a task as completed:
```bash
node taskTracker.js mark-done 1
```

### 5. List Tasks

List all recorded tasks:
```bash
node taskTracker.js list
```

List tasks by specific status:
```bash
node taskTracker.js list todo
node taskTracker.js list in-progress
node taskTracker.js list done
```

---

## Error Handling & Exit Codes

The tool validates command arguments and file system states, returning `process.exit(1)` on errors:

| Scenario | Handled Message |
| :--- | :--- |
| **No arguments provided** | Prints error prompt to `stderr` and exits. |
| **Missing required ID/Content** | Prints parameter validation warning. |
| **Target ID does not exist** | Notifies `<ID> does not exits`. |
| **File not initialized (`ENOENT`)** | Notifies that `db.json` is missing and must be initialized via `add`. |