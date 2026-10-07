# Workout & User Management REST API

Bu proje; kullanıcı ve antrenman (workout) verilerini yerel JSON dosyaları (`db.json` ve `workouts.json`) üzerinde yöneten, Node.js ve Express.js ile geliştirilmiş hafif bir RESTful API'dir.

---

## 🚀 Başlangıç

### Gereksinimler
- [Node.js](https://nodejs.org/) (v16 veya üzeri önerilir)
- npm veya yarn

### Kurulum

1. Depoyu klonlayın:
```bash
git clone <repo-url>
cd <proje-adi>
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Uygulamayı başlatın:
```bash
npm start
```
*(Geliştirme modunda nodemon kullanıyorsanız: `npm run dev`)*

Varsayılan sunucu adresi: `http://localhost:3000` *(veya yapılandırdığınız PORT)*

---

## 🗄️ Veri Depolama Yapısı

Veritabanı yerine dosya sistemi tabanlı JSON depolama kullanılmaktadır:
- `db.json`: Kullanıcı bilgilerini saklar.
- `workouts.json`: Antrenman kayıtlarını saklar.

---

## 📌 API Uç Noktaları (Endpoints)

> **Not:** Rotalarınız ana sunucu dosyasında (örneğin `app.js` veya `server.js`) `/api/users` ve `/api/workouts` gibi öneklerle tanımlandıysa istek URL'lerini buna göre güncelleyebilirsiniz.

### 👤 Kullanıcı İşlemleri (`/users`)

| Metot | Uç Nokta | Açıklama | İstek Gövdesi (Body) |
| :--- | :--- | :--- | :--- |
| `GET` | `/getUsers` | Tüm kullanıcıları listeler | Yok |
| `GET` | `/getUserById/:id` | ID'ye göre belirli bir kullanıcıyı getirir | Yok |
| `POST` | `/createUser` | Yeni bir kullanıcı kaydı oluşturur | JSON (Kullanıcı verileri) |
| `PUT` | `/updateUser/:id` | ID'si verilen kullanıcıyı günceller | JSON (Güncellenecek alanlar) |
| `DELETE` | `/deleteUser/:id` | ID'si verilen kullanıcıyı siler | Yok |

#### Örnek Kullanıcı Payload (POST / PUT)
```json
{
  "name": "Berke Şen",
  "email": "berke@example.com"
}
```

---

### 🏋️ Antrenman İşlemleri (`/workouts`)

| Metot | Uç Nokta | Açıklama | İstek Gövdesi (Body) |
| :--- | :--- | :--- | :--- |
| `GET` | `/getWorkouts` | Tüm antrenman kayıtlarını listeler | Yok |
| `GET` | `/getWorkoutsById/:id` | ID'ye göre belirli bir antrenmanı getirir | Yok |
| `POST` | `/createWorkouts` | Yeni bir antrenman kaydı ekler | JSON (Antrenman detayları) |
| `PUT` | `/updateWorkout/:id` | ID'si verilen antrenmanı günceller | JSON (Güncellenecek alanlar) |
| `DELETE` | `/deleteWorkout/:id` | ID'si verilen antrenmanı siler | Yok |

#### Örnek Antrenman Payload (POST / PUT)
```json
{
  "userId": 1,
  "title": "Üst Vücut Split",
  "exercises": [
    { "name": "Bench Press", "sets": 4, "reps": 8 },
    { "name": "Barbell Row", "sets": 4, "reps": 10 }
  ],
  "date": "2026-10-07"
}
```

---

## 🛠️ Kullanılan Teknolojiler

- **Node.js**: JavaScript çalışma zamanı ortamı
- **Express.js**: Hızlı ve minimalist web çatısı
- **File System (fs)**: Yerel JSON dosyalarını okuma ve yazma işlemleri