# 📂 File Sorter CLI

A lightweight, zero-dependency Node.js automation script that organizes cluttered directories by sorting files into categorical folders based on their extensions.

---

## 🚀 Features

- **Automated Categorization:** Automatically routes files into designated folders based on file extensions.
  - **Images:** `.jpg`, `.avif`, `.png`
  - **Documents:** `.pdf`, `.txt`, `.docx`
  - **Code:** `.js`, `.json`, `.ts`
- **Zero External Dependencies:** Built entirely using native Node.js modules (`path` and `fs/promises`).
- **Safe Directory Creation:** Uses recursive directory creation (`mkdir` with `{ recursive: true }`) to prevent existing folder conflicts (`EEXIST`).
- **Path Normalization:** Uses native path methods for clean, cross-platform file routing.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (v14.14+ recommended)
- **Core Modules:** `fs/promises`, `path`

---

## 📦 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine:
```bash
node -v