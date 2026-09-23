const fs = require("fs").promises;
const path = require("path");
const argv = process.argv.slice(2);

async function taskTracker(argv) {
    try {
        // Argüman gelip gelmediğini kontrol ediyorum.
        if (argv.length == 0) {
            console.error("Input something bitch");
            process.exit(1);
        }
        const type = argv[0];



        if (type == "add") {
            const content = argv[1];

            const task = {
                "id": 1,
                "description": content,
                "status": "todo",
                "createdAt": Date.now()
            }

            const file = await fs.readdir("./");

            const taskArray = [];

            taskArray.push(task);

            if (!file.includes("db.json")) {
                await fs.writeFile("db.json", JSON.stringify(taskArray, null, 2), "utf-8");
            } else {
                const fileContent = await fs.readFile("db.json", "utf-8");

                const newFileContent = JSON.parse(fileContent);
                if (newFileContent.length == 0) {
                    task.id = 1;
                    newFileContent.push(task);
                    await fs.writeFile("db.json", JSON.stringify(newFileContent, null, 2), "utf-8");
                } else {
                    let id = newFileContent[newFileContent.length - 1].id;
                    id += 1;
                    console.log(id);
                    task.id = id;

                    // console.log(task);
                    newFileContent.push(task);

                    await fs.writeFile("db.json", JSON.stringify(newFileContent, null, 2), "utf-8");
                }
            }

        }

        if (type == "update") {
            const fileContent = await fs.readFile("db.json", "utf-8");
            const newFileContent = JSON.parse(fileContent);

            const id = argv[1];
            const content = argv[2];

            if (id == undefined) {
                console.error("Please input id")
                process.exit(1);
            }

            if (content == undefined) {
                console.error("Please input content after id")
                process.exit(1);
            }

            const task = newFileContent.find((i) => i.id == id);

            if (!task) {
                console.error(`${id} does not exits`);
                process.exit(1);
            }

            task["description"] = content;
            task["updatedAt"] = Date.now();

            console.log(task);
            console.log(newFileContent);

            await fs.writeFile("db.json", JSON.stringify(newFileContent, null, 2), "utf-8");
            console.log(`${id} updated succesfully`);
        }

        if (type == "delete") {
            const id = argv[1];

            if (id == undefined) {
                console.error("Please input id")
                process.exit(1);
            }

            const fileContent = await fs.readFile("db.json", "utf-8");
            const newFileContent = JSON.parse(fileContent);

            const filteredContent = newFileContent.filter((task) => task.id != id);

            await fs.writeFile("db.json", JSON.stringify(filteredContent, null, 2), "utf-8");

            console.log(`${id} deleted succesfully`);
        }

        if (type == "list") {

            if (argv[1] == undefined) {
                const fileContent = await fs.readFile("db.json", "utf-8");

                console.log(JSON.parse(fileContent));
            }

            if (argv[1] == "done") {
                const fileContent = await fs.readFile("db.json", "utf-8");

                const newFileContent = JSON.parse(fileContent);

                const filteredContent = newFileContent.filter((task) => task["status"] == "done");

                console.log(filteredContent);
            }

            if (argv[1] == "in-progress") {
                const fileContent = await fs.readFile("db.json", "utf-8");

                const newFileContent = JSON.parse(fileContent);

                const filteredContent = newFileContent.filter((task) => task.status == "in-progress");

                console.log(filteredContent);
            }

            if (argv[1] == "todo") {
                const fileContent = await fs.readFile("db.json", "utf-8");
                const newFileContent = JSON.parse(fileContent);

                const filteredContent = newFileContent.filter((task) => task.status == "todo");

                console.log(filteredContent);
            }
        }


        if (type == "mark-in-progress") {
            const fileContent = await fs.readFile("db.json", "utf8");

            const newFileContent = JSON.parse(fileContent);

            const id = argv[1];

            if (id == undefined) {
                console.error("Please input id")
                process.exit(1);
            }

            const task = newFileContent.find((i) => i.id == id);

            if (!task) {
                console.error(`${id} does not exits`);
                process.exit(1);
            }

            task["status"] = "in-progress";
            task["updatedAt"] = Date.now();

            // console.log(task);
            // console.log(newFileContent);

            await fs.writeFile("db.json", JSON.stringify(newFileContent, null, 2), "utf-8");
        }

        if (type == "mark-done") {
            const fileContent = await fs.readFile("db.json", "utf-8");
            const id = argv[1];

            if (id == undefined) {
                console.error("Please input id")
                process.exit(1);
            }

            const newFileContent = JSON.parse(fileContent);

            const task = newFileContent.find((i) => i["id"] == id);


            if (!task) {
                console.error(`${id} does not exits`)
                process.exit(1);
            }

            task.status = "done";
            task["updatedAt"] = Date.now();

            // console.log(task);
            // console.log(newFileContent);

            await fs.writeFile("db.json", JSON.stringify(newFileContent, null, 2), "utf-8");
        }


    } catch (error) {
        if (error.code == "ENOENT") {
            console.error("There are no file. You should add it first");
            process.exit(1)
        }
        if (error instanceof TypeError) {
            console.error("NO such a properties")
            process.exit(1);
        }
        console.error(error);
        process.exit(1);
    }
}

taskTracker(argv);