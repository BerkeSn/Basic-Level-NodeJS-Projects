const path = require('path');
const fs = require("fs").promises;

const myPath = `C:/Users/berke/OneDrive/Desktop/deneme`

async function myFunction() {
    try {
        const files = await fs.readdir(myPath);
        console.log(files);

        for (const file of files) {
            console.log(`${file} ==> ${path.extname(file)}`);

            const stats = await fs.stat(path.join(myPath, `${file}`));
            // console.log(stats);

            if (stats.isFile()) {
                if (path.extname(file) == ".jpg" || path.extname(file) == ".avif") {
                    if (!files.includes("images")) {
                        await fs.mkdir(`${myPath}/images`)
                        console.log("images oluşturuldu.")
                    }
                    await fs.rename(`${myPath}/${file}`, `${myPath}/images/${file}`)
                }

                if (path.extname(file) == ".pdf" || path.extname(file) == ".txt") {
                    if (!files.includes("document")) {
                        await fs.mkdir(`${myPath}/document`)
                        console.log("Document oluşturuldu")
                    }
                    await fs.rename(`${myPath}/${file}`, `${myPath}/document/${file}`)
                }

                if (path.extname(file) == ".js" || path.extname(file) == ".json") {
                    if (!files.includes("code")) {
                        await fs.mkdir(`${myPath}/code`)
                        console.log("Code oluşturuldu")
                    }
                    await fs.rename(`${myPath}/${file}`, `${myPath}/code/${file}`)
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

myFunction();