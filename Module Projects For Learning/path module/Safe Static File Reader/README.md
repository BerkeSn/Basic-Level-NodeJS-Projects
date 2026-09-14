# 🛡️ Safe Static File Reader

A lightweight Node.js utility designed to serve static files securely by preventing **Directory Traversal (Path Traversal)** attacks using native path resolution methods.

---

## 🎯 Purpose

When applications serve static files based on user inputs, attackers often attempt to read sensitive files outside the public directory using relative path escapes (e.g., `../../etc/passwd` or `../.env`). 

This project demonstrates how to build a strict sandboxing mechanism using native Node.js APIs (`path` and `fs/promises`) without relying on external web frameworks.

---

## 🔒 Security Architecture

The validation workflow enforces a 3-layer security perimeter before any file read operation occurs:

1. **Absolute Path Guard (`path.isAbsolute`):** Rejects any input that provides a raw root directory path (e.g., `/etc/hosts` or `C:\Windows`).
2. **Canonical Normalization (`path.normalize`):** Resolves redundant dots and slashes to get the exact target path.
3. **Sandbox Jailbreak Verification (`path.relative`):** Calculates the relative distance from `SAFE_ROOT` to the normalized path. If the resulting path begins with `..` or evaluates as absolute, the target is outside the sandbox and is immediately aborted.
4. **Target Entity Check (`stats.isFile()`):** Ensures that the resolved path points to a file and not a directory before attempting to stream content.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Core Modules:** `path`, `fs/promises`
- **Dependencies:** None (Zero external packages)

---

## 📂 Project Structure

```text
safe-static-reader/
├── public/
│   ├── index.html
│   └── style.css
├── secret.env       # Critical file outside the sandbox
├── index.js         # Security logic and reader implementation
└── README.md