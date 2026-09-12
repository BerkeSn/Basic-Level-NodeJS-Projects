# CLI Notes App

Node.js yerel modülleri (`fs/promises` ve `path`) kullanılarak geliştirilmiş, komut satırı üzerinden hızlıca not ekleme, listeleme ve temizleme imkanı sunan hafif bir CLI (Command Line Interface) aracı.

---

## Özellikler

- **Sıfır Bağımlılık (Zero-Dependency):** Harici npm paketi gerektirmez; tamamen Node.js çekirdek kütüphaneleriyle çalışır.
- **Asenkron Mimari:** `fs.promises` ve `async/await` yapısı ile bloke etmeyen (non-blocking) I/O işlemleri.
- **Platform Bağımsızlığı:** `path.join` ile işletim sisteminden bağımsız dosya yolu yönetimi.
- **Hata Yönetimi:** Dosya bulunamadığında (`ENOENT`) çökmeden kullanıcı dostu uyarılar dönen mekanizma.

---

## Proje Yapısı

```text
.
├── index.js      # Uygulama ana kaynak kodu
├── notes.txt     # Notların tutulduğu metin dosyası (ilk notta otomatik oluşur)
└── README.md
```