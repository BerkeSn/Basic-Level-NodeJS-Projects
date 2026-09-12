

# Log Rotator CLI

Node.js çekirdek modülleri (`fs/promises` ve `path`) ile geliştirilmiş; belirli bir boyutu aşan log dosyalarını tarihe göre arşivleyen, kesintisiz log akışı için boş log dosyalarını yeniden başlatan ve eski arşivleri temizleyen hafif bir CLI aracı.

---

## Özellikler

- **Sıfır Dış Bağımlılık (Zero-Dependency):** Harici npm paketi kurmadan doğrudan Node.js çalışma ortamında çalışır.
- **Otomatik Dizin Oluşturma:** Arşivlenecek dosyalar için bugünün tarihine (`YYYY-MM-DD`) uygun klasörü `fs.mkdir({ recursive: true })` ile otomatik oluşturur.
- **Boyut Tabanlı Rotasyon:** Yalnızca `.log` uzantılı ve boyutu belirlenen eşiği (1 KB / 1024 bayt) aşan dosyaları hedefler.
- **Kesintisiz Süreç (Atomic-like Reset):** Log dosyası arşive taşındıktan (`fs.rename`) hemen sonra orijinal konumunda 0 baytlık boş hali oluşturulur (`w+` / `writeFile`).
- **Eski Arşiv Temizliği (`--cleanup`):** 7 günden daha eski arşiv klasörlerini `fs.rm` ile temizleyerek disk şişmesini engeller.

---

## Proje Yapısı

```text
.
├── index.js          # Log rotasyon ve temizleme mantığı
├── logs/             # Log dosyalarının bulunduğu çalışma dizini
│   ├── app.log
│   ├── error.log
│   └── archive-2026-09-12/  # Otomatik oluşturulan arşiv dizinleri
└── README.md