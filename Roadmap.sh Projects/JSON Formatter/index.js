const fs = require('fs').promises;
const path = require("path");

const arg = process.argv[2];

async function myFunction(arg) {
    try {

        if (arg === undefined) {
            console.error("error: please provide a JSON file path")
            process.exit(1);
        }

        const extName = path.extname(arg);

        if (extName != ".json") {
            console.error("Invalid extname");
            process.exit(1);
        }

        const fileContent = await fs.readFile(arg, "utf-8");
        const JsonFormattedContent = JSON.parse(fileContent);
        const stringifyContent = JSON.stringify(JsonFormattedContent, null, 2);

        // console.log(typeof JsonFormattedContent);
        console.log(stringifyContent)
    } catch (err) {
        if (err.code == 'ENOENT') {
            console.error(`error: could not read file: ${arg}`)
            process.exit(1);
        }
        if (err instanceof SyntaxError) {
            console.error(`error: invalid JSON in file: ${arg}`);
            process.exit(1);
        }

        console.error(`error: could not read file: ${arg}`);
        process.exit(1);
    }
}

myFunction(arg);