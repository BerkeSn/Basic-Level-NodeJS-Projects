const { readdir } = require('node:fs/promises');
const path = require('node:path');

const inputPath = process.argv[2];
const folderPath = inputPath ? path.resolve(inputPath) : process.cwd();

let entries;

async function main() {
    try {
        entries = await readdir(folderPath, { withFileTypes: true });
    } catch {
        console.error(`error: could not read folder: ${inputPath || folderPath}`);
    }

    if (entries) {
        const fileCount = entries.filter((entry) => entry.isFile()).length;
        const folderCount = entries.filter((entry) => entry.isDirectory()).length;

        console.log(`Folder: ${path.basename(folderPath)}`);
        console.log(`Path: ${folderPath}`);
        console.log(`Files: ${fileCount}`);
        console.log(`Folders: ${folderCount}`);
    }
}

main();