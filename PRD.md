# Product Requirements Document (PRD)

## Sistem Informasi Tracking Kelas Mentari (SITREK-MENTARI)

| Field | Detail |
|---|---|
| **Versi** | 2.0 |
| **Status** | In-Progress |
| **Terakhir Diperbarui** | 19 April 2026 |
| **Author** | Tim Pengembang Kelas 06TPLK005 |
| **Fokus** | Mobile-First, Manual Entry by Ketua Kelas, & Realtime Updates |

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [User Persona & Hak Akses](#2-user-persona--hak-akses)
3. [Target Spesifik: Kelas 06TPLK005](#3-target-spesifik-kelas-06tplk005)
4. [Arsitektur Sistem](#4-arsitektur-sistem)
5. [Skema Database (Supabase)](#5-skema-database-supabase)
6. [Fitur & User Stories](#6-fitur--user-stories)
7. [Spesifikasi Halaman & UI](#7-spesifikasi-halaman--ui)
8. [Design System](#8-design-system)
9. [API & Data Flow](#9-api--data-flow)
10. [Autentikasi & Keamanan](#10-autentikasi--keamanan)
11. [Notifikasi & Realtime](#11-notifikasi--realtime)
12. [Progressive Web App (PWA)](#12-progressive-web-app-pwa)
13. [Non-Functional Requirements](#13-non-functional-requirements)
14. [Error Handling & Edge Cases](#14-error-handling--edge-cases)
15. [Testing Strategy](#15-testing-strategy)
16. [Deployment & DevOps](#16-deployment--devops)
17. [Analytics & Monitoring](#17-analytics--monitoring)
18. [Accessibility (a11y)](#18-accessibility-a11y)
19. [Roadmap & Milestones](#19-roadmap--milestones)
20. [Appendix](#20-appendix)

---

## 1. Pendahuluan

### 1.1 Latar Belakang

Mahasiswa Universitas Pamulang (UNPAM) sering mengalami kesulitan dalam memantau jadwal perkuliahan dan tugas secara terpusat. Informasi tersebar di berbagai grup WhatsApp, portal Mentari, dan catatan pribadi. Hal ini menyebabkan:

- Tertinggalnya informasi perubahan jadwal mendadak (dosen berhalangan, pergantian ruangan).
- Terlambatnya pengumpulan tugas karena tidak ada sistem pengingat terpadu.
- Beban komunikasi yang berat pada Ketua Kelas sebagai penghubung utama.

SITREK-MENTARI hadir sebagai *Single Point of Truth* yang memusatkan seluruh informasi akademik kelas dalam satu platform digital yang dapat diakses kapan saja dan di mana saja.

### 1.2 Tujuan Produk

Membangun platform tracking berbasis **Next.js** dan **Supabase** yang memungkinkan Ketua Kelas mengelola informasi jadwal dan tugas secara terpusat, yang kemudian disiarkan secara *realtime* kepada seluruh anggota kelas.

### 1.3 Scope & Batasan

| In-Scope | Out-of-Scope |
|---|---|
| Tracking jadwal kuliah harian | Sistem presensi kehadiran mahasiswa |
| Manajemen tugas & deadline | Integrasi langsung dengan portal Mentari |
| Pengumuman kelas realtime | Sistem penilaian/grading |
| Notifikasi push (Web Push API) | Chat/messaging antar mahasiswa |
| PWA (installable di homescreen) | Sistem pembayaran SPP |

### 1.4 Stakeholders

| Stakeholder | Kepentingan |
|---|---|
| Mahasiswa Kelas 06TPLK005 | Pengguna utama — memantau jadwal & tugas |
| Ketua Kelas | Operator — input & update data |
| Dosen Pembimbing | Penerima manfaat — informasi tersampaikan |
| Tim Pengembang | Pembuatan & pemeliharaan sistem |

### 1.5 Referensi Platform

- **Portal Mentari UNPAM:** https://mentari.unpam.ac.id/ — Sistem informasi akademik resmi, digunakan sebagai referensi data jadwal dan SKS.
- **Portal MY UNPAM:** https://my.unpam.ac.id/beranda/ — Portal layanan mahasiswa.

---

## 2. User Persona & Hak Akses

### 2.1 Role Management

| Role | Deskripsi | Cakupan & Hak Akses |
|---|---|---|
| **Mahasiswa** | Anggota kelas biasa | `READ` seluruh data jadwal, tugas, pengumuman. |
| **Ketua Kelas** | Pengelola informasi kelas | `READ`, `CREATE`, `UPDATE`, `DELETE` pada jadwal, tugas, & pengumuman. |
| **Admin (Future)** | Super admin sistem | Full access termasuk manajemen user & kelas. |

### 2.2 User Persona Detail

#### Persona 1: Mahasiswa (Viewer)
- **Profil:** Mahasiswa semester 6, Teknik Informatika.
- **Kebutuhan:** Melihat jadwal hari ini dengan cepat, mengecek deadline tugas terdekat, mendapatkan notifikasi jika ada perubahan jadwal.
- **Pain Points:** Informasi tersebar di banyak tempat, sering ketinggalan pengumuman di grup chat.
- **Goal:** Membuka satu aplikasi dan langsung tahu apa yang harus dilakukan hari ini.

#### Persona 2: Ketua Kelas (Operator)
- **Profil:** Mahasiswa yang ditunjuk sebagai koordinator kelas.
- **Kebutuhan:** Menginput informasi dari dosen dengan cepat, mengupdate status jadwal secara instan, menyebarkan pengumuman penting.
- **Pain Points:** Harus mengetik ulang info di banyak grup WhatsApp, sering ditanya berulang oleh anggota kelas.
- **Goal:** Input data sekali, tersebar ke semua anggota kelas secara otomatis.

---

## 3. Target Spesifik: Kelas 06TPLK005

### 3.1 Profil Kelas

| Field | Detail |
|---|---|
| **Kode Kelas** | 06TPLK005 |
| **Program Studi** | Teknik Informatika |
| **Semester** | 6 (Genap 2025/2026) |
| **Jumlah Mahasiswa** | 36 Orang |
| **Hari Kuliah Utama** | Kamis (Full Day) |
| **Total SKS** | 20 SKS |
| **Jumlah Mata Kuliah** | 8 Mata Kuliah |

### 3.2 Daftar Mahasiswa

| No | NIM | Nama Lengkap |
|---|---|---|
| 1 | 231011401559 | ABDUL KHAMID |
| 2 | 231011402558 | ADRIAN RAMADHAN |
| 3 | 231011401702 | AHMAD AKBAR RAMADHAN |
| 4 | 231011401429 | AHMAD FAUZAN |
| 5 | 231011401943 | AKMAL FATHIN |
| 6 | 231011402509 | ALFIN HINDRA SAPUTRA |
| 7 | 231011402794 | ANDRIYAN SAPUTRA |
| 8 | 231011402857 | ANSGERIA M. P. UN |
| 9 | 231011402665 | ARDIAN SETIAWAN |
| 10 | 231011400704 | ASWANGGA RAKHI PRAWIRA RIFANKA |
| 11 | 231011402978 | AYOGA UGI DIASAPUTRA |
| 12 | 201011450337 | BAGAS ARIOHADI HUTOMO |
| 13 | 221011402451 | BAYU RAIHAN SANJAYA |
| 14 | 231011401297 | CANTIKA NABILA PUTRI AZHARI |
| 15 | 231011401530 | EKO SAPUTRA |
| 16 | 221011450407 | FURQON HASBI |
| 17 | 231011402115 | HAFIZH ELMAWAN |
| 18 | 231011402922 | IKHRAM DARMAWAN |
| 19 | 231011402339 | JIDAN NUGROHO |
| 20 | 231011401294 | LA ANWAR |
| 21 | 231011403262 | MALIKA SHAKILA |
| 22 | 211011450589 | MIA HILMIAH |
| 23 | 231011402780 | MOHAMAD RIZKY EKA SAPUTRA |
| 24 | 221011450130 | MUHAMAD NANDANA |
| 25 | 231011401834 | MUHAMMAD RIDHOILLAH ZAMZAMI |
| 26 | 231011402809 | MUHAMMAD SUNANDI IRSYAD |
| 27 | 231011400623 | MUSABBIN HATUN S |
| 28 | 231011401825 | NASRUL AZIZ |
| 29 | 231011402883 | NAZA ADITYA |
| 30 | 231011403255 | PAULUS SATRIAWAN HARSON |
| 31 | 231011401569 | PUTRA CANDRA AGENG |
| 32 | 231011400802 | QISHA RAHADATUL AISY |
| 33 | 231011400759 | RIZQI MUHAMMAD IKHSAN |
| 34 | 231011402074 | SITI AISYAH BIMA |
| 35 | 221011450028 | SUPRIANTO |
| 36 | 231011400613 | TANIA VICKY AULIA AZ ZAHRA |

### 3.3 Daftar Mata Kuliah & Jadwal

| No | Mata Kuliah | SKS | Dosen Pengampu | Hari | Sesi |
|---|---|---|---|---|---|
| 1 | Rekayasa Perangkat Lunak | 3 | INTAN KUMALASARI S.Kom., M.Kom. | Kamis | K-1 |
| 2 | Kerja Praktek | 2 | FARIZI ILHAM S.Kom., M.Kom. | Kamis | K-2 |
| 3 | Teknologi Internet of Things | 2 | NURHALIMAH S.Kom., M.Kom. | Kamis | K-2 |
| 4 | Pemrograman II | 3 | MUHAMMAD YASSER ARAFAT S.Kom., M.Kom | Kamis | K-1 |
| 5 | Basis Data II | 3 | SOPIYAN APANDI S.KOM., M.KOM. | Kamis | K-2 |
| 6 | Mobile Programming | 3 | FARIDA NURLAILA S.Kom., M.Kom. | Kamis | K-2 |
| 7 | Sistem Pendukung Keputusan | 2 | KECITAAN HAREFA S.Kom, M.Kom | Kamis | K-1 |
| 8 | Teknik Kompilasi | 2 | HERWIS GULTOM S.Kom., M.Kom. | Kamis | K-1 |

---

## 4. Arsitektur Sistem

### 4.1 Tech Stack

| Layer | Teknologi | Justifikasi |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | SSR/SSG, routing file-based, React Server Components |
| **Language** | TypeScript | Type safety, developer experience, maintainability |
| **Styling** | Tailwind CSS v4 | Utility-first, rapid prototyping, purge-ready |
| **UI Components** | Shadcn UI | Accessible, customizable, built on Radix UI |
| **Icons** | Lucide React | Konsisten, ringan, tree-shakeable |
| **Backend** | Supabase (PostgreSQL) | Managed DB, Auth, Realtime subscriptions, Storage |
| **Auth** | Supabase Auth | Email/password, social login, JWT-based sessions |
| **Realtime** | Supabase Realtime | WebSocket-based, row-level change detection |
| **Deployment** | Vercel | Edge-optimized, automatic CI/CD, preview deploys |
| **Font** | Inter (Google Fonts) | Keterbacaan optimal, support karakter Latin |

### 4.2 Diagram Arsitektur (High-Level)

```
┌──────────────────────────────────────────────────────┐
│                    CLIENT LAYER                       │
│                                                      │
│   ┌────────────┐  ┌────────────┐  ┌──────────────┐  │
│   │  Dashboard  │  │  Calendar  │  │   Tasks      │  │
│   │  (Beranda)  │  │  (Jadwal)  │  │   (Tugas)    │  │
│   └──────┬─────┘  └──────┬─────┘  └──────┬───────┘  │
│          │               │               │           │
│          └───────────────┼───────────────┘           │
│                          │                           │
│              ┌───────────▼──────────┐                │
│              │  Next.js App Router  │                │
│              │  (Server Components) │                │
│              └───────────┬──────────┘                │
└──────────────────────────┼───────────────────────────┘
                           │
                   ┌───────▼───────┐
                   │  Supabase SDK │
                   │  (Client/SSR) │
                   └───────┬───────┘
                           │
┌──────────────────────────┼───────────────────────────┐
│                   BACKEND LAYER                       │
│                                                      │
│   ┌────────────┐  ┌────────────┐  ┌──────────────┐  │
│   │  Supabase  │  │  Supabase  │  │  Supabase    │  │
│   │  Auth      │  │  Database  │  │  Realtime    │  │
│   │  (JWT)     │  │  (Postgres)│  │  (WebSocket) │  │
│   └────────────┘  └────────────┘  └──────────────┘  │
│                                                      │
│                ┌──────────────────┐                   │
│                │   Row Level      │                   │
│                │   Security (RLS) │                   │
│                └──────────────────┘                   │
└──────────────────────────────────────────────────────┘
```

### 4.3 Struktur Direktori Proyek

```
sitrek-mentari/
├── docs/
│   └── PRD.md                    # Dokumen ini
├── public/
│   ├── icons/                    # PWA icons
│   └── manifest.json             # PWA manifest
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Halaman utama dashboard
│   │   ├── calendar/
│   │   │   └── page.tsx          # Halaman kalender jadwal
│   │   ├── tasks/
│   │   │   └── page.tsx          # Halaman daftar tugas
│   │   ├── profile/
│   │   │   └── page.tsx          # Halaman profil mahasiswa
│   │   ├── login/
│   │   │   └── page.tsx          # Halaman autentikasi (future)
│   │   ├── globals.css           # Design system tokens & utilities
│   │   ├── layout.tsx            # Root layout (Sidebar + BottomNav)
│   │   └── page.tsx              # Redirect ke /dashboard
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BottomNav.tsx     # Navigasi mobile bottom bar
│   │   │   └── Sidebar.tsx       # Navigasi desktop sidebar
│   │   └── ui/                   # Shadcn UI components
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── progress.tsx
│   ├── constants/
│   │   └── classData.ts          # Data kelas 06TPLK005
│   └── lib/
│       ├── supabase.ts           # Supabase client config
│       └── utils.ts              # Utility functions (cn, etc.)
├── .env.local                    # Environment variables
├── PRD.md                        # Shortcut ke docs/PRD.md
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies & scripts
```

---

## 5. Skema Database (Supabase)

### 5.1 Entity Relationship Diagram (ERD)

```
┌──────────────┐    ┌──────────────────┐    ┌──────────────┐
│   profiles   │    │    schedules      │    │    tasks      │
├──────────────┤    ├──────────────────┤    ├──────────────┤
│ id (PK, FK)  │    │ id (PK, UUID)    │    │ id (PK, UUID)│
│ nim          │    │ class_id (FK)    │    │ class_id (FK)│
│ full_name    │    │ course_name      │    │ course_name  │
│ role         │    │ lecturer         │    │ title        │
│ class_id     │    │ day              │    │ description  │
│ avatar_url   │    │ time_start       │    │ priority     │
│ created_at   │    │ time_end         │    │ deadline     │
│ updated_at   │    │ room             │    │ attachments  │
└──────┬───────┘    │ sks              │    │ status       │
       │            │ status           │    │ created_by   │
       │            │ note             │    │ created_at   │
       │            │ updated_by (FK)  │    │ updated_at   │
       │            │ created_at       │    └──────────────┘
       │            │ updated_at       │
       │            └──────────────────┘    ┌──────────────────┐
       │                                    │  announcements   │
       │            ┌──────────────────┐    ├──────────────────┤
       │            │    classes        │    │ id (PK, UUID)    │
       │            ├──────────────────┤    │ class_id (FK)    │
       └───────────►│ id (PK)          │    │ title            │
                    │ code (UNIQUE)    │    │ content          │
                    │ program_studi    │    │ priority         │
                    │ semester         │    │ is_pinned        │
                    │ academic_year    │    │ created_by (FK)  │
                    │ created_at       │    │ expires_at       │
                    └──────────────────┘    │ created_at       │
                                            └──────────────────┘
```

### 5.2 SQL Schema

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Classes Table
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(20) UNIQUE NOT NULL,         -- e.g., '06TPLK005'
  program_studi VARCHAR(100) NOT NULL,
  semester INTEGER NOT NULL,
  academic_year VARCHAR(20) NOT NULL,        -- e.g., '2025/2026'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Profiles Table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nim VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(200) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'MAHASISWA'
    CHECK (role IN ('MAHASISWA', 'KETUA_KELAS', 'ADMIN')),
  class_id UUID REFERENCES classes(id),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Schedules Table
CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id),
  course_name VARCHAR(200) NOT NULL,
  lecturer VARCHAR(200) NOT NULL,
  day VARCHAR(10) NOT NULL CHECK (day IN ('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu')),
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  room VARCHAR(50),
  sks INTEGER NOT NULL DEFAULT 2,
  status VARCHAR(20) NOT NULL DEFAULT 'NORMAL'
    CHECK (status IN ('NORMAL', 'DOSEN_BERHALANGAN', 'GANTI_RUANG', 'LIBUR', 'UJIAN')),
  note TEXT,
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tasks Table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id),
  course_name VARCHAR(200) NOT NULL,
  title VARCHAR(300) NOT NULL,
  description TEXT,
  priority VARCHAR(10) NOT NULL DEFAULT 'SEDANG'
    CHECK (priority IN ('RENDAH', 'SEDANG', 'TINGGI')),
  deadline TIMESTAMPTZ NOT NULL,
  attachments JSONB DEFAULT '[]',            -- Array of { url, filename, type }
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
    CHECK (status IN ('ACTIVE', 'COMPLETED', 'OVERDUE', 'CANCELLED')),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Announcements Table
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id),
  title VARCHAR(300) NOT NULL,
  content TEXT NOT NULL,
  priority VARCHAR(10) NOT NULL DEFAULT 'NORMAL'
    CHECK (priority IN ('NORMAL', 'PENTING', 'URGENT')),
  is_pinned BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_schedules_class_day ON schedules(class_id, day);
CREATE INDEX idx_tasks_class_deadline ON tasks(class_id, deadline);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_announcements_class ON announcements(class_id);
CREATE INDEX idx_profiles_class ON profiles(class_id);
```

### 5.3 Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all profiles in their class, edit only their own
CREATE POLICY "profiles_read_own_class" ON profiles
  FOR SELECT USING (
    class_id = (SELECT class_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (id = auth.uid());

-- Schedules: All class members can read, only KETUA_KELAS can write
CREATE POLICY "schedules_read_class" ON schedules
  FOR SELECT USING (
    class_id = (SELECT class_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "schedules_write_ketua" ON schedules
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'KETUA_KELAS'
      AND class_id = schedules.class_id
    )
  );

-- Tasks: Same pattern as schedules
CREATE POLICY "tasks_read_class" ON tasks
  FOR SELECT USING (
    class_id = (SELECT class_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "tasks_write_ketua" ON tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'KETUA_KELAS'
      AND class_id = tasks.class_id
    )
  );

-- Announcements: Same pattern
CREATE POLICY "announcements_read_class" ON announcements
  FOR SELECT USING (
    class_id = (SELECT class_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "announcements_write_ketua" ON announcements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'KETUA_KELAS'
      AND class_id = announcements.class_id
    )
  );
```

---

## 6. Fitur & User Stories

### 6.1 Dashboard (Beranda)

| ID | User Story | Priority | Status |
|---|---|---|---|
| US-01 | Sebagai mahasiswa, saya ingin melihat jadwal hari ini di dashboard agar tahu mata kuliah apa yang harus diikuti. | P0 (Critical) | ✅ Done |
| US-02 | Sebagai mahasiswa, saya ingin melihat tugas terdekat agar tidak ketinggalan deadline. | P0 (Critical) | ✅ Done |
| US-03 | Sebagai mahasiswa, saya ingin melihat pengumuman terbaru dari ketua kelas. | P1 (High) | 🔲 Planned |
| US-04 | Sebagai mahasiswa, saya ingin melihat statistik kehadiran dosen dan progres tugas. | P1 (High) | ✅ Done |

### 6.2 Kalender (Jadwal)

| ID | User Story | Priority | Status |
|---|---|---|---|
| US-05 | Sebagai mahasiswa, saya ingin melihat jadwal mingguan dalam format timeline. | P0 (Critical) | ✅ Done |
| US-06 | Sebagai mahasiswa, saya ingin tahu status setiap sesi (Normal/Dosen Berhalangan/Ganti Ruang). | P1 (High) | 🔲 Planned |
| US-07 | Sebagai ketua kelas, saya ingin mengubah status jadwal secara instan. | P1 (High) | 🔲 Planned |

### 6.3 Tugas

| ID | User Story | Priority | Status |
|---|---|---|---|
| US-08 | Sebagai mahasiswa, saya ingin melihat daftar tugas per mata kuliah. | P0 (Critical) | ✅ Done |
| US-09 | Sebagai mahasiswa, saya ingin filter tugas berdasarkan prioritas dan status. | P2 (Medium) | 🔲 Planned |
| US-10 | Sebagai ketua kelas, saya ingin menambah tugas baru dengan deadline dan lampiran. | P1 (High) | 🔲 Planned |
| US-11 | Sebagai ketua kelas, saya ingin mengedit atau menghapus tugas yang sudah ada. | P1 (High) | 🔲 Planned |

### 6.4 Profil

| ID | User Story | Priority | Status |
|---|---|---|---|
| US-12 | Sebagai mahasiswa, saya ingin melihat profil akademik saya (NIM, Kelas, Prodi). | P1 (High) | ✅ Done |
| US-13 | Sebagai mahasiswa, saya ingin logout dari aplikasi. | P1 (High) | 🔲 Planned |

### 6.5 Autentikasi

| ID | User Story | Priority | Status |
|---|---|---|---|
| US-14 | Sebagai mahasiswa, saya ingin login menggunakan NIM dan password. | P0 (Critical) | 🔲 Planned |
| US-15 | Sebagai mahasiswa baru, saya ingin mendaftar menggunakan NIM yang sudah terdaftar di sistem. | P0 (Critical) | 🔲 Planned |

---

## 7. Spesifikasi Halaman & UI

### 7.1 Dashboard (`/dashboard`)

**Layout:** Grid 12 kolom (Desktop), Single column (Mobile).

| Zona | Komponen | Deskripsi |
|---|---|---|
| **Top Bar** | Welcome message, Search, Notification bell | Header utama dengan sapaan personal |
| **Hero Banner** | Motivational banner + CTA | Banner hijau gelap dengan ajakan "Learn today, succeed tomorrow!" |
| **Stats Row** | 3x StatCard | Ringkasan: New Tasks, Attendance, Assignments |
| **Active Courses** | 3x CourseCard (grid) | Menampilkan 3 mata kuliah teratas dengan progress bar |
| **Calendar Widget** | Mini calendar (Right sidebar) | Toggle Weekly/Monthly, highlight hari aktif |
| **Homework Progress** | Progress items (Right sidebar) | Daftar tugas dengan segmented progress bar |

### 7.2 Kalender (`/calendar`)

| Zona | Komponen | Deskripsi |
|---|---|---|
| **Header** | Title + Month navigator | Navigasi bulan (< April 2026 >) |
| **Day Selector** | Horizontal day pills | Senin-Sabtu dengan highlight hari aktif |
| **Timeline** | Vertical timeline cards | Jadwal bertumpuk dengan garis penghubung vertikal |

### 7.3 Tugas (`/tasks`)

| Zona | Komponen | Deskripsi |
|---|---|---|
| **Header** | Title + Badge count | "Tugas Kuliah" + "8 Matkul" |
| **Search** | Input dengan icon Search | Pencarian tugas/mata kuliah |
| **Course List** | Course cards dengan alert | Per-matkul: nama, dosen, tugas terdekat |

### 7.4 Profil (`/profile`)

| Zona | Komponen | Deskripsi |
|---|---|---|
| **Avatar Card** | Foto, nama, NIM, kelas | Kartu profil utama dengan gradient background |
| **Info Grid** | 3x info items | Program Studi, Status, Email |
| **Logout** | Red button | Tombol logout di bagian bawah |

---

## 8. Design System

### 8.1 Palet Warna

| Token | Nilai | Penggunaan |
|---|---|---|
| `--color-primary` | Deep Blue `oklch(0.45 0.15 260)` | Navigasi aktif, heading, CTA |
| `--color-accent` | Amber `oklch(0.75 0.15 75)` | Badge, highlight tugas, secondary CTA |
| `--color-background` | Soft Gray `#F0F2F5` | Latar belakang aplikasi |
| `--color-card` | White `rgba(255,255,255,0.7)` | Kartu konten dengan glassmorphism |
| `--color-foreground` | Near Black `oklch(0.15 0.01 260)` | Teks utama |
| `--color-muted` | Gray | Teks sekunder, placeholder |
| `--color-destructive` | Red | Error, hapus, logout |

### 8.2 Glassmorphism Utilities

```css
.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-card {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}
```

### 8.3 Typography

| Element | Font | Size | Weight |
|---|---|---|---|
| H1 (Page Title) | Inter | 30px (text-3xl) | Bold (700) |
| H2 (Section Title) | Inter | 20px (text-xl) | Bold (700) |
| H3 (Card Title) | Inter | 14px (text-sm) | Bold (700) |
| Body | Inter | 14px (text-sm) | Regular (400) |
| Caption | Inter | 10px (text-[10px]) | Bold (700) |

### 8.4 Spacing & Radius

| Token | Nilai |
|---|---|
| Card Radius | `1.5rem` (rounded-3xl) |
| Button Radius | `0.75rem` (rounded-xl) |
| Badge Radius | `9999px` (rounded-full) |
| Section Gap | `2rem` (gap-8) |
| Card Padding | `1.5rem` (p-6) |

### 8.5 Breakpoints (Responsive)

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile (Default) | < 768px | Single column, BottomNav visible |
| Tablet (md) | 768px - 1279px | Sidebar icon-only (w-20), no right sidebar |
| Desktop (xl) | ≥ 1280px | Full sidebar (w-64) + Right sidebar (4 cols) |

---

## 9. API & Data Flow

### 9.1 Supabase Client Configuration

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 9.2 Data Fetching Patterns

| Operasi | Method | Contoh |
|---|---|---|
| Ambil jadwal hari ini | `supabase.from('schedules').select().eq('day', 'Kamis')` | Dashboard |
| Ambil tugas aktif | `supabase.from('tasks').select().eq('status', 'ACTIVE').order('deadline')` | Tasks page |
| Update status jadwal | `supabase.from('schedules').update({ status }).eq('id', scheduleId)` | Ketua Kelas |
| Tambah tugas baru | `supabase.from('tasks').insert({ ... })` | Ketua Kelas |
| Realtime subscription | `supabase.channel('schedules').on('postgres_changes', ...)` | All pages |

### 9.3 Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## 10. Autentikasi & Keamanan

### 10.1 Auth Flow

```
┌─────────┐    ┌──────────────┐    ┌──────────────┐
│  Login   │───►│ Supabase Auth│───►│  profiles     │
│  Page    │    │ (Email/Pass) │    │  table lookup │
└─────────┘    └──────┬───────┘    └──────┬───────┘
                      │                    │
                      ▼                    ▼
               ┌──────────────┐    ┌──────────────┐
               │  JWT Token   │    │  Role Check  │
               │  (Session)   │    │  (RLS)       │
               └──────────────┘    └──────────────┘
```

### 10.2 Security Checklist

- [x] Row Level Security (RLS) pada semua tabel.
- [ ] Input validation pada semua form.
- [ ] Rate limiting pada API calls.
- [ ] XSS protection via React's built-in escaping.
- [ ] CSRF protection via Supabase session tokens.
- [ ] Sensitive data tidak disimpan di localStorage.

---

## 11. Notifikasi & Realtime

### 11.1 Realtime Subscriptions

```typescript
// Contoh: Subscribe ke perubahan jadwal
const channel = supabase
  .channel('schedule-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'schedules', filter: `class_id=eq.${classId}` },
    (payload) => {
      // Update UI otomatis
      handleScheduleChange(payload)
    }
  )
  .subscribe()
```

### 11.2 Push Notifications (Future)

| Event Trigger | Pesan Notifikasi |
|---|---|
| Status jadwal berubah ke `DOSEN_BERHALANGAN` | "⚠️ Kuliah [Matkul] hari ini dibatalkan!" |
| Tugas baru ditambahkan | "📝 Tugas baru: [Judul] — Deadline [Tanggal]" |
| Pengumuman `URGENT` dibuat | "🚨 PENTING: [Judul Pengumuman]" |
| Deadline H-1 | "⏰ Reminder: [Judul Tugas] deadline besok!" |

---

## 12. Progressive Web App (PWA)

### 12.1 Manifest Configuration

```json
{
  "name": "SITREK-MENTARI",
  "short_name": "Sitrek",
  "description": "Tracking Kelas Mentari UNPAM",
  "start_url": "/dashboard",
  "display": "standalone",
  "background_color": "#F0F2F5",
  "theme_color": "#1E40AF",
  "icons": [
    { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### 12.2 PWA Checklist

- [x] `manifest.json` dikonfigurasi.
- [x] Icon 192x192 dan 512x512 tersedia.
- [ ] Service Worker untuk offline caching.
- [ ] Add to Home Screen prompt.
- [ ] Splash screen konfigurasi.

---

## 13. Non-Functional Requirements

| Requirement | Target | Metrik |
|---|---|---|
| **Performance** | First Contentful Paint < 1.5s | Lighthouse |
| **Responsiveness** | Usable di 320px - 2560px | Manual testing |
| **Availability** | 99.5% uptime | Vercel + Supabase SLA |
| **Scalability** | Support hingga 500 concurrent users | Supabase free tier |
| **Load Time** | Dashboard load < 2s (3G) | WebPageTest |
| **Bundle Size** | < 200KB (gzipped, initial) | Next.js build analyzer |
| **Lighthouse Score** | > 90 (Performance, A11y, SEO) | Lighthouse audit |

---

## 14. Error Handling & Edge Cases

### 14.1 Error States

| Skenario | Handling | UI |
|---|---|---|
| Network offline | Cache data terakhir, tampilkan banner "Offline" | Toast notification + offline indicator |
| Supabase down | Fallback ke konstanta lokal | Error boundary + retry button |
| Token expired | Auto-refresh via Supabase SDK | Silent refresh, redirect ke login jika gagal |
| Empty state (no tasks) | Tampilkan ilustrasi + CTA | "Belum ada tugas. Santai dulu! 😎" |
| 404 Page | Custom 404 page | Redirect ke dashboard |

### 14.2 Edge Cases

| Case | Handling |
|---|---|
| Dua mata kuliah di jam sama (K-1 & K-2) | Tampilkan keduanya, beri label sesi |
| Tugas diupdate saat user sedang melihat | Realtime update via subscription |
| Lebih dari 10 tugas aktif | Pagination / infinite scroll |
| Nama mahasiswa sangat panjang | Truncate dengan ellipsis (CSS `line-clamp`) |

---

## 15. Testing Strategy

### 15.1 Testing Levels

| Level | Tool | Coverage Target |
|---|---|---|
| Unit Tests | Vitest | Utility functions, data transforms |
| Component Tests | React Testing Library | UI components rendering & interaction |
| E2E Tests | Playwright | Critical user flows (login, view dashboard) |
| Visual Regression | Storybook + Chromatic (optional) | UI consistency across updates |

### 15.2 Critical Test Scenarios

1. Dashboard menampilkan jadwal yang benar berdasarkan hari.
2. Tugas diurutkan berdasarkan deadline terdekat.
3. Status jadwal terupdate secara realtime.
4. Login dengan NIM valid berhasil, NIM invalid menampilkan error.
5. Role KETUA_KELAS dapat mengakses form input, MAHASISWA tidak.

---

## 16. Deployment & DevOps

### 16.1 CI/CD Pipeline

```
Push to main ──► Vercel Auto Deploy ──► Preview URL
                                    ──► Production (on merge)
```

### 16.2 Environment Setup

| Environment | URL | Keterangan |
|---|---|---|
| Development | `localhost:3000` | Local development |
| Preview | `*.vercel.app` | Per-branch preview |
| Production | `sitrek-mentari.vercel.app` | Production release |

### 16.3 Required Secrets

| Variable | Location | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel Environment | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel Environment | ✅ Yes |

---

## 17. Analytics & Monitoring

### 17.1 Metrics to Track

| Metrik | Tool | Tujuan |
|---|---|---|
| Page views & sessions | Vercel Analytics | Mengukur adopsi pengguna |
| Core Web Vitals | Vercel Speed Insights | Monitoring performa |
| Error rate | Sentry (optional) | Deteksi bug cepat |
| Active users per day | Custom Supabase query | Mengukur engagement |

---

## 18. Accessibility (a11y)

### 18.1 Checklist

- [ ] Semua elemen interaktif memiliki `aria-label` yang deskriptif.
- [ ] Kontras warna memenuhi WCAG 2.1 AA (ratio ≥ 4.5:1).
- [ ] Navigasi keyboard berfungsi penuh (Tab, Enter, Escape).
- [ ] Focus visible pada semua elemen interaktif.
- [ ] Screen reader compatible (tested with NVDA/VoiceOver).
- [ ] Responsive text (tidak ada fixed font-size < 12px untuk body text).

---

## 19. Roadmap & Milestones

### Fase 1: Foundation ✅ (Selesai)
- [x] Inisialisasi proyek Next.js + Tailwind CSS + Shadcn UI.
- [x] Design System (OKLCH Colors, Glassmorphism, Inter font).
- [x] Layout Mobile-First (BottomNav).
- [x] Supabase client setup.

### Fase 2: Core UI ✅ (Selesai)
- [x] Dashboard Mahasiswa dengan data spesifik kelas 06TPLK005.
- [x] Halaman Kalender dengan timeline vertikal.
- [x] Halaman Tugas per mata kuliah.
- [x] Halaman Profil mahasiswa.
- [x] Desktop Sidebar navigation.
- [x] Layout upgrade (Grid 12 kolom, Hero banner, Stats cards).

### Fase 3: Backend Integration 🔲 (Next)
- [ ] Konfigurasi Supabase project (create tables, enable RLS).
- [ ] Implementasi Supabase Auth (Login/Register dengan NIM).
- [ ] Migrasi dari konstanta lokal ke database Supabase.
- [ ] Server-side data fetching (React Server Components).

### Fase 4: Ketua Kelas Portal 🔲
- [ ] Form input/edit jadwal (CRUD).
- [ ] Form input/edit tugas dengan file attachment.
- [ ] Form pengumuman kelas.
- [ ] Role-based UI rendering (Ketua vs Mahasiswa).

### Fase 5: Realtime & Notifications 🔲
- [ ] Supabase Realtime subscriptions.
- [ ] Web Push API + Service Worker.
- [ ] In-app notification center.
- [ ] Deadline reminder system.

### Fase 6: Polish & Launch 🔲
- [ ] PWA optimization (offline support, splash screen).
- [ ] Lighthouse audit & performance optimization.
- [ ] Accessibility audit (WCAG 2.1 AA).
- [ ] User acceptance testing (UAT) dengan kelas 06TPLK005.
- [ ] Production deployment ke Vercel.

---

## 20. Appendix

### 20.1 Glossary

| Istilah | Definisi |
|---|---|
| **SITREK** | Sistem Informasi Tracking |
| **MENTARI** | Nama portal e-learning UNPAM |
| **RLS** | Row Level Security — kebijakan akses data di level baris pada PostgreSQL |
| **PWA** | Progressive Web App — web application yang bisa diinstall seperti native app |
| **SKS** | Satuan Kredit Semester |
| **SSR** | Server-Side Rendering |
| **JWT** | JSON Web Token — standar autentikasi berbasis token |
| **OKLCH** | Color space modern untuk konsistensi warna di berbagai perangkat |

### 20.2 Revision History

| Versi | Tanggal | Perubahan | Author |
|---|---|---|---|
| 1.0 | 16 Apr 2026 | Dokumen awal (ringkas) | Tim Dev |
| 2.0 | 19 Apr 2026 | Rewrite lengkap standar industri (20 section): ERD, SQL Schema, RLS, User Stories, Design System, API Flow, Testing Strategy, Roadmap, Accessibility | Tim Dev |

### 20.3 External References

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Portal Mentari UNPAM](https://mentari.unpam.ac.id/)
- [Portal MY UNPAM](https://my.unpam.ac.id/beranda/)

---

*Dokumen ini bersifat dinamis dan akan terus diperbarui seiring berjalannya progres pengembangan. Setiap perubahan signifikan akan dicatat pada Revision History di atas.*
