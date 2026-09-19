https://roadmap.sh/projects/nodejs-github-profile-details

# GitHub User Info CLI

A lightweight Node.js command-line tool that fetches and displays essential public profile details for any GitHub user using the official GitHub REST API.

---

## Features

- Fetches live data directly from the GitHub REST API (`/users/{username}`).
- Displays core profile metadata in the terminal:
  - Display Name
  - Username (login)
  - Profile API URL
  - Public repository count
  - Follower count
- Basic input validation and error handling.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended, as native `fetch` is supported out of the box).

---

## Installation

1. Clone or download this repository:
   ```bash
   git clone [https://github.com/BerkeSn/github-user-info.git](https://github.com/BerkeSn/github-user-info.git)
   cd github-user-info