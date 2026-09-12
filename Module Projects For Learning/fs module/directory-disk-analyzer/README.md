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