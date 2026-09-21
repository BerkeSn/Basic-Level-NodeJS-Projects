# Environment Variable Checker CLI

A simple, lightweight Node.js command-line tool to verify whether required environment variables are set in the current execution environment before running an application.

---

## Overview

Applications rely on environment variables for configuration details such as database credentials, API keys, and feature flags. This CLI accepts variable names via terminal arguments, validates their presence in `process.env`, and reports status without leaking sensitive values.

---

## Features

- **Zero External Dependencies:** Built entirely with core Node.js APIs (`process.argv`, `process.env`, `process.exitCode`).
- **Security Conscious:** Verifies existence without printing variable values.
- **Proper Stream Routing:** Standard output for successful checks, `stderr` for errors.
- **CI/CD Ready:** Returns non-zero exit codes on failure for easy build-pipeline integration.

---

## Usage

Run the script using `node` and supply one or more environment variable names:

```bash
node env-checker.js <VARIABLE_NAME_1> [VARIABLE_NAME_2 ...]