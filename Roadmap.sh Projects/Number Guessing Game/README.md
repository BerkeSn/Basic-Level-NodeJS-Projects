# Number Guessing Game (CLI)

A simple, interactive command-line interface (CLI) number guessing game built with pure Node.js. The computer picks a random number between 1 and 100, and the player tries to guess it within a limited number of attempts based on the chosen difficulty level.

This project is an implementation of the [Roadmap.sh Number Guessing Game](https://roadmap.sh/projects/number-guessing-game) challenge.

---

## Features

- **Zero External Dependencies:** Built entirely with standard Node.js runtime APIs (`process.stdin`, `process.stdout`, native Promises).
- **Difficulty Selection:** Choose your challenge level with dynamically adjusted guess limits:
  - **Easy:** 10 chances
  - **Medium:** 5 chances
  - **Hard:** 3 chances
- **Real-time Hints:** Dynamic feedback after every guess telling you if the target number is greater or less than your input.
- **Attempt Tracking:** Keeps count of how many attempts you made before finding the number.
- **Multiple Rounds:** Replayability support—start a new game right after finishing a round without restarting the CLI process.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.0.0 or higher recommended)

---

## Installation
1. **Run the game:**
   ```bash
   node index.js
   ```
   *(Replace `index.js` with your script's filename if different).*

---

## How to Play

1. When the game starts, select your preferred difficulty level (`1`, `2`, or `3`).
2. Read the prompt and type your numeric guess between `1` and `100`.
3. Follow the hints provided after each incorrect guess:
   - `The number is less than X`
   - `The number is greater than X`
4. Win the game by guessing the correct number before running out of attempts.
5. Once the round ends, type `Y` to play another round or `N` to exit.