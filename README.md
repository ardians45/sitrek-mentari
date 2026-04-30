# 🛰️ SITREK Mentari

![Icon](assets/icon.png)

[![Version](https://img.shields.io/badge/version-2.0.1-blue.svg?style=for-the-badge)](https://github.com/your-repo)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge-lightgrey.svg?style=for-the-badge)](https://mentari.unpam.ac.id)

**SITREK Mentari** adalah sistem pelacakan progres akademik otomatis (Manifest V3) yang dirancang untuk mengoptimalkan pengalaman belajar Anda di **UNPAM**. Ekstensi ini menyediakan otomatisasi pelacakan, monitoring progres waktu nyata, dan alat produktivitas untuk Portal E-Learning Mentari.

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

### 1. 📊 Automated Forum Tracker
Pantau progres diskusi Anda di semua mata kuliah dengan antarmuka **High-End Glassmorphism**.

- **Visibilitas Lengkap:** Rekap otomatis riwayat pertemuan (P1 - P14).
- **Status Progres:** 
  - `🟢 Selesai`: Forum telah dikerjakan.
  - `🟠 Menunggu`: Forum aktif yang belum selesai.
  - `⚪ Terkunci`: Forum belum tersedia.
  - `∅ Kosong`: Pertemuan tanpa komponen forum.
- **Navigasi Cepat:** Akses langsung ke modul pertemuan hanya dengan satu klik.

### 2. 👥 Daftar Mahasiswa & Notifikasi
Manajemen data kelas dan monitoring interaksi secara real-time.

- **Data Mahasiswa:** Daftar lengkap rekan sekelas beserta NIM dan total jumlah mahasiswa.
- **Monitoring Notifikasi:** Deteksi otomatis balasan dari dosen atau rekan mahasiswa di forum diskusi.
- **Ringkasan WhatsApp:** Hasilkan rekap pertemuan mingguan secara otomatis untuk dibagikan ke grup kelas.

### 3. ⚡ Alat Produktivitas
- **Auto-Fill Kuesioner:** Selesaikan formulir evaluasi dosen secara cepat.
- **Quick Survey Tool:** Otomatisasi rating survei KHS.
- **Smart Login:** Mempermudah proses autentikasi ke portal Mentari.

---

## 📦 Prasyarat

- **Browser:** Google Chrome atau Microsoft Edge terbaru.
- **Akun:** Mahasiswa aktif Universitas Pamulang.

---

## 🚀 Panduan Instalasi

1. **Unduh** repositori ini atau ekstrak file ZIP.
2. Buka halaman **Ekstensi** di browser (`chrome://extensions/` atau `edge://extensions/`).
3. Aktifkan **Developer Mode** di pojok kanan atas.
4. Klik **Load unpacked** dan pilih folder ekstensi.
5. Selesai! SITREK Mentari siap digunakan.

---

## 📖 Cara Penggunaan

1. Login ke portal **Mentari UNPAM**.
2. Klik tombol **Refresh** (🔄) pada panel SITREK untuk memulai sinkronisasi data.
3. Gunakan tab navigasi untuk berpindah antara **Home (Tracker)**, **Mahasiswa**, dan **Notifikasi**.
4. Gunakan tombol **Summary** untuk menyalin rekap mingguan ke WhatsApp.

---

## 🛠️ Arsitektur Teknis

| Komponen | Teknologi |
|----------|-----------|
| **Core** | JavaScript (ES6+), Manifest V3 |
| **UI** | CSS Glassmorphism, Plus Jakarta Sans |
| **Security** | Token Interception (Tanpa menyimpan kredensial user) |
| **Storage** | LocalStorage API dengan manajemen state terpusat |

---

## 🔧 Troubleshooting

- **Data tidak muncul:** Klik tombol Refresh untuk sinkronisasi ulang dengan API Mentari.
- **Gagal capture token:** Pastikan Anda sedang login dan coba refresh halaman utama Mentari.
- **Ekstensi tidak aktif:** Pastikan Mode Pengembang tetap menyala di pengaturan browser.

---

## ❓ FAQ

### Q: Apakah data login saya disimpan?
A: Tidak. SITREK hanya menggunakan token sesi aktif yang ada di browser Anda untuk berkomunikasi dengan API Mentari secara lokal.

### Q: Bagaimana cara memperbarui data?
A: Cukup klik ikon Refresh pada dashboard SITREK kapan saja Anda ingin memperbarui status progres.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

<div align="center">

Dibuat untuk mempermudah produktivitas mahasiswa **Universitas Pamulang**.

*SITREK Mentari - 2026*

</div>
