# Expense Tracker CLI

A lightweight Command Line Interface (CLI) application built with Node.js to track, delete, list, and summarize personal expenses locally using a JSON file.

This project is built using native Node.js core modules (`fs/promises`) with zero external dependencies.

---

## Features

- Add expenses with a description, price, and auto-generated timestamp.
- List all recorded expenses in JSON format.
- Delete an expense by its unique ID.
- View total summarized expenses or filter expenses by month.
- Auto-initializes and updates a local `db.json` database.

---

## Prerequisites

- Node.js (v14.0.0 or higher).

---

## Installation & Setup

1. Clone or download the repository files:
   git clone https://github.com/<your-username>/expense-tracker.git
   cd expense-tracker

2. Verify Node.js installation:
   node -v

---

## Usage

Run the script by passing the command type followed by its required arguments:

node index.js <command> [arguments]

---

### Commands & Examples

#### 1. Add an Expense
Add a new expense by providing a description and price:

node index.js add Lunch 20
node index.js add Dinner 10

Data is appended to `db.json` with an auto-incremented ID and the current date (`DD-MM-YYYY`).

#### 2. List Expenses
View all stored expenses:

node index.js list

Output:
[
  {
    "description": "Lunch",
    "price": "20",
    "createdAt": "4-8-2026",
    "id": 1
  },
  {
    "description": "Dinner",
    "price": "10",
    "createdAt": "4-8-2026",
    "id": 2
  }
]

#### 3. Delete an Expense
Remove an expense by providing its ID:

node index.js delete 2

Output:
2 deleted succesfully
[
  {
    "description": "Lunch",
    "price": "20",
    "createdAt": "4-8-2026",
    "id": 1
  }
]

#### 4. Summary of Expenses
Calculate the total sum of all expenses:

node index.js summary

Output:
Summarize of your expenses is ==> 20

Filter the summary by month:

node index.js summary 8

Output:
[
  {
    "description": "Lunch",
    "price": "20",
    "createdAt": "4-8-2026",
    "id": 1
  }
]

---

## Error Handling

- Missing Command Type:
  node index.js
  Output: Please input a type

- Missing Parameters on Add:
  node index.js add
  Output: Please input description

- Invalid Price:
  node index.js add Lunch -5
  Output: Price have to be bigger than 0

- Missing Database:
  Running `list`, `delete`, or `summary` before any expense is added:
  Output: There are no record. Please add something first

- Non-Existent ID on Delete:
  node index.js delete 999
  Output: Id: 999 does not exits

---

## License

This project is open-source and available under the MIT License.