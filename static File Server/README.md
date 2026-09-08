# Simple Static File Server (Node.js)

Node.js dahili `http` ve `fs` modülleri kullanılarak geliştirilmiş, `public/` dizinindeki dosyaları sunmayı ve dizin içeriğini listelemeyi amaçlayan temel seviye bir statik dosya sunucusu prototipi.

---

## Özellikler

- Harici bağımlılık (npm paketi) gerektirmez; tamamen yerel Node.js API'leri ile çalışır.
- `public/` klasöründeki dosyaları istemciye sunar.
- Eşleşmeyen bir istek geldiğinde dizindeki mevcut dosyaların adlarını metin formatında döner.

---

## Proje Yapısı

```text
.
├── server.js          # Sunucu kaynak kodu
├── public/            # Sunulacak statik dosyalar
│   ├── index.html
│   └── style.css
└── README.md