const fs = require("fs").promises;
const path = require("path");

const targetPath = path.join(__dirname, "public"); // Hedef Path'i belirler
const SAFE_ROOT = path.resolve(targetPath); // Root'u güvenli hale getirir. (Neden resolve yaptığımızı sormam gerek çünkü targetPath ile aynı çıktıyı dönüyor)
console.log(SAFE_ROOT)

async function myFunction(getPath) {
    try {
        const reqPath = getPath; // Kullanıcıdan gelen path'i değişkene aldım sonra kullanırken karışıklık olmasın diye.
        if (path.isAbsolute(reqPath)) {  // Kullanıcının ana kök dizisine erişmesini engelleyen güvenlik duvarı
            throw new Error("ERİŞİMİNİZ ENGELLENDİ. KÖK DİZİSİ DIŞINA ÇIKILAMAZ")
        }
        const mainPath = path.normalize(path.join(SAFE_ROOT, reqPath));

        const relativePath = path.relative(SAFE_ROOT, mainPath);

        if (relativePath.startsWith("..")) {
            // Kullanıcının kök dizisinde yukarı çıkmasını engelleyen bir güvenlik duvarı (Amacımız public içerisi dışarısı ile işimiz yok.)
            throw new Error("ERİŞİMİNİZ ENGELLENDİ. KÖK DİZİSİ DIŞINA ÇIKILAMAZ")
        }

        const stats = await fs.stat(mainPath); // Dosyanın olup olmadığını kontrol etmek için stat kullanıyoruz.

        if (!stats.isFile()) {
            throw new Error("Böyle bir dosya yok")
        }

        const file = await fs.readFile(mainPath, "utf-8"); // Dosyanın içeriğini okuyup yazdırıyoruz.

        console.log(file);

    } catch (error) {
        console.log(error);
    }
}

myFunction("../config.json")