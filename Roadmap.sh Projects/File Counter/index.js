const fs = require('fs').promises;
const path = require('path');

const urlPath = process.argv.slice(2);

async function myFunction(req) {
    try {
        const reqUrl = req.toString();
        const baseName = path.basename(reqUrl);
        let lines = 0;
        let words = 0;

        if (reqUrl.length <= 0) {
            console.error("error: please provide a file path")
            process.exit(1)
        }

        const content = await fs.readFile(reqUrl, "utf-8");
        const contentLength = content.toString().length;

        arr = content.split("");
        for (let i = 0; i <= arr.length - 1; i++) {
            if (arr[i] === "\n") {
                lines++;
            }
            if (arr[i] === " ") {
                words++;
            }
        }
        console.log(arr);
        console.log(`File: ${baseName}\nWords: ${words + 2}\nlines: ${lines + 1}\nCharacters: ${contentLength}`);

    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error(`Could not read file: ${req}`)
            process.exit(1)
        } else {
            console.error(err);
            process.exit(1)
        }
    }
}

myFunction(urlPath);