const fs = require('fs').promises;
const path = require('path');

const targetPath = process.argv[2] ? path.resolve(process.argv[2]) : __dirname;

async function myFunction(pathh) {
    try {
        let folder = 0;
        let file = 0;
        let sumSize = 0;
        const fileList = [];
        const data = await fs.readdir(pathh, { withFileTypes: true, recursive: true }, "utf-8");

        for (const item of data) {
            const isDirectory = item.isDirectory();
            const newPath = path.join(item.parentPath, item.name);
            const stats = await fs.stat(newPath);

            if (isDirectory) {
                folder++
                console.log(stats.mtime);
                console.log("-------------YUKARISI STATS----------------")
            } else {
                sumSize = sumSize + stats.size
                file++;
                fileList.push({
                    name: item.name,
                    size: stats.size,
                    mtime: stats.mtime
                })
            }

        }

        const top3 = fileList.sort((a, b) => b.size - a.size).slice(0, 3);

        // console.log("---------------------------------------------------------")
        console.log("Folder number==> ", folder);
        console.log("File number==> ", file);
        console.log("Folder size==> ", sumSize);
        console.log("fileList ==> ", fileList)
        console.log("Top 3 ==> ", top3);
    } catch (err) {
        console.log(err);
    }
}

myFunction(targetPath);