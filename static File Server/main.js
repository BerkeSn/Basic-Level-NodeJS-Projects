const http = require('http');
const path = require('path');
const fs = require('fs');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {
    // 1. İpucu: path.join ile dosya yolu belirleme (varsayılan index.html)
    const fileName = req.url === '/' ? 'index.html' : req.url;
    const filePath = path.join(__dirname, 'public', fileName);

    // 3. İpucu: fs.stat ile dosya mı yoksa klasör mü/var mı denetleme
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // 4. İpucu (ikinci kısım): Dosya yoksa 404 dönme
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('404 Not Found: Dosya bulunamadı.');
        }

        // 2. İpucu: path.extname() ile uzantıyı bulup MIME tipini belirleme
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        // 4. İpucu: fs.readFile ile oku, writeHead ile MIME bas ve res.end() yap
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                return res.end('500 Sunucu Hatası');
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data); // "utf-8" vermedik, Buffer olarak bastık ki resimler bozulmasın
        });
    });
});

server.listen(8000, () => console.log('Sunucu 8000 portunda hazır.'));