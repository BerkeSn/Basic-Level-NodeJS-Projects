const fs = require('fs').promises;
const path = require("path");

const myPath = path.join(__dirname, 'logs');

const now = new Date().toISOString().split("T")[0];
console.log(now);

async function myFunction() {
    try {
        const files = await fs.readdir(myPath, {
            withFileTypes: true,
        })

        const newPath = path.join(myPath, `archive-${now}`); // Oluşturulacak klasörün adı.
        await fs.mkdir(newPath, { recursive: true }); // Klasör oluşturuldu.

        for (const file of files) {
            if (path.extname(file.name) === ".log") {
                const fullPath = path.join(file.parentPath, file.name);
                const stats = await fs.stat(fullPath);

                if (stats.size >= 1024) { // Boyun kontrolü yapılacak yer. 1mb'dan büyük ise yeni bir dosyaya atayacağım.

                    const oldPath = path.join(myPath, file.name); // Güncel konumları alındı.

                    const newesPath = path.join(newPath, file.name); // Taşınılacak yerleri belirtildi

                    await fs.rename(oldPath, newesPath); // Taşınıldı.

                    const newFiles = await fs.open(oldPath, "w+"); // Aynı isim ile yeni file'lar oluşturuldu.
                    newFiles.close(); // file'lar kapatıldı.

                }
            }
        }

    } catch (err) {
        console.log(err);
    }
}

myFunction();