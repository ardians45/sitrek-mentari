# 🛰️ SITREK Mentari

![Icon](assets/icon.png)

[![Version](https://img.shields.io/badge/version-2.0.1-blue.svg?style=for-the-badge)](https://github.com/your-repo)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge-lightgrey.svg?style=for-the-badge)](https://mentari.unpam.ac.id)

**SITREK Mentari** adalah ekstensi browser lanjutan (Manifest V3) yang dirancang untuk merevolusi pengalaman akademik Anda di **UNPAM**. Didukung oleh Google Gemini AI, ekstensi ini menyediakan otomatisasi tanpa batas, pelacakan progres waktu nyata, dan asisten cerdas untuk Portal E-Learning dan Akademik Mentari.

---

## 📋 Daftar Isi

1. [Fitur Utama](#-fitur-utama)
2. [Prasyarat](#-prasyarat)
3. [Panduan Instalasi](#-panduan-instalasi)
4. [Cara Penggunaan](#-cara-penggunaan)
5. [Arsitektur Teknis](#-arsitektur-teknis)
6. [Troubleshooting](#-troubleshooting)
7. [FAQ](#-faq)
8. [Lisensi](#-lisensi)

---

## 🌟 Fitur Utama

### 1. 🧠 Pelacak Forum Neural
Lacak progres diskusi Anda di semua mata kuliah dengan antarmuka **iOS Glassmorphism** berkualitas tinggi.

- **Visibilitas Lengkap:** Lihat riwayat semua pertemuan (P1 - P14).
- **Status Cerdas:** 
  - `🟢 Selesai`: Forum telah diselesaikan.
  - `🟠 Menunggu`: Forum aktif yang membutuhkan perhatian.
  - `⚪ Terkunci`: Forum tertutup atau tidak tersedia.
  - `∅ Kosong`: Pertemuan tanpa komponen forum.
- **Navigasi Langsung:** Klik sembarang tombol untuk langsung menuju ke forum atau bagian pertemuan tertentu.

### 2. 📊 Wawasan Akademik
Sinkronisasi data waktu nyata langsung dari API universitas.

- **Monitor Absensi:** Lihat statistik kehadiran detail dan persentase.
- **Ringkasan WhatsApp:** Hasilkan ringkasan pertemuan mingguan profesional yang diformat untuk grup kelas Anda dengan satu klik.
- **Notifikasi Dosen:** Dapatkan pemberitahuan saat dosen membalas posting forum Anda.

### 3. ⚡ Otomatisasi & Produktivitas
- **Isi Kuesioner Otomatis:** Selesaikan formulir evaluasi secara instan.
- **Quick Survey:** Rating satu klik untuk survei KHS (mode Weighted/Random).
- **Password Otomatis:** Asisten login cerdas untuk portal Mentari.

---

## 📦 Prasyarat

Sebelum menginstal ekstensi, pastikan Anda memiliki:

| Persyaratan | Detail |
|-------------|--------|
| **Browser** | Google Chrome 88+ atau Microsoft Edge 88+ |
| **Akun Mentari** | Aktab mahasiswa aktif UNPAM |
| **Koneksi Internet** | Stabil (disarankan) |

---

## 🚀 Panduan Instalasi

### Langkah 1: Unduh Repositori

```bash
# Clone repositori
git clone https://github.com/your-repo/sitrek-mentari.git

# Atau unduh sebagai ZIP
# Klik tombol "Code" → "Download ZIP"
```

### Langkah 2: Buka Halaman Ekstensi

- **Chrome:** Buka `chrome://extensions/`
- **Edge:** Buka `edge://extensions/`

### Langkah 3: Aktifkan Mode Pengembang

1. Temukan toggle **"Developer mode"** di pojok kanan atas
2. Aktifkan dengan menggeser tombol ke posisi **ON**

### Langkah 4: Muat Ekstensi

1. Klik tombol **"Load unpacked"**
2. Pilih folder tempat Anda mengekstrak ekstensi
3. Tunggu hingga proses selesai

### Langkah 5: Pin Ekstensi

1. Temukan ikon **SITREK Mentari** di toolbar browser Anda
2. Klik ikon pin untuk akses cepat

---

## 📖 Cara Penggunaan

###  Sinkronisasi Data

1. Navigasi ke Dashboard Mentari
2. Klik ikon **Refresh** (🔄) di Tracker UI
3. Tunggu "Neural Sync" selesai (loading bar akan menampilkan progres)
4. Daftar mata kuliah dan status pertemuan akan muncul secara instan

### 📤 Berbagi Ringkasan Kelas

1. Setelah data tersinkron, klik tombol **Summary** di status bar bawah
2. Jendela WhatsApp akan terbuka dengan pesan yang diformat sempurna:

```text
*REKAP PERTEMUAN MENTARI*

*OFFLINE :*
PEMROGRAMAN II: *pert 9*
...
```

---

## 🛠️ Arsitektur Teknis

| Komponen | Teknologi |
|----------|-----------|
| **Mesin** | JavaScript (ES6+), Manifest V3 |
| **UI** | CSS Grid/Flexbox, High-Contrast Glassmorphism, Estetika iOS |
| **AI Core** | Google Gemini API (v1beta) |
| **Keamanan** | Autentikasi berbasis token menggunakan intersepsi sesi yang ada (Tidak ada kredensial disimpan) |
| **Penyimpanan** | `localStorage` yang dilokalkan dengan validasi periodik |

### Diagram Arsitektur

```
┌─────────────────────────────────────────────────────────┐
│                    SITREK Mentari                       │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Popup UI   │  │ Content UI  │  │  Tracker    │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
│         │                │                │           │
│  ┌──────▼────────────────▼────────────────▼──────┐    │
│  │              Core Modules                      │    │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────┐  │    │
│  │  │   API   │ │ Gemini  │ │Storage  │ │Inter│  │    │
│  │  │ Manager │ │  Core   │ │ Manager │ │ceptor│  │    │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────┘  │    │
│  └──────────────────────┬────────────────────────┘    │
│                         │                              │
│  ┌──────────────────────▼────────────────────────┐    │
│  │              External Services                 │    │
│  │  ┌──────────────┐  ┌──────────────────────┐   │    │
│  │  │ Mentari API  │  │  Google Gemini API   │   │    │
│  │  └──────────────┘  └──────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Troubleshooting

### Masalah Umum dan Solusi

| Masalah | Solusi |
|---------|--------|
| **Ekstensi tidak muncul** | Pastikan Mode Pengembang aktif dan muat ulang halaman ekstensi |
| **API Key tidak valid** | Verifikasi kunci Anda di Google AI Studio dan pastikan belum kedaluwarsa |
| **Data tidak tersinkron** | Periksa koneksi internet dan coba klik refresh lagi |
| **Popup tidak terbuka** | Klik kanan pada ikon ekstensi → "Options" atau cek izin akses |
| **Forum tidak terdeteksi** | Pastikan Anda sudah login ke portal Mentari |

### Cara Melihat Log Error

1. Buka `chrome://extensions/`
2. Klik **"Service worker"** di bawah ekstensi SITREK Mentari
3. Lihat tab **Console** untuk log detail

---

## ❓ FAQ

### Q: Apakah ekstensi ini gratis?
A: Ya, ekstensi ini gratis. Namun, Anda memerlukan API Key Gemini yang mungkin memiliki batas penggunaan gratis.

### Q: Apakah data saya aman?
A: Ya! Ekstensi ini tidak menyimpan kredensial Anda. Autentikasi menggunakan sesi yang sudah ada dari portal Mentari.

### Q: Apakah ini melanggar kebijakan universitas?
A: Ekstensi ini dirancang untuk membantu produktivitas akademik. Pengguna bertanggung jawab untuk mematuhi kebijakan integritas akademik universitas.

### Q: Bagaimana cara melaporkan bug?
A: Buka issue di GitHub repositori atau hubungi tim pengembang.

### Q: Apakah mendukung browser lain?
A: Saat ini hanya mendukung Chrome dan Edge (berbasis Chromium).

---

## ⚠️ Disclaimer

Alat ini ditujukan untuk **tujuan edukasi dan produktivitas saja**. Pengguna bertanggung jawab untuk mematuhi kebijakan integritas akademik dan ketentuan layanan universitas. Pengembang tidak bertanggung jawab atas penyalahgunaan ekstensi ini.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

## 🤝 Kontribusi

Kami welcome kontribusi! Silakan:

1. Fork repositori ini
2. Buat branch fitur (`git checkout -b fitur/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin fitur/AmazingFeature`)
5. Buka Pull Request

---

## 📞 Dukungan

Jika Anda membutuhkan bantuan:

- **Email:** support@mentari.unpam.ac.id
- **Website:** https://mentari.unpam.ac.id
- **GitHub Issues:** [Link Issues](https://github.com/your-repo/sitrek-mentari/issues)

---

<div align="center">

Dibuat dengan ❤️ oleh Tim Pengembang SITREK Mentari

*Universitas Pamulang - 2026*

</div>

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed with ❤️ for UNPAM Students.**
