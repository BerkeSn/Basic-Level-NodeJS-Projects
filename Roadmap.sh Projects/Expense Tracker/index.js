const fs = require('fs').promises;
const arg = process.argv.slice(2);

async function expenseTracker(arg) {
    try {
        if (arg.length == 0) {
            console.error("Please input a type");
            process.exit(1);
        }

        const type = arg[0];

        if (type == "add") {
            const description = arg[1];
            if (description == undefined) {
                console.error("Please input description");
                process.exit(1);
            }
            const price = arg[2];
            if (price == undefined) {
                console.error("Please input price");
                process.exit(1);
            }

            if (parseInt(price) <= 0) {
                console.error("Price have to be bigger than 0");
                process.exit(1);
            }

            const now = new Date();

            const day = now.getDay();
            const month = now.getMonth();
            const year = now.getFullYear();

            const expense = {
                description: description,
                price: price,
                createdAt: `${day}-${month}-${year}`
            }

            const folder = await fs.readdir('./', "utf-8");

            if (!folder.includes('db.json')) {
                let id = 1;
                expense.id = id
                const expenseArray = [];
                expenseArray.push(expense);
                await fs.writeFile('db.json', JSON.stringify(expenseArray, null, 2), "utf-8");
                return;
            } else {
                const expenseFile = await fs.readFile('db.json', "utf-8");
                const parsedFile = JSON.parse(expenseFile);
                let lastId;

                if (parsedFile.length == 0) {
                    lastId = 0;
                } else {
                    lastId = parsedFile[parsedFile.length - 1].id;
                }

                expense.id = lastId + 1;
                parsedFile.push(expense);

                await fs.writeFile('db.json', JSON.stringify(parsedFile, null, 2), "utf-8");
                return;
            }

        }

        const folder = await fs.readdir('./', "utf-8");

        if (!folder.includes("db.json")) {
            console.error("There are no record. Please add something first");
            process.exit(1);
        }

        if (type == "list") {
            const fileContent = await fs.readFile('db.json', "utf-8");

            if (arg[1] == undefined) {
                console.log(JSON.parse(fileContent));
            }
        }

        if (type == "delete") {
            if (arg[1] == undefined) {
                console.error("Please input Id whice one do you want to delete");
                process.exit(1);
            }

            const id = arg[1];

            let expense = await fs.readFile('db.json', "utf-8");

            expense = JSON.parse(expense);

            const j = expense.find((i) => i.id == id);

            if (!j) {
                console.error(`Id: ${id} does not exits`);
                process.exit(1);
            }

            expense = expense.filter((i) => i.id != id);

            await fs.writeFile("db.json", JSON.stringify(expense, null, 2), "utf-8");

            console.log(`${id} deleted succesfully`);
            console.log(expense);

        }

        if (type == "summary") {
            const expenses = await fs.readFile('db.json', "utf-8");
            const parsedExpenses = JSON.parse(expenses);
            let sum = 0;

            // console.log(parseInt(arg[1]));

            if (typeof arg[1] == undefined) {
                parsedExpenses.forEach((i) => {
                    sum += parseInt(i.price);
                })

                console.log(`Summarize of your expenses is ==> ${sum}`);
                return
            }

            if (parseInt(arg[1]) <= 0) {
                console.error("Month cannot be negative value or 0");
                process.exit(1);
            }

            if (parseInt(arg[1]) > 0) {
                const filteredArray = [];

                parsedExpenses.filter((i) => {
                    const month = i.createdAt.slice(2)[0];
                    if (month == arg[1]) {
                        filteredArray.push(i);
                    }
                })

                console.log(filteredArray);
            }
        }


    } catch (err) {
        if (err.code == "ENOENT") {
            console.error("There is db.json");
            process.exit(1);
        }
        console.error(err);
        process.exit(1);
    }
}

expenseTracker(arg);