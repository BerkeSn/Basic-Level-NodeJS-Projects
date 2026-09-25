function askQuestion(question) {
    return new Promise((resolve) => {
        process.stdout.write(question);

        process.stdin.once("data", (data) => {
            resolve(data.toString().trim());
        })
    })
}

async function guessFunction() {
    try {
        console.log(`Welcome to the Number Guessing Game!\nI'm thinking of a number between 1 and 100.\nYou have 5 chances to guess the correct number.`);
        console.log("-------------------------------------");
        let play = true;
        while (play) {
            console.log(`1-Easy (10 Guess)\n2-Medium(5)\n3-Hard(3 Guess)`);

            const difficulty = await askQuestion("Enter your choice: ");

            let guessRights = 0;
            const number = Math.round(Math.random() * 100);

            if (difficulty == "1") {
                guessRights = 10;
            } else if (difficulty == "2") {
                guessRights = 5;

            } else if (difficulty == "3") {
                guessRights = 3;
            } else {
                console.error("Please input something between 1-3");
                process.exit(1);
            }

            console.log("Great! You have selected the difficulty level\nLet's start the game!");

            const answers = [];

            while (guessRights > 0) {
                let answer = await askQuestion("Enter your guess: ");
                answers.push(answer);
                if (answer == number) {
                    console.log(`Congratulations! You guessed the correct number in ${answers.length} attempts.`)
                }
                if (number < answer) {
                    console.log(`Incorrect! The number is less than ${answer}`);
                }
                if (number > answer) {
                    console.log(`Incorrect! The number is greater than ${answer}`);
                }
                guessRights--;
                if (guessRights == 0) {
                    console.log(`You coulnd't find the answer. The number is ==> ${number}`);
                    console.log(`Remaining rights ==> ${guessRights}`);
                }
            }

            const keepPlaying = await askQuestion("Do you want to keep playing (Y/N)==>");
            if (keepPlaying.toUpperCase() == "Y") {
                play = true;
            } else {
                play = false;
            }
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

guessFunction();