const fs = require('node:fs');
const zlib = require('node:zlib');
const { Transform, PassThrough } = require('node:stream');
const { pipeline } = require('node:stream/promises');

// 1. Regex Desenleri (E-posta ve Kredi Kartı)
const PATTERNS = {
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    creditCard: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
};

// 2. Maskeleme Fonksiyonu
function sanitizeText(text) {
    return text
        .replace(PATTERNS.creditCard, '****-****-****-****')
        .replace(PATTERNS.email, (match) => {
            const [user, domain] = match.split('@');
            return `${user[0]}***@${domain}`;
        });
}

// 3. Maskeleyici Transform Stream
function createSanitizerStream() {
    return new Transform({
        transform(chunk, encoding, callback) {
            const dirtyText = chunk.toString('utf-8');
            const cleanText = sanitizeText(dirtyText);
            this.push(cleanText);
            callback();
        }
    });
}

// 4. CLI Mantığı ve Ana Akış Fonksiyonu
async function sanitizeAndCompress(inputPath, cleanOutputPath, gzipOutputPath) {
    console.log(`İşlem başlatılıyor: ${inputPath}`);

    // Ara dağıtıcı (Forking) stream
    const cleanFork = new PassThrough();

    // 1. Hat: Kaynak -> Transform -> PassThrough
    const sourceStream = fs.createReadStream(inputPath);
    const sanitizer = createSanitizerStream();
    const sourcePipeline = pipeline(sourceStream, sanitizer, cleanFork);

    // 2. Hat: PassThrough -> Düz Temiz Dosya (.log)
    const fileTarget = fs.createWriteStream(cleanOutputPath);

    // 3. Hat: PassThrough -> Gzip -> Sıkıştırılmış Dosya (.log.gz)
    const gzipTarget = fs.createWriteStream(gzipOutputPath);
    const gzipCompressor = zlib.createGzip();

    // cleanFork'tan iki ayrı hedefe veri akışını besliyoruz
    cleanFork.pipe(fileTarget);
    cleanFork.pipe(gzipCompressor).pipe(gzipTarget);

    // Kaynak akışın ve hedef yazımların bitmesini bekliyoruz
    await sourcePipeline;

    await Promise.all([
        new Promise((resolve, reject) => {
            fileTarget.on('finish', resolve);
            fileTarget.on('error', reject);
        }),
        new Promise((resolve, reject) => {
            gzipTarget.on('finish', resolve);
            gzipTarget.on('error', reject);
        })
    ]);

    console.log('İşlem başarıyla tamamlandı!');
    console.log(`Temiz log dosyası: ${cleanOutputPath}`);
    console.log(`Sıkıştırılmış dosya: ${gzipOutputPath}`);
}

// 5. CLI Argüman Yönetimi
async function main() {
    const args = process.argv.slice(2);
    const inputFile = args[0] || 'app.log';
    const cleanFile = args[1] || 'clean.log';
    const gzFile = args[2] || `${cleanFile}.gz`;

    if (!fs.existsSync(inputFile)) {
        console.error(`Hata: Girdi dosyası bulunamadı -> ${inputFile}`);
        process.exit(1);
    }

    try {
        await sanitizeAndCompress(inputFile, cleanFile, gzFile);
    } catch (err) {
        console.error('Akış sırasında beklenmeyen bir hata oluştu:', err);
        process.exit(1);
    }
}

main();