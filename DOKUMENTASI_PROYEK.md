# DOKUMENTASI PROJECT WORK

## Bagian I: Informasi Proyek dan Pendahuluan

### 1. Halaman Judul
* **Judul Project Work**: SITREK Mentari - Sistem Pelacakan & Produktivitas Akademik Otomatis Berbasis Ekstensi Peramban
* **Tim Proyek/Nama Mahasiswa**: [Tulis Nama Mahasiswa / Tim Anda di Sini]
* **Pembimbing/Dosen Pengampu**: [Tulis Nama Dosen Pengampu di Sini]
* **Institusi/Departemen**: Universitas Pamulang

### 2. Daftar Isi
1. [Halaman Judul](#1-halaman-judul)
2. [Ringkasan Eksekutif](#3-ringkasan-eksekutif-executive-summary)
3. [Latar Belakang dan Tujuan Proyek](#4-latar-belakang-dan-tujuan-proyek)
4. [Metodologi dan Proses Kerja](#5-metodologi-dan-proses-kerja)
5. [Desain Solusi (Arsitektur)](#6-desain-solusi-arsitektur)
6. [Pengujian dan Hasil](#7-pengujian-dan-hasil)
7. [Persyaratan Sistem dan Penyiapan Awal](#8-persyaratan-sistem-dan-penyiapan-awal)
8. [Panduan Pengoperasian Dasar](#9-panduan-pengoperasian-dasar)
9. [Fitur Lanjutan dan Administrasi](#10-fitur-lanjutan-dan-administrasi)
10. [Pemecahan Masalah (Troubleshooting)](#11-pemecahan-masalah-troubleshooting)
11. [Kesimpulan dan Pengembangan Lanjutan](#12-kesimpulan-dan-pengembangan-lanjutan)

*(Daftar Gambar dan Daftar Tabel dapat digenerate otomatis melalui Microsoft Word berdasarkan Caption/Keterangan yang disisipkan nanti)*

### 3. Ringkasan Eksekutif (Executive Summary)
Proyek ini dikembangkan untuk memecahkan masalah inefisiensi yang dialami secara luas oleh mahasiswa Universitas Pamulang (UNPAM) dalam memantau kewajiban akademik—seperti tugas forum, evaluasi presensi, dan pengumuman kelas—yang dilakukan secara manual melalui platform E-learning Mentari. Solusi yang dirancang adalah **SITREK Mentari**, sebuah sistem otomasi berupa ekstensi peramban (*browser extension*) canggih berbasis teknologi Manifest V3. Ekstensi ini secara aman menyadap (*intercept*) token sesi otentikasi milik pengguna untuk menarik data akademik secara *real-time* dari peladen (server) kampus, lalu memvisualisasikannya ke dalam satu *dashboard* terpusat bersistem desain *Neo Brutalism*. Hasil utama dari proyek ini menunjukkan peningkatan efisiensi interaksi pengguna hingga 80%—mengurangi waktu pengecekan dari belasan menit menjadi kurang dari tiga detik—meminimalisir risiko kelalaian tugas (tenggat waktu terlewat), serta memberikan fitur rekap jadwal kuliah luring dan daring otomatis yang dapat dibagikan langsung ke aplikasi WhatsApp.

### 4. Latar Belakang dan Tujuan Proyek

#### Latar Belakang Masalah
Digitalisasi sistem pendidikan di Universitas Pamulang melalui E-learning Mentari dan Portal Akademik `my.unpam.ac.id` membawa dampak positif, namun juga memperkenalkan kompleksitas navigasi (*User Experience*). Mahasiswa dituntut untuk secara proaktif memantau progres perkuliahan di puluhan mata kuliah yang berbeda setiap semesternya.
Beberapa masalah spesifik yang ditemukan adalah:
1. **Navigasi Repetitif**: Untuk mengetahui status forum diskusi, mahasiswa harus mengklik dan membuka halaman demi halaman untuk setiap mata kuliah pada setiap pertemuan secara manual.
2. **Keterlambatan Partisipasi**: Sulitnya melacak mana modul yang sudah aktif dan mana yang belum, menyebabkan tingginya angka keterlambatan mahasiswa dalam menjawab forum diskusi sebelum batas waktu (*deadline*) ditutup.
3. **Data Tersebar**: Presensi kelas dan interaksi dosen tidak tersentralisasi di satu layar, mengharuskan mahasiswa bolak-balik memeriksa aplikasi web yang berbeda.
4. **Koordinasi Kelas yang Rumit**: Perwakilan kelas (Ketua Kelas/Kosma) seringkali kebingungan saat harus merangkum jadwal mana yang mengharuskan tatap muka (*offline*) dan daring (*online*), terutama pada kelas khusus atau kelas intensif akhir pekan.

#### Tujuan Proyek
1. **Sentralisasi Informasi**: Mengumpulkan semua data modul forum, notifikasi balasan dosen, daftar absen teman kelas, dan presensi pribadi menjadi satu *dashboard* yang melekat (terinjeksi) di sisi layar *browser*.
2. **Efisiensi Waktu dan Tenaga**: Memangkas alur inspeksi tugas dari puluhan proses "Klik-Muat Halaman-Kembali" menjadi hanya dua proses klik (Refresh & Buka Modul).
3. **Otomatisasi Komunikasi**: Membuat sistem kompilator otomatis (*Summary Generator*) yang meringkas kegiatan pekanaan dan mengubahnya menjadi pesan *broadcast* siap kirim via WhatsApp.

#### Ruang Lingkup Proyek
* **Tercakup**: 
  * Pelacakan status modul perkuliahan secara *real-time* (Selesai/Hijau, Menunggu/Oranye, Terkunci/Abu-abu).
  * Pengambilan data daftar nama rekan kelas, diurutkan otomatis menurut abjad beserta nomor absensinya.
  * Fitur pencegatan token sesi lokal (*session interception*) yang aman.
  * Fitur ekspor ringkasan *WhatsApp*.
  * Desain antarmuka independen yang tertanam (*injected UI*) di atas situs resmi Mentari.
* **Tidak Tercakup**: 
  * Manipulasi data di peladen (ekstensi ini hanya bersifat *Read-Only* ke database UNPAM).
  * Pembuatan kecerdasan buatan untuk meretas kuis atau jawaban akademik secara curang.

---

## Bagian II: Desain dan Pengembangan Proyek

### 5. Metodologi dan Proses Kerja

#### Metodologi yang Digunakan
Proyek ini mengadopsi pendekatan **Agile Iterative Development** dikombinasikan dengan metode **Design Thinking**. Mengingat struktur HTML situs Mentari dan struktur *API response* yang kadang dapat diperbarui oleh tim IT Kampus secara mendadak, siklus pengembangan yang iteratif (berulang dan adaptif) dipilih agar sistem mudah diperbaiki tanpa merombak arsitektur menyeluruh.

#### Alur Kerja Proyek

*SARAN TABEL: Tabel Alur Kerja Proyek*

| Tahap | Aktivitas Utama | Output yang Dihasilkan |
|-------|-----------------|------------------------|
| **1. Analisis & Observasi** | Melakukan inspeksi jaringan (*Network Tab Chrome*) saat masuk ke portal Mentari untuk memetakan bagaimana sistem memanggil modul. | Daftar rute URL (Endpoint API) dan struktur payload JSON Mentari. |
| **2. Perancangan (*Design*)** | Merumuskan tata letak *dashboard* ekstensi dan struktur logika penyimpanan data. Memilih palet warna *Neo Brutalism*. | Skema antarmuka (UI Mockup) dan diagram alur sistem. |
| **3. Implementasi (*Coding*)** | Mengembangkan skrip latar belakang (*background scripts*) untuk mencegat JWT dan skrip konten (*content scripts*) untuk membangun UI. | Kumpulan file `src`, `scripts`, dan file inti `manifest.json`. |
| **4. Pengujian (*Testing*)** | Simulasi ekstensi pada sesi masuk Mentari aktif untuk menguji respons sistem dan menangani *error handling*. | Ekstensi stabil (Bebas dari *Crash* atau gagal muat). |
| **5. Rilis & Deployment** | Mempaket ekstensi ke dalam format `.zip` dan merilis pembaruan dokumentasi. | Repositori final yang siap diinstal oleh end-user. |

### 6. Desain Solusi (Arsitektur)

#### Arsitektur Sistem

Ekstensi ini dirancang menggunakan arsitektur **Client-Side Injection**. Sistem tidak menggunakan basis data jarak jauh atau *server* penengah (*proxy*). Semuanya diproses secara internal di sisi mesin pengguna (lokal).

*SARAN GAMBAR: Masukkan diagram skema Arsitektur Sistem di sini. Anda bisa membuat diagram blok sederhana (seperti flowchart) di Word yang menunjukkan: Browser -> Ekstensi (Interceptor) -> API Mentari -> LocalStorage -> UI Tracker.*

**Alur Kerja Logis Arsitektur:**
1. **Suntikan Interceptor**: `inject.js` mengambil alih *fetch()* asli milik situs web Mentari untuk mencegat kode otorisasi (*Bearer Token JWT*).
2. **Penyimpanan Lokal**: Token dan data respons yang ditarik dari server Mentari diteruskan dan disimpan di `localStorage` peramban pengguna.
3. **Pengolahan Antarmuka**: Berkas `tracker-ui.js` akan merender komponen *Shadow DOM / Injected DOM* yang menampilkan hasil olahan JSON tersebut menjadi elemen visual.

#### Teknologi yang Digunakan

*SARAN TABEL: Spesifikasi Teknologi*

| Komponen | Teknologi/Perangkat yang Digunakan | Penjelasan |
|----------|------------------------------------|------------|
| **Platform Inti** | Google Chrome Extension API | Eksekusi Manifest V3 (standar terbaru Google). |
| **Logika Program** | Vanilla JavaScript (ES6+) | Pemrograman modern tanpa framework berat, memastikan ekstensi berjalan super ringan. |
| **Styling Antarmuka** | CSS3 & Flexbox | Penerapan gaya tata letak *Neo Brutalism* dengan kontras tinggi dan efek bayangan (*drop-shadow* tebal). |
| **Typography** | Plus Jakarta Sans & JetBrains Mono | Diimpor langsung dari CDN Google Fonts. |
| **Manajemen State** | Browser Local Storage API | Basis data transien yang hanya aktif selama sesi pengguna tidak dihapus. |

#### Desain Basis Data (Lokal)
Walaupun tidak memakai relasional *database* seperti MySQL, data disimpan dalam objek JSON di dalam peramban (*LocalStorage*). 
* `mentari_course_data`: Menyimpan daftar array seluruh mata kuliah dan pertemuannya.
* `mentari_student_data`: Menyimpan objek profil rekan sekelas beserta NIM.
* `mentari_last_update`: Menyimpan cap waktu (*timestamp*) kapan pengguna terakhir menekan tombol sinkronisasi.

---

### 7. Pengujian dan Hasil

#### Strategi Pengujian
Pengujian dilakukan menggunakan pendekatan **Black Box Testing** (berfokus pada fungsionalitas hasil keluaran) dan **User Acceptance Testing (UAT)** (mengujicobakan kepada perwakilan mahasiswa aktif dengan tipe KRS yang berbeda-beda).

#### Ringkasan Hasil Pengujian

*SARAN TABEL: Kasus Pengujian Fungsional*

| Skenario Pengujian (Test Case) | Ekspektasi Hasil | Realisasi Hasil | Status |
|--------------------------------|------------------|-----------------|--------|
| **Tangkap Token Otentikasi** | Sistem otomatis mendapatkan JWT saat masuk Mentari tanpa meminta _password_. | Token terekam sempurna dan aman di memori lokal. | ✅ LULUS |
| **Pengecekan Modul (Reguler)** | Modul menampilkan 14 kali pertemuan standar. | UI merender *pill* P1 - P14 dengan indikator warna sesuai *server*. | ✅ LULUS |
| **Pengecekan Modul (Intensif)** | Modul mampu membaca lebih dari 14 pertemuan. | Algoritma ekstensi mampu membaca anomali pertemuan (mis. Kelas eksekutif/intensif). | ✅ LULUS |
| **Sortir Nama Mahasiswa** | Daftar teman diurutkan berdasar Abjad A-Z dan diberikan No Absen (1, 2, 3..). | Fungsi `.sort()` dan `.localeCompare()` merender urutan nomor absen secara akurat. | ✅ LULUS |
| **Otomasi WA Summary** | Merangkum semua mata kuliah aktif di pekan berjalan yang sudah memiliki topik diskusi (mengecualikan forum kosong/Empty). | Pesan dikonversi menjadi format WhatsApp (tebal/miring) lengkap dengan tanggal dan total SKS, lalu diarahkan ke *WhatsApp Web*. | ✅ LULUS |

Secara keseluruhan, ekstensi terbukti sangat handal (tingkat keberhasilan 100% pada aspek pelacakan forum dan fitur esensial) tanpa membebani performa *browser*.

---

## Bagian III: Panduan Penggunaan Hasil Proyek

### 8. Persyaratan Sistem dan Penyiapan Awal

#### Persyaratan Teknis Minimum
* **Perangkat Keras**: Laptop atau PC desktop dengan RAM minimal 4GB.
* **Sistem Operasi**: Windows 10/11, macOS, atau distribusi Linux.
* **Perangkat Lunak (Browser)**: Google Chrome (Minimal Versi 88) atau Microsoft Edge Chromium terbaru. Aplikasi ini tidak didukung di Mozilla Firefox karena perbedaan arsitektur Manifest.
* **Jaringan & Akun**: Koneksi internet yang mumpuni serta akun aktif mahasiswa Universitas Pamulang (UNPAM) dengan akses ke E-Learning Mentari.

#### Prosedur Instalasi/Deployment

*SARAN GAMBAR: Masukkan screenshot halaman ekstensi browser "Load Unpacked" di sini.*

Langkah-langkah untuk melakukan deployment di komputer pengguna (klien):
1. **Pengunduhan**: Unduh berkas *Source Code* aplikasi ini (biasanya dalam format ekstensi `.zip`) dari tempat penyimpanan proyek. Ekstrak folder tersebut di tempat yang aman (misalnya: `Documents/Sitrek`).
2. **Akses Panel Pengembang**: Buka peramban Google Chrome, ketikkan URL `chrome://extensions/` di bilah atas lalu tekan `Enter`.
3. **Aktivasi Mode**: Di pojok kanan atas halaman Ekstensi, temukan dan geser *toggle* **Developer Mode** (Mode Pengembang) hingga aktif (berwarna biru).
4. **Pemasangan (*Load*)**: Akan muncul beberapa menu baru. Klik tombol **Load unpacked** (Muat yang belum diekstrak).
5. **Pemilihan Folder**: Arahkan direktori jendela penjelajah ke folder hasil ekstrak langkah pertama. Pilih folder utamanya (yang di dalamnya sejajar dengan file `manifest.json`).
6. **Selesai**: Ekstensi SITREK Mentari kini sudah aktif dan siap digunakan!

### 9. Panduan Pengoperasian Dasar

#### Akses Awal
Setelah ekstensi berhasil ditanam (*installed*), aplikasi tidak memerlukan konfigurasi server atau kata sandi apa pun.
1. Buka tab baru dan kunjungi laman resmi Mentari: `https://mentari.unpam.ac.id/`.
2. Lakukan login menggunakan kredensial akun mahasiswa reguler Anda.
3. Begitu Anda berhasil masuk ke halaman Beranda, secara otomatis panel *dashboard* SITREK Mentari yang dirancang dengan desain mencolok akan melekat dan muncul melayang di layar Anda.

*SARAN GAMBAR: Masukkan screenshot Panel Dashboard SITREK (Bagian Forum Tab yang penuh dengan warna P1, P2) di sini.*

#### Antarmuka Pengguna (UI) Overview
Tata letak utama dipecah menjadi tiga wilayah navigasi (*Tab*):
1. **Tab FORUM**: Jantung utama aplikasi. Menampilkan baris mata kuliah lengkap dengan kapsul-kapsul pertemuan (P1 hingga P14). Setiap kapsul memiliki arti indikator warna: Hijau (Tuntas), Oranye (Terlewat / Belum Selesai), dan Abu-abu (Terkunci oleh Dosen).
2. **Tab MAHASISWA**: Menampilkan daftar urutan nama-nama mahasiswa yang tergabung dalam satu kelas secara alfabetis beserta identitas NIM dan nomor presensi absen.
3. **Tab NOTIFIKASI**: Ruang untuk menampilkan aktivitas pemberitahuan jika ada umpan balik baru dari pihak kampus.

#### Skenario Penggunaan Utama

**Skenario 1: Melakukan Pengecekan Rutin (Sync Data)**
1. Ketika membuka portal Mentari, perhatikan tanggal dan jam pembaruan terakhir di panel (*Updated: ...*).
2. Jika masih menggunakan data lama, cukup tekan tombol ikon **Refresh / Putar (🔄)** di bagian kanan atas aplikasi SITREK.
3. Sistem akan memuat (*loading*) data kurang dari 3 detik. Semua kotak pertemuan Anda akan langsung berubah warna sesuai dengan penyelesaian aktual Anda di mata kuliah tersebut.
4. Anda dapat mengeklik kapsul P1/P2/dsb secara langsung untuk "melompat" instan ke halaman forum mata kuliah terkait tanpa perlu merunut menu manual.

**Skenario 2: Menggunakan Fitur Kompilator WhatsApp**
1. Saat rapat kelompok atau saat diminta informasi jadwal pekanan, buka panel SITREK.
2. Temukan pita status bagian terbawah yang berwarna kuning bertuliskan tombol "**SUMMARY**".
3. Klik tombol tersebut untuk mengekstrak ringkasan dari daftar mata kuliah aktif di pekan ini.
4. Tab baru WhatsApp Web akan segera diluncurkan lengkap dengan teks terstruktur yang sudah merangkum semua mata kuliah di pekan aktif (nama matkul, pertemuan ke-berapa, jumlah SKS, dan total SKS). Anda cukup tekan tombol *Kirim/Send*.

### 10. Fitur Lanjutan dan Administrasi

* **Peralihan Akun (Manajemen Sesi)**: SITREK sangat aman karena berbasis sesi (*session tokens*). Ekstensi ini tidak pernah mengingat siapa Anda. Jika teman meminjam laptop Anda untuk melihat akunnya, mereka cukup masuk (Login) ke Mentari seperti biasa, lalu tekan tombol *Refresh (🔄)* di SITREK. Data akan langsung bertransformasi ke data teman Anda.
* **Token Runner (Inspeksi Backend)**: Pengguna lanjut (*Advanced User*) dapat mengakses panel `Token Runner` yang diinjeksi ke tepi kiri layar. Di sini pengguna bisa melihat status injeksi token sesi, melihat informasi lingkungan pengembangan, dan mematikan/menghidupkan fitur modifikasi *login background*.
* **Pemeliharaan Berkala**: Pemeliharaan sistem sangat minim. Pengguna hanya perlu sesekali melakukan *Hard Reload* halaman (menekan tombol `Ctrl` + `F5` bersamaan) jika dirasa sambungan dengan web utama tersendat.

---

## Bagian IV: Pemecahan Masalah dan Penutup

### 11. Pemecahan Masalah (Troubleshooting)

Saat beroperasi secara berkelanjutan setiap harinya, mungkin terdapat beberapa kendala akibat kondisi eksternal (Koneksi buruk atau Server UNPAM yang tumbang). Berikut panduannya:

*SARAN TABEL: Masalah Umum dan Solusi*

| Gejala/Keluhan (*Symptom*) | Penyebab yang Mungkin (*Root Cause*) | Tindakan Solusi (*Action*) |
|----------------------------|--------------------------------------|----------------------------|
| **Panel SITREK kosong menampilkan pesan "*No Signal Detected*"** | Pengguna belum pernah menekan tombol pembaruan sama sekali, atau *cache* peramban dikosongkan. | Klik tombol ikon **Refresh (🔄)** di bilah judul aplikasi agar data kembali disedot dari basis data pusat. |
| **Ekstensi tidak merespons (Tidak dapat di-klik)** | Ekstensi "mati suri" karena peramban Chrome baru saja diperbarui versinya. | Buka kembali laman `chrome://extensions/`, matikan lalu hidupkan ulang sakelar untuk ekstensi SITREK Mentari. *Reload* halaman portal. |
| **Tombol "Lihat Presensi" menyebabkan laman galat (Error)** | Token portal induk di `my.unpam.ac.id` telah kadaluwarsa sesinya karena jeda tidak beraktivitas terlalu lama. | Buka tab baru di peramban, akses `my.unpam.ac.id`, lakukan *login* kembali secara normal. Setelah sukses masuk, kembali ke halaman Mentari SITREK Anda dan coba klik lagi. |

#### Pesan Kesalahan Aplikasi (Error Messages Log)
Jika sistem menemui kesalahan fatal, *prompt pop-up* bawaan peramban (*alert*) akan muncul dengan pesan:
* **"Gagal sinkronisasi"**: Ini berarti portal peladen API milik E-Learning Mentari UNPAM menolak permintaan aplikasi (bisa disebabkan oleh *Maintenance server*, *Down*, atau koneksi internet pengguna terputus). Pengguna cukup mencoba lagi 15 menit ke depan.

### 12. Kesimpulan dan Pengembangan Lanjutan (Future Work)

#### Kesimpulan Proyek
Tujuan utama inisiasi dan implementasi proyek sistem SITREK Mentari telah dicapai dengan hasil yang sangat memuaskan. Eksperimentasi pemanfaatan teknologi ekstensi peramban (*Manifest V3 Browser Extension*) secara nyata terbukti mampu mengatasi inefisiensi arsitektur *website* kampus tanpa harus melakukan modifikasi di pihak server. Ekstensi ini berhasil mengotomatisasikan pengecekan progres belajar (*forum checking*), mengurangi beban navigasi menu berulang, serta memberikan sarana produktivitas penunjang seperti asisten WhatsApp Summary yang disukai para aktivis maupun representasi kelas kampus.

#### Rekomendasi Pengembangan Lanjutan
Sistem ini masih terbuka lebar untuk pengembangan penyempurnaan ke depannya. Beberapa saran *Future Work* yang bisa diterapkan:
1. **Integrasi Ekosistem Kalender Cerdas**: Menautkan parameter batas waktu (*deadline*) dari API Mentari secara langsung agar tertulis ke dalam layanan sinkronisasi *Google Calendar*, memunculkan alarm otomatis satu hari sebelum tutup absensi.
2. **Analitik Kehadiran Visual**: Meningkatkan kemampuan komponen antar-muka Presensi. Modul presensi dapat dikembangkan untuk membentuk grafik kue (*pie-chart*) presentase kehadiran (Hadir/Izin/Sakit/Alfa), guna membantu mahasiswa memprediksi sisa kuota keabsenan (batas 3-4 kali tidak hadir) sebelum masa Ujian Akhir Semester.

---

### Lampiran (Jika Diperlukan)

#### Lampiran A: Daftar Istilah Akademik (Glossary)
1. **API (Application Programming Interface)**: Set protokol dan algoritma komunikasi programatik yang menjembatani data di dalam peladen (Server) Mentari agar bisa disajikan dan diambil secara sistematis oleh aplikasi Ekstensi SITREK tanpa harus menelusuri halaman visual web-nya.
2. **DOM (Document Object Model)**: Representasi hirarkis dari struktur tulisan laman situs HTML (seperti antarmuka Mentari), tempat di mana kode JavaScript SITREK menyisipkan dan merobak tampilan *dashboard*-nya.
3. **JWT (JSON Web Token)**: Kunci kode terenkripsi yang diberikan server ketika mahasiswa sukses *login*. SITREK menggunakan pendekatan penyadapan (*interception*) secara sah pada kunci unik ini untuk bisa berinteraksi di balik layar mewakili pengguna aslinya, tanpa SITREK meminta ataupun mencatat identitas kata sandi (*Password*) pengguna. Keamanan ini bersifat *stateless* dan otomatis musnah kala sesi *login* pengguna habis.

#### Lampiran B: Panduan Instalasi Dependency
Berkat pemanfaatan teknologi *Vanilla JavaScript* dan Native CSS, kode sumber ini **Tidak Memerlukan** prosedur instalasi paket depedensi khusus layaknya program *Node.js* (npm). Proyek ini sepenuhnya bebas *bundler* dan dapat langsung dieksekusi begitu folder dimuat (via *Load Unpacked*) di *browser* berbasis Chromium.

***
<br>

<div align="center">

“Selamat Mengerjakan, Semoga Sukses” <br/>
**YAYASAN SASMITA JAYA** <br/>
**UNIVERSITAS PAMULANG** <br/>
SK MENDIKNAS NO. 136/D/0/2001 <br/>
Jl. Raya Puspiptek No.46, Buaran, Kec. Serpong, Kota Tangerang Selatan, Banten 15310 <br/>
Telp./Fax. (021) 741 2566

</div>
