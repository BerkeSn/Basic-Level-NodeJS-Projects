const fs = require('fs').promises;
const path = require("path");

const [key, ...value] = process.argv.slice(2);
const myPath = path.join(__dirname, "notes.txt");

const content = value.join(" ");

async function myFunction(key, content) {
    try {
        if (key === "add") {
            await fs.appendFile(myPath, `${content}\n`, "utf-8");

            // const file = await fs.open(myPath, "a+");
            // file.write(`${value}\n`);
            // file.close();

            console.log("Başarıyla yazıldı.");
        }
        else if (key === "list") {
            const content = await fs.readFile(myPath, "utf-8");
            if (content.length <= 0) {
                console.log("İçi boş")
            } else {
                console.log(content);
            }
        }
        else if (key === "clear") {
            await fs.unlink(myPath);
        }
        else {
            console.log(" Create/Add ==> node index.js add 'Content'\n Reading the file ==> node index.js list\n Clear the file ==> node index.js clear");
        }

    } catch (err) {
        if (err.code === "ENOENT") {
            console.log("Böyle bir dosya yok");
        } else {
            console.log("Bir hata oluştu==> ", err);
        }
    }
}

myFunction(key, content);