# SITREK-MENTARI 🚀
### **Sistem Informasi Tracking Kelas Mentari (Universitas Pamulang)**

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**SITREK-MENTARI** adalah platform tracking akademik kelas yang bertindak sebagai *Single Point of Truth* bagi mahasiswa Universitas Pamulang (UNPAM). Dirancang sebagai pendamping sistem **My UNPAM** dan **Mentari (LMS)**, platform ini fokus pada sentralisasi jadwal kuliah, manajemen tugas, dan pengumuman secara *real-time*.

---

## 🏗️ Core Architecture & Concept

Di era informasi yang tersebar di berbagai grup WhatsApp dan platform kampus, SITREK-MENTARI hadir untuk meminimalisir miskomunikasi.

- **Data Curation**: Ketua Kelas bertindak sebagai kurator data utama.
- **Real-time Engine**: Menggunakan Supabase Realtime untuk sinkronisasi data instan ke seluruh mahasiswa tanpa refresh.
- **Mobile-First PWA**: Dioptimalkan untuk akses cepat melalui perangkat mobile mahasiswa.

---

## ✨ Fitur Utama (MVP)

| Modul | Deskripsi | Status |
|---|---|---|
| **Real-time Dashboard** | Overview jadwal hari ini, tugas mendekati deadline, dan pengumuman terbaru. | 🟢 Ready |
| **Unified Calendar** | Integrasi jadwal kuliah mingguan dan marker deadline tugas dalam satu tampilan. | 🟢 Ready |
| **Task Management** | CRUD tugas oleh Ketua Kelas dengan sistem prioritas dan status progres. | 🟢 Ready |
| **Schedule Control** | Manajemen jadwal kuliah dengan penanda status khusus (Dosen Berhalangan, Libur, dll). | 🟢 Ready |
| **Web Push Notification** | Notifikasi langsung ke perangkat user untuk setiap perubahan data kritis. | 🟡 In-Progress |
| **PWA Support** | Installable di homescreen dengan dukungan *offline fallback*. | 🟢 Ready |

---

## 🛠️ Technology Stack

Dirancang dengan standar industri modern untuk performa dan skalabilitas:

- **Frontend**: [Next.js 16.2+](https://nextjs.org/) (App Router), [React 19.2](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Backend/Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Real-time**: Supabase Realtime (WebSocket)
- **Authentication**: Supabase Auth (JWT based)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- NPM / PNPM / Bun
- Supabase Account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ardians45/sitrek-mentari.git
   cd sitrek-mentari
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Buat file `.env.local` dan masukkan konfigurasi Supabase Anda:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

---

## 📁 Project Structure

```text
src/
├── app/              # Next.js App Router (Pages & Layouts)
├── components/       # UI Components (Atomic Design)
│   ├── ui/           # shadcn/ui base components
│   ├── layout/       # Navigation & structural components
│   └── dashboard/    # Feature-specific components
├── lib/              # Utilities & Shared Logic (Supabase client, etc.)
├── hooks/            # Custom React Hooks
└── types/            # TypeScript Definitions
public/               # Static Assets & PWA Icons
docs/                 # Product Documentation (PRD, Specs)
```

---

## 🤝 Roadmap & Contribution

Pengembangan SITREK-MENTARI mengikuti [PRD v2.0](docs/PRD.md). Kami menyambut kontribusi dari teman-teman mahasiswa kelas 06TPLK005 untuk peningkatan fitur.

1. **Phase 1 (MVP)**: Core tracking & Real-time sync.
2. **Phase 2**: Push Notifications & Advanced Analytics.
3. **Phase 3**: Integrasi (Auto-sync) jika API Mentari/MyUNPAM tersedia.

---

## 📄 License & Attribution

Proyek ini dikembangkan oleh **Tim SITREK-MENTARI** untuk mendukung kegiatan akademik di lingkungan Universitas Pamulang.

© 2026 SITREK-MENTARI Team. Released under the [MIT License](LICENSE).
