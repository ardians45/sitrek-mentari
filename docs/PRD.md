# Product Requirements Document (PRD)

## Sistem Informasi Tracking Kelas Mentari (SITREK-MENTARI)

| Field | Detail |
|---|---|
| **Versi Dokumen** | 2.0 |
| **Tanggal Dibuat** | 16 April 2026 |
| **Terakhir Diperbarui** | 16 April 2026 |
| **Status** | Draft — Menunggu Review Stakeholder |
| **Penulis** | Tim Pengembang SITREK-MENTARI |
| **Stakeholder** | Mahasiswa Kelas, Ketua Kelas, Dosen (Observasi), Admin Sistem |
| **Prioritas** | P1 — High |

---

## Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Latar Belakang & Pernyataan Masalah](#2-latar-belakang--pernyataan-masalah)
3. [Tujuan & Sasaran (Goals & Objectives)](#3-tujuan--sasaran-goals--objectives)
4. [Metrik Keberhasilan (Success Metrics / KPIs)](#4-metrik-keberhasilan-success-metrics--kpis)
5. [User Persona & Role Management](#5-user-persona--role-management)
6. [Cakupan Produk (Scope)](#6-cakupan-produk-scope)
7. [Kebutuhan Fungsional (Functional Requirements)](#7-kebutuhan-fungsional-functional-requirements)
8. [Kebutuhan Non-Fungsional (Non-Functional Requirements)](#8-kebutuhan-non-fungsional-non-functional-requirements)
9. [Arsitektur Sistem & Tech Stack](#9-arsitektur-sistem--tech-stack)
10. [Desain Database (Schema)](#10-desain-database-schema)
11. [API Specification](#11-api-specification)
12. [Alur Sistem (System Workflow)](#12-alur-sistem-system-workflow)
13. [Desain UI/UX & Panduan Visual](#13-desain-uiux--panduan-visual)
14. [Strategi Mobile-First & PWA](#14-strategi-mobile-first--pwa)
15. [Keamanan & Privasi (Security & Privacy)](#15-keamanan--privasi-security--privacy)
16. [Phased Roadmap](#16-phased-roadmap)
17. [Risiko & Mitigasi](#17-risiko--mitigasi)
18. [Dependensi & Asumsi](#18-dependensi--asumsi)
19. [Glosarium](#19-glosarium)
20. [Riwayat Revisi Dokumen](#20-riwayat-revisi-dokumen)

---

## 1. Ringkasan Eksekutif

**SITREK-MENTARI** adalah platform tracking kelas berbasis web yang dirancang sebagai *Single Point of Truth* bagi mahasiswa Universitas Pamulang (UNPAM). Platform ini berfungsi sebagai pelengkap sistem akademik yang sudah ada — **My UNPAM** (Portal Akademik) dan **Mentari** (LMS/E-Learning) — dengan fokus pada pelacakan jadwal kuliah dan manajemen tugas secara terpusat dan realtime.

Pada fase awal, data dikelola secara manual oleh **Ketua Kelas** yang bertindak sebagai *data curator*. Setiap perubahan data disiarkan secara realtime ke seluruh anggota kelas melalui Supabase Realtime, sehingga mahasiswa selalu mendapatkan informasi terkini tanpa perlu melakukan refresh halaman.

**Nilai Inti Produk:**
- ✅ **Sentralisasi Informasi** — Satu sumber kebenaran untuk jadwal & tugas
- ✅ **Realtime Updates** — Perubahan instan tanpa refresh
- ✅ **Mobile-First** — Dioptimalkan untuk penggunaan smartphone mahasiswa
- ✅ **Zero-Friction** — Mudah digunakan tanpa pelatihan khusus

---

## 2. Latar Belakang & Pernyataan Masalah

### 2.1 Konteks

Universitas Pamulang (UNPAM) saat ini memiliki dua platform digital utama:

| Platform | URL | Fungsi |
|---|---|---|
| **My UNPAM** | [my.unpam.ac.id](https://my.unpam.ac.id/beranda/) | Portal Akademik — KRS, KHS, jadwal resmi, informasi administrasi |
| **Mentari** | [mentari.unpam.ac.id](https://mentari.unpam.ac.id/) | LMS (Learning Management System) — Materi kuliah, pengumpulan tugas, quiz daring |

### 2.2 Pernyataan Masalah

Meskipun kedua platform tersebut menyediakan informasi akademik, mahasiswa masih menghadapi beberapa *pain points*:

| # | Masalah | Dampak |
|---|---|---|
| P1 | **Informasi tersebar** di minimal 3 channel (My UNPAM, Mentari, grup WhatsApp) | Mahasiswa sering terlewat deadline karena informasi tidak terpusat |
| P2 | **Jadwal berubah mendadak** (dosen berhalangan, ruangan pindah) dan informasi hanya disampaikan lewat chat | Mahasiswa datang ke ruangan yang salah atau di waktu yang salah |
| P3 | **Tidak ada mekanisme tracking kolektif** untuk status tugas kelas | Ketua kelas kewalahan menjawab pertanyaan berulang di grup |
| P4 | **Notifikasi yang tidak terstruktur** dari grup WhatsApp membuat info penting tenggelam | Informasi deadline dan pengumuman kritis terlewat |

### 2.3 Hipotesis Solusi

> *Jika kami menyediakan platform terpusat dengan input manual dari Ketua Kelas dan distribusi realtime yang terstruktur, maka mahasiswa akan memiliki akses informasi yang lebih akurat, tepat waktu, dan terorganisir — mengurangi missed-deadline rate hingga 50% di semester pertama penggunaan.*

---

## 3. Tujuan & Sasaran (Goals & Objectives)

### 3.1 Product Goals

| Goal | Deskripsi | Indikator |
|---|---|---|
| G1 | Menjadi *Single Point of Truth* untuk jadwal & tugas kelas | ≥80% anggota kelas aktif menggunakan platform per minggu |
| G2 | Mengurangi miskomunikasi terkait jadwal dan deadline | Pengurangan ≥50% keluhan di grup WhatsApp terkait info jadwal |
| G3 | Menyediakan mekanisme notifikasi terstruktur | ≥90% notifikasi tugas baru terkirim dalam <2 detik |
| G4 | Memberikan UX yang seamless di perangkat mobile | ≥85% skor Lighthouse Performance pada mobile |

### 3.2 Non-Goals (Out of Scope — Fase 1)

Berikut hal-hal yang **tidak** termasuk dalam cakupan pengembangan Fase 1:

- ❌ Integrasi otomatis (scraping/API) dengan My UNPAM atau Mentari
- ❌ Fitur chat/pesan antar mahasiswa
- ❌ Sistem absensi digital
- ❌ Multi-kelas management (1 instance = 1 kelas)
- ❌ Integrasi dengan LMS pihak ketiga (Google Classroom, dll.)
- ❌ Fitur pengumpulan/upload tugas

---

## 4. Metrik Keberhasilan (Success Metrics / KPIs)

| KPI | Target | Metode Pengukuran | Frekuensi Review |
|---|---|---|---|
| **Daily Active Users (DAU)** | ≥60% dari total anggota kelas | Supabase Auth session tracking | Mingguan |
| **Weekly Active Users (WAU)** | ≥80% dari total anggota kelas | Supabase Auth session tracking | Mingguan |
| **Rata-rata waktu data entry per tugas** | <3 menit | In-app timer dari open form → submit | Bulanan |
| **Notification delivery rate** | ≥95% berhasil terkirim | Service Worker analytics | Mingguan |
| **Missed deadline reduction** | ≥50% dibanding baseline (survei) | Survei pre/post deployment | Per semester |
| **User satisfaction score (CSAT)** | ≥4.0 / 5.0 | In-app feedback form | Bulanan |
| **Page load time (Mobile 4G)** | <2 detik (FCP) | Lighthouse CI | Per release |

---

## 5. User Persona & Role Management

### 5.1 User Personas

#### Persona 1: Mahasiswa (Member)

| Atribut | Detail |
|---|---|
| **Nama Fiksi** | Rina — Mahasiswa semester 4, Teknik Informatika |
| **Perangkat** | Android (smartphone budget, koneksi 4G) |
| **Kebutuhan** | Melihat jadwal hari ini dengan cepat, tahu deadline tugas mendatang |
| **Frustrasi** | Info tercecer di WA, Mentari, dan chat dosen. Sering terlewat deadline |
| **Harapan** | Satu aplikasi yang langsung menampilkan "apa yang harus dilakukan hari ini" |

#### Persona 2: Ketua Kelas (Leader/Editor)

| Atribut | Detail |
|---|---|
| **Nama Fiksi** | Andi — Ketua Kelas, semester 4, bertanggung jawab koordinasi |
| **Perangkat** | Android + Laptop |
| **Kebutuhan** | Input data tugas & jadwal dengan cepat, broadcast perubahan ke semua anggota |
| **Frustrasi** | Harus menjawab pertanyaan berulang di grup, informasi perubahan jadwal harus diketik ulang |
| **Harapan** | Form yang cepat, otomatis kirim notifikasi, dan semua orang langsung tahu |

#### Persona 3: Admin Sistem

| Atribut | Detail |
|---|---|
| **Nama Fiksi** | Dev Team |
| **Perangkat** | Desktop (Chrome) |
| **Kebutuhan** | Manajemen user, monitoring sistem, maintenance database |
| **Frustrasi** | Butuh akses cepat untuk troubleshoot masalah user |
| **Harapan** | Dashboard admin yang ringkas dengan log aktivitas |

### 5.2 Role-Based Access Control (RBAC)

| Permission | Mahasiswa | Ketua Kelas | Admin |
|---|---|---|---|
| Melihat dashboard & kalender | ✅ | ✅ | ✅ |
| Melihat daftar & detail tugas | ✅ | ✅ | ✅ |
| Membuat tugas baru | ❌ | ✅ | ✅ |
| Mengedit/hapus tugas | ❌ | ✅ | ✅ |
| Membuat/edit jadwal kuliah | ❌ | ✅ | ✅ |
| Mengubah status tugas kolektif | ❌ | ✅ | ✅ |
| Mengirim pengumuman/broadcast | ❌ | ✅ | ✅ |
| Manajemen user (CRUD) | ❌ | ❌ | ✅ |
| Assign/revoke role | ❌ | ❌ | ✅ |
| Reset/maintenance database | ❌ | ❌ | ✅ |
| Melihat log aktivitas sistem | ❌ | ❌ | ✅ |

---

## 6. Cakupan Produk (Scope)

### 6.1 In Scope — MVP (Fase 1)

| Modul | Fitur | Prioritas |
|---|---|---|
| **Authentication** | Login/Register via Supabase Auth (Email + Password) | P0 |
| **Dashboard** | Overview hari ini: jadwal, tugas mendekati deadline, pengumuman terbaru | P0 |
| **Kalender** | Tampilan kalender bulanan/mingguan dengan jadwal & deadline | P0 |
| **Manajemen Tugas** | CRUD tugas oleh Ketua Kelas, daftar tugas dengan filter & sorting | P0 |
| **Manajemen Jadwal** | CRUD jadwal kuliah mingguan oleh Ketua Kelas | P0 |
| **Realtime Sync** | Broadcast perubahan data ke semua client via Supabase Realtime | P0 |
| **Notifikasi Web Push** | Notifikasi browser untuk tugas baru & perubahan deadline | P1 |
| **PWA** | Install to homescreen, offline fallback page | P1 |
| **Profil User** | Lihat & edit profil dasar (nama, foto) | P2 |

### 6.2 Out of Scope — Fase 1

- Integrasi API My UNPAM / Mentari
- Multi-kelas / multi-jurusan support
- File upload/attachment pada tugas
- Fitur diskusi/komentar
- Native mobile app (iOS/Android)
- Dark mode toggle

---

## 7. Kebutuhan Fungsional (Functional Requirements)

### FR-01: Authentication & Authorization

| ID | Requirement | Acceptance Criteria |
|---|---|---|
| FR-01.1 | Sistem harus menyediakan halaman login dengan email & password | User dapat login dan diarahkan ke dashboard sesuai role |
| FR-01.2 | Sistem harus menyediakan halaman registrasi untuk mahasiswa baru | User baru dapat mendaftar dengan email @unpam (atau email umum, TBD) |
| FR-01.3 | Sistem harus memvalidasi role user setelah login | Redirect ke halaman sesuai role: Mahasiswa → Dashboard, Ketua → Editor, Admin → Admin Panel |
| FR-01.4 | Sistem harus mendukung session persistence | User tetap terlogin selama token JWT valid (7 hari) |
| FR-01.5 | Sistem harus menyediakan fitur logout | Session dihapus dan redirect ke halaman login |
| FR-01.6 | Sistem harus menyediakan halaman lupa password | User menerima email reset password via Supabase Auth |

### FR-02: Dashboard

| ID | Requirement | Acceptance Criteria |
|---|---|---|
| FR-02.1 | Dashboard menampilkan ringkasan jadwal hari ini | Jadwal hari ini ditampilkan dalam format card dengan informasi: Mata Kuliah, Jam, Ruangan |
| FR-02.2 | Dashboard menampilkan tugas yang mendekati deadline | Tugas dengan deadline ≤7 hari ke depan ditampilkan, diurutkan berdasarkan kedekatan deadline |
| FR-02.3 | Dashboard menampilkan pengumuman terbaru dari Ketua Kelas | 3 pengumuman terakhir ditampilkan dalam format timeline |
| FR-02.4 | Dashboard menampilkan status ringkas kelas | Widget: Total Tugas Aktif, Tugas Selesai Minggu Ini, Jadwal Hari Ini |

### FR-03: Kalender Internal

| ID | Requirement | Acceptance Criteria |
|---|---|---|
| FR-03.1 | Kalender menampilkan tampilan Bulanan dan Mingguan | User dapat toggle antara view bulanan dan mingguan |
| FR-03.2 | Event jadwal kuliah ditampilkan sebagai blok berulang (recurring) | Jadwal yang di-input Ketua Kelas tampil sebagai event mingguan berulang |
| FR-03.3 | Event deadline tugas ditampilkan sebagai marker di tanggal deadline | Marker berwarna accent (#F59E0B) pada tanggal deadline |
| FR-03.4 | Kalender mendukung filter | Filter tersedia: "Hanya Tugas," "Hanya Jadwal," "Tugas Belum Selesai," "Jadwal Hari Ini" |
| FR-03.5 | Klik pada event menampilkan detail | Modal/sheet muncul dengan detail lengkap event (mata kuliah, deskripsi, dll.) |

### FR-04: Manajemen Tugas (Ketua Kelas)

| ID | Requirement | Acceptance Criteria |
|---|---|---|
| FR-04.1 | Ketua Kelas dapat membuat tugas baru melalui form | Form berisi: Nama Mata Kuliah (dropdown), Judul Tugas, Deskripsi (rich text opsional), Deadline (date + time picker), Prioritas (Rendah/Sedang/Tinggi) |
| FR-04.2 | Ketua Kelas dapat mengedit tugas yang sudah ada | Semua field tugas dapat diedit, riwayat perubahan tersimpan |
| FR-04.3 | Ketua Kelas dapat menghapus tugas | Konfirmasi dialog sebelum hapus, soft-delete (data tetap tersimpan di DB) |
| FR-04.4 | Ketua Kelas dapat mengubah status tugas secara kolektif | Status yang tersedia: `AKTIF`, `SELESAI`, `DEADLINE_DIPERPANJANG`, `DIBATALKAN` |
| FR-04.5 | Daftar tugas mendukung sorting & filtering | Sort: Deadline (ASC/DESC), Mata Kuliah (A-Z). Filter: Status, Mata Kuliah, Prioritas |
| FR-04.6 | Setiap pembuatan/perubahan tugas memicu notifikasi push | Notifikasi terkirim ke semua subscriber dalam <5 detik |

### FR-05: Manajemen Jadwal Kuliah (Ketua Kelas)

| ID | Requirement | Acceptance Criteria |
|---|---|---|
| FR-05.1 | Ketua Kelas dapat menambah jadwal kuliah | Form berisi: Mata Kuliah, Hari (Senin-Sabtu), Jam Mulai, Jam Selesai, Ruangan, Nama Dosen |
| FR-05.2 | Ketua Kelas dapat mengedit jadwal | Semua field jadwal bisa diedit |
| FR-05.3 | Ketua Kelas dapat menandai status khusus jadwal | Status: `NORMAL`, `DOSEN_BERHALANGAN`, `RUANGAN_PINDAH`, `JAM_BERUBAH`, `LIBUR` |
| FR-05.4 | Perubahan status jadwal ditampilkan sebagai badge visual | Badge berwarna berbeda untuk setiap status (misal: merah untuk `DOSEN_BERHALANGAN`) |

### FR-06: Realtime Synchronization

| ID | Requirement | Acceptance Criteria |
|---|---|---|
| FR-06.1 | Setiap INSERT/UPDATE/DELETE pada tabel `tasks` di-broadcast realtime | Client mahasiswa menerima update <2 detik setelah Ketua Kelas menyimpan perubahan |
| FR-06.2 | Setiap perubahan pada tabel `schedules` di-broadcast realtime | Client mahasiswa menerima update <2 detik |
| FR-06.3 | UI client mahasiswa terupdate tanpa refresh manual | Komponen React ter-rerender dengan data baru secara otomatis |
| FR-06.4 | Sistem menangani koneksi ulang (reconnect) dengan graceful | Jika koneksi terputus, client otomatis reconnect dan fetch data terbaru |

### FR-07: Notifikasi Web Push

| ID | Requirement | Acceptance Criteria |
|---|---|---|
| FR-07.1 | Sistem meminta izin notifikasi saat pertama kali login | Permission dialog muncul dengan penjelasan manfaat |
| FR-07.2 | Notifikasi terkirim saat tugas baru ditambahkan | Push notification muncul di browser/device dengan judul tugas & deadline |
| FR-07.3 | Notifikasi terkirim saat deadline diubah | Push notification muncul dengan informasi deadline lama → baru |
| FR-07.4 | Notifikasi terkirim saat ada pengumuman status khusus | Push notification untuk status: `DOSEN_BERHALANGAN`, `DEADLINE_DIPERPANJANG` |
| FR-07.5 | User dapat mengatur preferensi notifikasi | Toggle on/off untuk setiap jenis notifikasi di halaman profil |

### FR-08: Pengumuman / Broadcast (Ketua Kelas)

| ID | Requirement | Acceptance Criteria |
|---|---|---|
| FR-08.1 | Ketua Kelas dapat membuat pengumuman teks | Form dengan: Judul, Isi Pengumuman, Tingkat Urgensi (Info/Penting/Darurat) |
| FR-08.2 | Pengumuman ditampilkan di dashboard sebagai feed | Urutan: Terbaru di atas, dengan badge urgensi |
| FR-08.3 | Pengumuman urgensi "Penting" dan "Darurat" memicu notifikasi push | Auto-trigger push notification |

---

## 8. Kebutuhan Non-Fungsional (Non-Functional Requirements)

### NFR-01: Performance

| ID | Requirement | Target |
|---|---|---|
| NFR-01.1 | First Contentful Paint (FCP) pada jaringan 4G | <1.8 detik |
| NFR-01.2 | Time to Interactive (TTI) | <3.5 detik |
| NFR-01.3 | Largest Contentful Paint (LCP) | <2.5 detik |
| NFR-01.4 | Cumulative Layout Shift (CLS) | <0.1 |
| NFR-01.5 | Lighthouse Performance Score (Mobile) | ≥85 |

### NFR-02: Reliability & Availability

| ID | Requirement | Target |
|---|---|---|
| NFR-02.1 | Uptime | ≥99.5% (di luar maintenance terjadwal) |
| NFR-02.2 | Realtime connection stability | Auto-reconnect dalam <5 detik setelah koneksi terputus |
| NFR-02.3 | Graceful degradation | Jika realtime gagal, user tetap bisa melihat data terakhir yang tersimpan |

### NFR-03: Scalability

| ID | Requirement | Target |
|---|---|---|
| NFR-03.1 | Concurrent users per kelas | ≥50 user simultan |
| NFR-03.2 | Data retention | ≥2 semester data historis |

### NFR-04: Usability

| ID | Requirement | Target |
|---|---|---|
| NFR-04.1 | Waktu onboarding user baru | <2 menit hingga bisa melihat jadwal hari ini |
| NFR-04.2 | Accessibility | WCAG 2.1 Level AA compliance |
| NFR-04.3 | Bahasa antarmuka | Bahasa Indonesia (dengan dukungan istilah akademik lokal UNPAM) |
| NFR-04.4 | Browser support | Chrome (≥90), Firefox (≥90), Safari (≥15), Samsung Internet (≥15) |

### NFR-05: Security

| ID | Requirement | Target |
|---|---|---|
| NFR-05.1 | Authentication | JWT-based via Supabase Auth |
| NFR-05.2 | Authorization | Row Level Security (RLS) policies di Supabase |
| NFR-05.3 | Data transmission | HTTPS/TLS 1.3 |
| NFR-05.4 | Input validation | Server-side + client-side validation untuk semua form |

---

## 9. Arsitektur Sistem & Tech Stack

### 9.1 Tech Stack

| Layer | Teknologi | Justifikasi |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | SSR/SSG hybrid, React Server Components, API routes built-in |
| **UI Library** | Tailwind CSS + shadcn/ui | Konsistensi dengan desain system, aksesibilitas built-in, komponen headless |
| **State Management** | React Context + TanStack Query | Server state caching, optimistic updates, realtime sync |
| **Backend/Database** | Supabase (PostgreSQL) | BaaS dengan auth, realtime, storage, RLS built-in |
| **Realtime Engine** | Supabase Realtime | WebSocket-based, auto-reconnect, channel subscription |
| **Authentication** | Supabase Auth | Session management, JWT, OAuth-ready untuk fase selanjutnya |
| **Push Notification** | Web Push API + Service Worker | Native browser notification tanpa dependency pihak ketiga |
| **Deployment** | Vercel | Zero-config Next.js hosting, global CDN, preview deployments |
| **Monitoring** | Vercel Analytics + Sentry | Performance monitoring, error tracking |

### 9.2 Diagram Arsitektur (High-Level)

```
┌──────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                         │
│  ┌─────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │  Mahasiswa   │  │  Ketua Kelas   │  │    Admin     │  │
│  │  (Mobile)    │  │ (Mobile/Web)   │  │   (Desktop)  │  │
│  └──────┬───────┘  └───────┬────────┘  └──────┬───────┘  │
│         │                  │                   │          │
│  ┌──────┴──────────────────┴───────────────────┴───────┐  │
│  │              Next.js App (PWA)                      │  │
│  │  ┌──────────┐ ┌───────────┐ ┌───────────────────┐   │  │
│  │  │Dashboard │ │  Kalender │ │  Editor (Leader)  │   │  │
│  │  └──────────┘ └───────────┘ └───────────────────┘   │  │
│  └──────────────────────┬──────────────────────────────┘  │
└─────────────────────────┼────────────────────────────────┘
                          │ HTTPS / WSS
┌─────────────────────────┼────────────────────────────────┐
│                   BACKEND LAYER (Supabase)                │
│  ┌──────────────────────┴──────────────────────────────┐  │
│  │                  Supabase Gateway                   │  │
│  └──┬──────────┬──────────────┬────────────┬───────────┘  │
│     │          │              │            │              │
│  ┌──┴───┐  ┌──┴────────┐  ┌─┴─────┐  ┌───┴──────────┐   │
│  │ Auth │  │  Realtime  │  │  REST │  │  Edge Funcs  │   │
│  │(JWT) │  │ (WebSocket)│  │  API  │  │ (Push Notif) │   │
│  └──────┘  └───────────┘  └───┬───┘  └──────────────┘   │
│                               │                          │
│  ┌────────────────────────────┴──────────────────────┐   │
│  │              PostgreSQL Database                  │   │
│  │  ┌────────┐ ┌────────┐ ┌──────────┐ ┌──────────┐ │   │
│  │  │ users  │ │ tasks  │ │schedules │ │announces │ │   │
│  │  └────────┘ └────────┘ └──────────┘ └──────────┘ │   │
│  │                + Row Level Security (RLS)         │   │
│  └───────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## 10. Desain Database (Schema)

### 10.1 Entity Relationship Diagram (ERD)

```
┌──────────────┐       ┌───────────────┐       ┌───────────────┐
│   profiles   │       │   subjects    │       │   classes     │
├──────────────┤       ├───────────────┤       ├───────────────┤
│ id (PK, FK)  │──┐    │ id (PK)       │       │ id (PK)       │
│ full_name    │  │    │ name          │       │ name          │
│ avatar_url   │  │    │ code          │       │ academic_year │
│ role         │  │    │ semester      │       │ semester      │
│ class_id(FK) │──┼──► │ sks           │       │ program_studi │
│ created_at   │  │    │ class_id(FK)  │──►    │ created_at    │
│ updated_at   │  │    │ created_at    │       └───────────────┘
└──────────────┘  │    └───────┬───────┘
                  │            │
                  │    ┌───────┴───────┐
                  │    │               │
          ┌───────┴────┴──┐    ┌───────┴───────┐
          │    tasks      │    │  schedules    │
          ├───────────────┤    ├───────────────┤
          │ id (PK)       │    │ id (PK)       │
          │ subject_id(FK)│    │ subject_id(FK)│
          │ title         │    │ day_of_week   │
          │ description   │    │ start_time    │
          │ deadline      │    │ end_time      │
          │ priority      │    │ room          │
          │ status        │    │ lecturer_name │
          │ created_by(FK)│    │ status        │
          │ created_at    │    │ status_note   │
          │ updated_at    │    │ created_by(FK)│
          └───────────────┘    │ created_at    │
                               │ updated_at    │
          ┌───────────────┐    └───────────────┘
          │ announcements │
          ├───────────────┤
          │ id (PK)       │
          │ title         │
          │ content       │
          │ urgency       │
          │ created_by(FK)│
          │ created_at    │
          └───────────────┘

          ┌───────────────┐
          │push_subscript.│
          ├───────────────┤
          │ id (PK)       │
          │ user_id (FK)  │
          │ endpoint      │
          │ p256dh_key    │
          │ auth_key      │
          │ created_at    │
          └───────────────┘

          ┌───────────────┐
          │ activity_logs │
          ├───────────────┤
          │ id (PK)       │
          │ user_id (FK)  │
          │ action        │
          │ entity_type   │
          │ entity_id     │
          │ metadata      │
          │ created_at    │
          └───────────────┘
```

### 10.2 Tabel Detail

#### `profiles`
| Kolom | Tipe | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `uuid` | PK, FK → auth.users.id | ID user dari Supabase Auth |
| `full_name` | `varchar(100)` | NOT NULL | Nama lengkap mahasiswa |
| `avatar_url` | `text` | NULLABLE | URL foto profil |
| `role` | `enum('mahasiswa','ketua_kelas','admin')` | NOT NULL, DEFAULT 'mahasiswa' | Role user |
| `class_id` | `uuid` | FK → classes.id, NULLABLE | Kelas yang diikuti |
| `created_at` | `timestamptz` | DEFAULT now() | Waktu pendaftaran |
| `updated_at` | `timestamptz` | DEFAULT now() | Waktu terakhir update |

#### `classes`
| Kolom | Tipe | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | ID kelas |
| `name` | `varchar(50)` | NOT NULL | Nama kelas (e.g., "06TPLP002") |
| `academic_year` | `varchar(10)` | NOT NULL | Tahun akademik (e.g., "2025/2026") |
| `semester` | `smallint` | NOT NULL | Semester (1-8) |
| `program_studi` | `varchar(100)` | NOT NULL | Program studi |
| `created_at` | `timestamptz` | DEFAULT now() | — |

#### `subjects`
| Kolom | Tipe | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | ID mata kuliah |
| `name` | `varchar(100)` | NOT NULL | Nama mata kuliah |
| `code` | `varchar(20)` | UNIQUE, NOT NULL | Kode mata kuliah |
| `semester` | `smallint` | NOT NULL | Semester mata kuliah |
| `sks` | `smallint` | NOT NULL | Jumlah SKS |
| `class_id` | `uuid` | FK → classes.id | Kelas pemilik |
| `created_at` | `timestamptz` | DEFAULT now() | — |

#### `tasks`
| Kolom | Tipe | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | ID tugas |
| `subject_id` | `uuid` | FK → subjects.id, NOT NULL | Mata kuliah terkait |
| `title` | `varchar(200)` | NOT NULL | Judul tugas |
| `description` | `text` | NULLABLE | Deskripsi/instruksi tugas |
| `deadline` | `timestamptz` | NOT NULL | Tanggal & waktu deadline |
| `priority` | `enum('rendah','sedang','tinggi')` | DEFAULT 'sedang' | Tingkat prioritas |
| `status` | `enum('aktif','selesai','deadline_diperpanjang','dibatalkan')` | DEFAULT 'aktif' | Status tugas |
| `created_by` | `uuid` | FK → profiles.id, NOT NULL | Ketua Kelas yang membuat |
| `created_at` | `timestamptz` | DEFAULT now() | — |
| `updated_at` | `timestamptz` | DEFAULT now() | — |
| `deleted_at` | `timestamptz` | NULLABLE | Soft delete timestamp |

#### `schedules`
| Kolom | Tipe | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | ID jadwal |
| `subject_id` | `uuid` | FK → subjects.id, NOT NULL | Mata kuliah terkait |
| `day_of_week` | `smallint` | NOT NULL, CHECK (1-6) | Hari (1=Senin, 6=Sabtu) |
| `start_time` | `time` | NOT NULL | Jam mulai |
| `end_time` | `time` | NOT NULL | Jam selesai |
| `room` | `varchar(50)` | NOT NULL | Ruangan |
| `lecturer_name` | `varchar(100)` | NOT NULL | Nama dosen pengajar |
| `status` | `enum('normal','dosen_berhalangan','ruangan_pindah','jam_berubah','libur')` | DEFAULT 'normal' | Status jadwal |
| `status_note` | `text` | NULLABLE | Catatan tambahan untuk status |
| `created_by` | `uuid` | FK → profiles.id, NOT NULL | — |
| `created_at` | `timestamptz` | DEFAULT now() | — |
| `updated_at` | `timestamptz` | DEFAULT now() | — |

#### `announcements`
| Kolom | Tipe | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | ID pengumuman |
| `title` | `varchar(200)` | NOT NULL | Judul pengumuman |
| `content` | `text` | NOT NULL | Isi pengumuman |
| `urgency` | `enum('info','penting','darurat')` | DEFAULT 'info' | Tingkat urgensi |
| `created_by` | `uuid` | FK → profiles.id, NOT NULL | — |
| `created_at` | `timestamptz` | DEFAULT now() | — |

#### `push_subscriptions`
| Kolom | Tipe | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | — |
| `user_id` | `uuid` | FK → profiles.id, NOT NULL | User pemilik subscription |
| `endpoint` | `text` | NOT NULL, UNIQUE | Web Push endpoint URL |
| `p256dh_key` | `text` | NOT NULL | Public key untuk enkripsi |
| `auth_key` | `text` | NOT NULL | Auth key untuk enkripsi |
| `created_at` | `timestamptz` | DEFAULT now() | — |

#### `activity_logs`
| Kolom | Tipe | Constraint | Deskripsi |
|---|---|---|---|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | — |
| `user_id` | `uuid` | FK → profiles.id, NOT NULL | Siapa yang melakukan aksi |
| `action` | `varchar(50)` | NOT NULL | Jenis aksi (CREATE, UPDATE, DELETE) |
| `entity_type` | `varchar(50)` | NOT NULL | Tipe entitas (task, schedule, announcement) |
| `entity_id` | `uuid` | NOT NULL | ID entitas yang terpengaruh |
| `metadata` | `jsonb` | NULLABLE | Detail perubahan (old → new values) |
| `created_at` | `timestamptz` | DEFAULT now() | — |

### 10.3 Row Level Security (RLS) Policies

```sql
-- profiles: semua user bisa baca profil satu kelas
CREATE POLICY "Users can view profiles in same class"
  ON profiles FOR SELECT
  USING (class_id = (SELECT class_id FROM profiles WHERE id = auth.uid()));

-- tasks: semua user satu kelas bisa baca, hanya ketua_kelas & admin bisa tulis
CREATE POLICY "Class members can view tasks"
  ON tasks FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM subjects s
    JOIN profiles p ON s.class_id = p.class_id
    WHERE s.id = tasks.subject_id AND p.id = auth.uid()
  ));

CREATE POLICY "Leaders can manage tasks"
  ON tasks FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role IN ('ketua_kelas', 'admin')
  ));

-- Pola yang sama berlaku untuk schedules dan announcements
```

---

## 11. API Specification

### 11.1 REST Endpoints (via Supabase Auto-Generated + Custom)

Supabase secara otomatis menghasilkan REST API dari schema PostgreSQL. Berikut endpoint kustom tambahan yang dibutuhkan:

| Method | Endpoint | Deskripsi | Auth | Role |
|---|---|---|---|---|
| `GET` | `/api/dashboard` | Ambil data ringkasan dashboard | ✅ | All |
| `GET` | `/api/tasks` | Daftar tugas (support filter & sort) | ✅ | All |
| `POST` | `/api/tasks` | Buat tugas baru + trigger push notif | ✅ | Ketua, Admin |
| `PATCH` | `/api/tasks/:id` | Update tugas + trigger push notif | ✅ | Ketua, Admin |
| `DELETE` | `/api/tasks/:id` | Soft-delete tugas | ✅ | Ketua, Admin |
| `GET` | `/api/schedules` | Daftar jadwal mingguan | ✅ | All |
| `POST` | `/api/schedules` | Buat jadwal baru | ✅ | Ketua, Admin |
| `PATCH` | `/api/schedules/:id` | Update jadwal + trigger push notif | ✅ | Ketua, Admin |
| `GET` | `/api/announcements` | Daftar pengumuman | ✅ | All |
| `POST` | `/api/announcements` | Buat pengumuman + trigger push notif | ✅ | Ketua, Admin |
| `POST` | `/api/push/subscribe` | Simpan push subscription | ✅ | All |
| `DELETE` | `/api/push/unsubscribe` | Hapus push subscription | ✅ | All |

### 11.2 Realtime Channels

| Channel | Table | Events | Subscribers |
|---|---|---|---|
| `tasks:class_{class_id}` | `tasks` | INSERT, UPDATE, DELETE | Semua mahasiswa di kelas |
| `schedules:class_{class_id}` | `schedules` | INSERT, UPDATE | Semua mahasiswa di kelas |
| `announcements:class_{class_id}` | `announcements` | INSERT | Semua mahasiswa di kelas |

### 11.3 Contoh Request/Response

**POST /api/tasks**
```json
// Request
{
  "subject_id": "uuid-matkul",
  "title": "Tugas UTS - Pembuatan ERD",
  "description": "Buat ERD untuk studi kasus perpustakaan...",
  "deadline": "2026-04-25T23:59:00+07:00",
  "priority": "tinggi"
}

// Response (201 Created)
{
  "id": "uuid-task",
  "subject_id": "uuid-matkul",
  "subject_name": "Basis Data",
  "title": "Tugas UTS - Pembuatan ERD",
  "description": "Buat ERD untuk studi kasus perpustakaan...",
  "deadline": "2026-04-25T23:59:00+07:00",
  "priority": "tinggi",
  "status": "aktif",
  "created_by": "uuid-ketua",
  "created_at": "2026-04-16T10:00:00+07:00"
}
```

---

## 12. Alur Sistem (System Workflow)

### 12.1 Alur Utama: Ketua Kelas Menginput Tugas Baru

```
┌───────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Ketua   │     │   Next.js    │     │   Supabase   │     │  Mahasiswa   │
│   Kelas   │     │   App        │     │   Backend    │     │  (Client)    │
└─────┬─────┘     └──────┬───────┘     └──────┬───────┘     └──────┬───────┘
      │                  │                    │                    │
      │  1. Isi Form     │                    │                    │
      │  Tugas Baru      │                    │                    │
      ├─────────────────►│                    │                    │
      │                  │  2. POST /api/tasks│                    │
      │                  ├───────────────────►│                    │
      │                  │                    │  3. Insert DB      │
      │                  │                    │  + Validate RLS    │
      │                  │                    ├─────┐              │
      │                  │                    │     │              │
      │                  │                    │◄────┘              │
      │                  │  4. 201 Created    │                    │
      │                  │◄───────────────────┤                    │
      │  5. Toast:       │                    │                    │
      │  "Tugas Berhasil │                    │                    │
      │   Ditambahkan"   │                    │                    │
      │◄─────────────────┤                    │                    │
      │                  │                    │  6. Realtime       │
      │                  │                    │  Broadcast         │
      │                  │                    │  (WebSocket)       │
      │                  │                    ├───────────────────►│
      │                  │                    │                    │  7. UI auto-
      │                  │                    │                    │  update
      │                  │                    │                    ├────┐
      │                  │                    │                    │    │
      │                  │                    │                    │◄───┘
      │                  │                    │  8. Edge Function: │
      │                  │                    │  Send Push Notif   │
      │                  │                    ├───────────────────►│
      │                  │                    │                    │  9. Browser
      │                  │                    │                    │  Push Notif
      │                  │                    │                    │  📱
```

### 12.2 Alur Login

```
User → Login Page → Input Email + Password
  → Supabase Auth → Validate Credentials
    → Success → Fetch Profile (role + class_id)
      → role == 'mahasiswa'    → Redirect /dashboard
      → role == 'ketua_kelas'  → Redirect /dashboard (with editor access)
      → role == 'admin'        → Redirect /admin
    → Failure → Show Error Message
```

---

## 13. Desain UI/UX & Panduan Visual

### 13.1 Design System — Brand Alignment

SITREK-MENTARI harus **sejalan secara visual** dengan ekosistem digital UNPAM yang sudah ada (My UNPAM & Mentari). Berdasarkan analisis kedua platform:

| Token | Nilai | Referensi |
|---|---|---|
| **Primary** | `#1E40AF` (Deep Blue) | Warna utama My UNPAM & Mentari — Stabilitas & institusi akademik |
| **Primary Light** | `#3B82F6` (Blue 500) | Hover state, secondary elements |
| **Primary Dark** | `#1E3A8A` (Blue 900) | Active state, header backgrounds |
| **Accent** | `#F59E0B` (Amber 500) | Logo Mentari (matahari), badge deadline & urgensi |
| **Accent Light** | `#FCD34D` (Amber 300) | Highlight, hover state accent |
| **Background** | `#F8FAFC` (Slate 50) | Background utama — ringan, nyaman untuk durasi lama |
| **Surface** | `#FFFFFF` | Card backgrounds |
| **Surface Elevated** | `#F1F5F9` (Slate 100) | Elevated cards, sidebar |
| **Text Primary** | `#0F172A` (Slate 900) | Heading, body text utama |
| **Text Secondary** | `#64748B` (Slate 500) | Label, caption, metadata |
| **Success** | `#059669` (Emerald 600) | Tugas selesai, status normal |
| **Warning** | `#D97706` (Amber 600) | Deadline mendekati, perubahan jadwal |
| **Danger** | `#DC2626` (Red 600) | Overdue, error, hapus |
| **Info** | `#2563EB` (Blue 600) | Informational alerts |

### 13.2 Typography

| Level | Font | Weight | Size (Mobile) | Size (Desktop) |
|---|---|---|---|---|
| **Heading 1** | Inter | 700 (Bold) | 24px | 32px |
| **Heading 2** | Inter | 600 (SemiBold) | 20px | 24px |
| **Heading 3** | Inter | 600 (SemiBold) | 16px | 20px |
| **Body** | Inter | 400 (Regular) | 14px | 16px |
| **Caption** | Inter | 400 (Regular) | 12px | 14px |
| **Button** | Inter | 500 (Medium) | 14px | 14px |

### 13.3 Spacing & Layout

| Token | Nilai | Penggunaan |
|---|---|---|
| `space-xs` | 4px | Inline spacing, icon gaps |
| `space-sm` | 8px | Compact padding |
| `space-md` | 16px | Default padding & margins |
| `space-lg` | 24px | Section spacing |
| `space-xl` | 32px | Page-level spacing |
| `radius-sm` | 6px | Buttons, badges |
| `radius-md` | 12px | Cards, inputs |
| `radius-lg` | 16px | Modals, sheets |
| `radius-full` | 9999px | Avatars, pills |

### 13.4 Komponen Utama

| Komponen | Deskripsi | Referensi shadcn/ui |
|---|---|---|
| **TaskCard** | Card tugas dengan badge status, deadline countdown, prioritas | Card + Badge |
| **ScheduleCard** | Card jadwal dengan ikon hari, waktu, ruangan | Card + Badge |
| **CalendarView** | Kalender bulanan/mingguan dengan event dots | Custom + Dialog |
| **BottomNavBar** | Navigasi utama mobile (4 tab) | Custom (fixed bottom) |
| **EditorForm** | Form input tugas/jadwal untuk Ketua Kelas | Form + Input + Select + DatePicker |
| **AnnouncementBanner** | Banner pengumuman dengan badge urgensi | Alert + Badge |
| **StatusBadge** | Badge visual untuk status tugas/jadwal | Badge (color-coded) |
| **EmptyState** | Ilustrasi + teks saat tidak ada data | Custom |

### 13.5 Wireframe — Halaman Utama

#### Mobile Dashboard (< 480px)

```
┌─────────────────────────┐
│  ☰  SITREK-MENTARI  🔔  │  ← Header (sticky)
├─────────────────────────┤
│                         │
│  Selamat Pagi, Rina 👋  │  ← Greeting
│  Kamis, 16 April 2026   │
│                         │
├─────────────────────────┤
│  📢 PENGUMUMAN          │  ← Announcement Banner
│  ┌─────────────────────┐│
│  │ ⚠️ Deadline UTS      ││
│  │ diperpanjang ke 25/4 ││
│  └─────────────────────┘│
├─────────────────────────┤
│  📅 JADWAL HARI INI     │  ← Today's Schedule
│  ┌─────────────────────┐│
│  │ 08:00 - 10:30       ││
│  │ Basis Data           ││
│  │ R.305 • Dr. Ahmad    ││
│  │ ✅ Normal             ││
│  └─────────────────────┘│
│  ┌─────────────────────┐│
│  │ 13:00 - 15:30       ││
│  │ Pemrograman Web      ││
│  │ Lab.201 • Bu Sari    ││
│  │ 🔴 Dosen Berhalangan ││
│  └─────────────────────┘│
├─────────────────────────┤
│  📝 TUGAS MENDATANG     │  ← Upcoming Tasks
│  ┌─────────────────────┐│
│  │ 🔴 TINGGI            ││
│  │ ERD Perpustakaan     ││
│  │ Basis Data           ││
│  │ ⏰ 3 hari lagi       ││
│  └─────────────────────┘│
│  ┌─────────────────────┐│
│  │ 🟡 SEDANG            ││
│  │ Laporan Praktikum   ││
│  │ Pemrograman Web      ││
│  │ ⏰ 7 hari lagi       ││
│  └─────────────────────┘│
│                         │
├─────────────────────────┤
│  🏠    📅    📝    👤   │  ← Bottom Nav
│ Home Calendar Tasks Profile│
└─────────────────────────┘
```

---

## 14. Strategi Mobile-First & PWA

### 14.1 Responsive Breakpoints

| Breakpoint | Lebar | Target Device | Layout |
|---|---|---|---|
| **Mobile (Primary)** | < 480px | Smartphone budget (mayoritas mahasiswa) | Single column, bottom nav |
| **Mobile Large** | 480px - 768px | Smartphone premium, tablet kecil | Single column, spacing lebih lega |
| **Tablet** | 768px - 1024px | Tablet, laptop kecil | Two-column sidebar layout |
| **Desktop** | > 1024px | Laptop, desktop | Full dashboard layout, sidebar tetap |

### 14.2 PWA Configuration

| Properti | Nilai |
|---|---|
| **Display Mode** | `standalone` |
| **Orientation** | `portrait` |
| **Theme Color** | `#1E40AF` |
| **Background Color** | `#F8FAFC` |
| **Start URL** | `/dashboard` |
| **Offline Fallback** | Custom offline page dengan pesan "Koneksi terputus, data terakhir tetap tersedia" |
| **Cache Strategy** | Stale-While-Revalidate untuk data API, Cache-First untuk static assets |

### 14.3 Bottom Navigation Structure

| Tab | Ikon | Label | Route |
|---|---|---|---|
| 1 | 🏠 | Beranda | `/dashboard` |
| 2 | 📅 | Kalender | `/calendar` |
| 3 | 📝 | Tugas | `/tasks` |
| 4 | 👤 | Profil | `/profile` |

> **Catatan untuk Ketua Kelas**: Tab "Tugas" menampilkan FAB (Floating Action Button) `+` untuk akses cepat membuat tugas/jadwal baru.

---

## 15. Keamanan & Privasi (Security & Privacy)

### 15.1 Implementasi Keamanan

| Aspek | Implementasi |
|---|---|
| **Authentication** | Supabase Auth (JWT) — Token refresh otomatis, session timeout 7 hari |
| **Authorization** | Row Level Security (RLS) di PostgreSQL — Setiap query difilter berdasarkan role & class_id |
| **Data in Transit** | HTTPS/TLS 1.3 wajib untuk semua komunikasi client-server |
| **Data at Rest** | Enkripsi database Supabase (AES-256, managed by Supabase) |
| **Input Validation** | Zod schema validation di client + server-side |
| **CSRF Protection** | SameSite cookie policy + Supabase built-in protection |
| **Rate Limiting** | Supabase built-in rate limiting + custom throttle untuk push notification |
| **XSS Prevention** | React built-in escaping + DOMPurify untuk rich text content |

### 15.2 Kebijakan Privasi Data

- Data mahasiswa **hanya digunakan** untuk keperluan tracking kelas
- Tidak ada data yang dibagikan ke pihak ketiga
- Mahasiswa dapat menghapus akun dan semua data terkait kapan saja
- Log aktivitas disimpan maksimal 1 tahun akademik, kemudian di-purge

---

## 16. Phased Roadmap

### Fase 1 — MVP (Minggu 1-6)

| Sprint | Durasi | Deliverables |
|---|---|---|
| **Sprint 1** | Minggu 1-2 | Setup project, Auth flow (login, register, logout), DB schema, seed data |
| **Sprint 2** | Minggu 3-4 | Dashboard, Kalender view (read-only), Manajemen Tugas (CRUD by Ketua) |
| **Sprint 3** | Minggu 5-6 | Manajemen Jadwal, Realtime sync, Pengumuman, PWA setup, QA & Bug fix |

**Milestone**: MVP deployed ke Vercel, siap untuk pilot test dengan 1 kelas.

### Fase 2 — Enhancement (Minggu 7-10)

| Fitur | Deskripsi |
|---|---|
| Web Push Notification | Implementasi penuh dengan preferensi per-user |
| Offline Mode | Service Worker dengan cache strategy untuk akses offline |
| Activity Log | Dashboard admin untuk monitoring aktivitas |
| UX Polish | Micro-animations, loading skeletons, empty states |

### Fase 3 — Scale & Automation (Minggu 11+)

| Fitur | Deskripsi |
|---|---|
| Multi-Kelas Support | Satu instance mendukung beberapa kelas |
| Automated Sync (R&D) | Eksplorasi scraping/API Mentari & My UNPAM |
| File Attachment | Upload file pendukung tugas |
| Dark Mode | Toggle tema gelap/terang |
| Analytics Dashboard | Statistik penggunaan dan engagement per kelas |

---

## 17. Risiko & Mitigasi

| # | Risiko | Probabilitas | Dampak | Mitigasi |
|---|---|---|---|---|
| R1 | Ketua Kelas tidak konsisten mengisi data | Tinggi | Tinggi | Gamifikasi (badge), reminder otomatis, mekanisme delegasi ke Wakil Ketua |
| R2 | Supabase free tier limit tercapai | Sedang | Sedang | Monitoring usage, optimasi query, rencana upgrade ke Pro jika adopsi tinggi |
| R3 | Adopsi rendah — mahasiswa tetap pakai WhatsApp | Tinggi | Tinggi | Onboarding yang mudah, share link tugas ke WA, fitur yang tidak bisa didapat di WA (kalender, filter) |
| R4 | Push notification diblokir browser | Sedang | Rendah | Fallback in-app notification, edukasi user saat onboarding |
| R5 | Perubahan struktur API My UNPAM / Mentari (untuk Fase 3) | Rendah | Sedang | Abstraksi adapter pattern, tidak hard-dependency pada API pihak ketiga |
| R6 | Data privacy concern | Rendah | Tinggi | RLS policies, privacy policy transparan, opsi hapus data |

---

## 18. Dependensi & Asumsi

### 18.1 Dependensi

| Dependensi | Pihak | Status |
|---|---|---|
| Supabase Cloud (Free/Pro tier) | Supabase Inc. | ✅ Tersedia |
| Vercel Hosting (Free/Hobby tier) | Vercel Inc. | ✅ Tersedia |
| Domain & SSL | — | 🔲 TBD (bisa gunakan subdomain Vercel) |
| VAPID Keys untuk Web Push | Self-generated | 🔲 Perlu dibuat saat development |

### 18.2 Asumsi

1. **Satu kelas = satu instance deployment** pada Fase 1
2. Ketua Kelas memiliki motivasi dan waktu untuk menginput data secara rutin
3. Mayoritas mahasiswa menggunakan browser Chrome di Android (untuk Web Push compatibility)
4. Koneksi internet tersedia (minimal 3G) saat mengakses platform
5. Mahasiswa sudah familiar dengan penggunaan aplikasi web di smartphone

---

## 19. Glosarium

| Istilah | Definisi |
|---|---|
| **My UNPAM** | Portal akademik resmi Universitas Pamulang (KRS, KHS, jadwal) |
| **Mentari** | Manajemen Terpadu Pembelajaran Daring — LMS resmi UNPAM |
| **Ketua Kelas** | Mahasiswa yang ditunjuk sebagai penanggung jawab koordinasi kelas |
| **RLS** | Row Level Security — fitur PostgreSQL untuk access control di level baris data |
| **PWA** | Progressive Web App — web app yang bisa di-install di homescreen dan bekerja offline |
| **Realtime** | Mekanisme sinkronisasi data instan via WebSocket tanpa perlu refresh manual |
| **CRUD** | Create, Read, Update, Delete — operasi dasar pengelolaan data |
| **Soft Delete** | Penghapusan data secara logis (beri tanda `deleted_at`) tanpa menghapus record dari database |
| **FAB** | Floating Action Button — tombol aksi utama yang melayang di atas konten |
| **FCP** | First Contentful Paint — metrik performa yang mengukur waktu hingga konten pertama terlihat |
| **SSR** | Server-Side Rendering — teknik rendering halaman di server sebelum dikirim ke client |

---

## 20. Riwayat Revisi Dokumen

| Versi | Tanggal | Perubahan | Penulis |
|---|---|---|---|
| 1.0 | — | Draft awal PRD | Tim Pengembang |
| 1.3 | — | Fokus Manual Data Entry & Supabase | Tim Pengembang |
| **2.0** | **16 April 2026** | **Restrukturisasi standar industri**: Penambahan Success Metrics/KPIs, User Persona detail, RBAC matrix, Database Schema lengkap, API Specification, Acceptance Criteria per fitur, Non-Functional Requirements, Security & Privacy, Risk Assessment, Phased Roadmap, Wireframe, dan Glosarium | Tim Pengembang |

---

> **Catatan**: Dokumen ini adalah working document yang akan diperbarui seiring perkembangan proyek. Setiap perubahan signifikan akan dicatat di Riwayat Revisi Dokumen.
>
> **Approval yang dibutuhkan**:
> - [ ] Product Owner / Stakeholder
> - [ ] Tech Lead
> - [ ] UI/UX Designer
