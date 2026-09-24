# GitHub User Activity CLI

A simple Command Line Interface (CLI) application built with Node.js to fetch and display the recent activity of a specified GitHub user using the GitHub REST API.

This project uses native Node.js features without any external dependencies or third-party libraries.

---

## Features

- Fetches recent public events for any valid GitHub username.
- Tracks and displays total push activity and repository interactions.
- Handles invalid inputs, missing usernames, and non-existent users gracefully.
- Zero dependencies (relies purely on native fetch and core Node.js modules).

---

## Prerequisites

- Node.js (v18.0.0 or higher is required for native fetch support).

---

## Installation & Setup

1. Clone the repository:
   git clone https://github.com/<your-username>/github-activity.git
   cd github-activity

2. Verify Node.js version:
   node -v

---

## Usage

Run the script by passing a GitHub username as a command-line argument:

node index.js <username>

### Examples

#### 1. Successful Query
node index.js kamranahmedse

Output:
Pushed 3 commits to kamranahmedse/developer-roadmap
Opened a new issue in kamranahmedse/developer-roadmap
Starred kamranahmedse/developer-roadmap

#### 2. User With No Recent Activity
node index.js inactive-user

Output:
There are no repo
Opened nothing
Starred nothing

---

## Error Handling

- Missing Username:
  If you run the command without specifying a username:
  node index.js

  Output:
  Please input username !!!

- Non-Existent User:
  If the username does not exist on GitHub:
  node index.js non_existing_user_123456789

  Output:
  There are no one in this username

---

## License

This project is open-source and available under the MIT License.