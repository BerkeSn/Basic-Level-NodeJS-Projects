const fs = require('fs');
const { Transform } = require('stream');
const { pipeline } = require('stream/promises');

// 1. Regex Desenleri
const PATTERNS = {
    tckn: /\b[1-9]\d{10}\b/g,
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    creditCard: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
};

// 2. Maskeleme Fonksiyonu
function sanitizeText(text) {
    return text
        .replace(PATTERNS.tckn, '***********')
        .replace(PATTERNS.creditCard, '****-****-****-****')
        .replace(PATTERNS.email, (match) => {
            const [user, domain] = match.split('@');
            return `${user[0]}***@${domain}`;
        });
}

// 3. Transform Stream Filtresi
const sanitizerStream = new Transform({
    transform(chunk, encoding, callback) {
        // Buffer verisini metne çevir
        const dirtyText = chunk.toString('utf-8');

        // Filtrele
        const cleanText = sanitizeText(dirtyText);

        // Temizlenen parçayı writable stream'e ilet
        this.push(cleanText);

        // Parçanın işlendiğini bildir
        callback();
    }
});

// 4. Akış Hattı
async function runSanitizer(inputFile, outputFile) {
    try {
        const sourceStream = fs.createReadStream(inputFile, { encoding: 'utf-8' });
        const targetStream = fs.createWriteStream(outputFile);

        // Kaynak -> Filtre -> Hedef
        await pipeline(sourceStream, sanitizerStream, targetStream);

        console.log(`Temizleme tamamlandı: ${outputFile}`);
    } catch (error) {
        console.error('Akış sırasında hata oluştu:', error.message);
    }
}

// Örnek kullanım:
// runSanitizer('input.log', 'clean.log');

module.exports = { runSanitizer, sanitizeText };