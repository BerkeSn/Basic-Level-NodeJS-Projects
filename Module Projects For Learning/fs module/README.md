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
_____________________________________________________________

# Directory Disk Analyzer (CLI)

Node.js dahili `fs/promises` ve `path` modülleri kullanılarak geliştirilmiş, belirtilen bir dizini alt klasörleriyle birlikte derinlemesine (recursive) tarayan, toplam boyutu hesaplayan ve diskte en çok yer kaplayan dosyaları raporlayan bir CLI aracı.

---

## Özellikler

- **Sıfır Bağımlılık (Zero-Dependency):** Harici bir npm paketine ihtiyaç duymadan saf Node.js mimarisiyle çalışır.
- **Özyinelemeli (Recursive) Tarama:** `withFileTypes: true` ve `recursive: true` yetenekleri sayesinde tüm alt klasör hiyerarşisini tek adımda çözer.
- **Performans Odaklı İnceleme:** `fs.stat` sorgusunu sadece dosyalar için çalıştırarak klasörler üzerindeki gereksiz disk I/O maliyetini engeller.
- **Esnek Dizin Hedefleme:** Terminalden parametre alırsa o dizini, almazsa uygulamanın çalıştığı mevcut dizini otomatik analiz eder.
- **Top 3 Dosya Raporu:** Disk kullanımını optimize etmek için en büyük 3 dosyayı boyut ve son değiştirilme zamanlarıyla listeler.

---

## Proje Yapısı

```text
.
├── index.js      # Dizin analiz mantığının bulunduğu kaynak kod

```

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