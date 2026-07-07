# Simulasi CBT — SPMB Mandiri UIN Siber Syekh Nurjati Cirebon

Aplikasi web **latihan simulasi Computer Based Test (CBT)** yang meniru pengalaman ujian
**SPMB Jalur Mandiri Reguler UIN Siber Syekh Nurjati Cirebon**. Dibangun sebagai alat
latihan pribadi/edukatif — **tidak berafiliasi resmi** dengan UIN SSC.

> Struktur mengacu pengumuman resmi SPMB Mandiri 2026 (mata ujian: **Tes Potensi Akademik,
> Kebahasaan, Keislaman**) dan gaya soal UM-PTKIN (SSE). Dokumen PRD lengkap tersedia pada
> pull request PRD terpisah.

## Status: Tahap 0–1 (MVP CBT Inti) ✅

Fitur yang sudah tersedia:

- 🔐 **Autentikasi peserta** (login berbasis sesi JWT httpOnly, peran peserta/admin).
- 🧭 **Dashboard peserta**: daftar paket simulasi, kartu ringkasan, riwayat latihan.
- 🎫 **Token ujian** + halaman konfirmasi detail sebelum mulai.
- 🧩 **Engine ujian 3 subtes berurutan** (TPA → Kebahasaan → Keislaman) dengan:
  - **Timer per-subtes berbasis waktu server** (tahan refresh & manipulasi jam client),
  - **Navigasi nomor soal dengan indikator warna** (terjawab / ragu-ragu / kosong / aktif),
  - **Auto-save** jawaban + **pemulihan state** saat halaman dimuat ulang,
  - Tombol **ragu-ragu**, **sebelumnya/selanjutnya**, dan **auto-submit** saat waktu habis,
  - **Acak urutan soal & opsi** per percobaan,
  - Dukungan **teks Arab (RTL)**.
- 📊 **Skoring otomatis** per subtes + nilai total.
- 📖 **Halaman pembahasan** (kunci jawaban + penjelasan tiap soal).
- 🗃️ **Bank soal awal**: 100 soal (TPA 30, Kebahasaan 40, Keislaman 30) lengkap dengan kunci & pembahasan.

Belum termasuk (rencana Tahap 2–4): panel admin CRUD soal/paket, import massal, analitik,
mode gelap, kartu ujian cetak, dan modul BTQ (rekaman audio).

## Teknologi

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Prisma 6** ORM + **SQLite**
- **jose** (JWT sesi) + **bcryptjs** (hash kata sandi)

## Menjalankan Secara Lokal

Prasyarat: Node.js 20+.

```bash
# 1. Instal dependensi (otomatis menjalankan `prisma generate`)
npm install

# 2. Terapkan skema database (membuat file SQLite prisma/dev.db)
npm run db:migrate

# 3. Isi data awal (subtes, 100 soal, paket ujian, akun demo)
npm run db:seed

# 4. Jalankan server pengembangan
npm run dev
```

Buka http://localhost:3000

### Akun & token demo

| Peran    | Nomor Peserta | Kata Sandi | Token Ujian  |
| -------- | ------------- | ---------- | ------------ |
| Peserta  | `1234567890`  | `password` | `UINSSC2026` |
| Admin    | `admin`       | `admin123` | —            |

## Skrip yang Tersedia

| Skrip                | Keterangan                                        |
| -------------------- | ------------------------------------------------- |
| `npm run dev`        | Menjalankan server pengembangan                   |
| `npm run build`      | Build produksi                                    |
| `npm run start`      | Menjalankan hasil build produksi                  |
| `npm run lint`       | Menjalankan ESLint                                |
| `npm run db:migrate` | Menerapkan migrasi Prisma (dev)                   |
| `npm run db:seed`    | Mengisi ulang data awal (idempotent)              |
| `npm run db:reset`   | Reset database lalu migrasi ulang                 |

## Struktur Singkat

```
prisma/
  schema.prisma          # Model data (User, Subtest, Question, ExamPackage, Attempt, ...)
  seed.ts                # Skrip seeding
  data/                  # Bank soal: tpa.ts, bahasa.ts, keislaman.ts
src/
  middleware.ts          # Proteksi rute + redirect sesi
  lib/
    session.ts           # JWT sesi (edge-safe)
    auth.ts              # Hash kata sandi + baca sesi
    exam.ts              # Logika ujian: mulai, timer server, skoring, hasil, review
    prisma.ts            # Prisma client singleton
  app/
    login/               # Halaman login
    dashboard/           # Dashboard peserta
    ujian/[id]/          # Runner CBT (timer, navigasi, auto-save)
    hasil/[id]/          # Halaman hasil + /review pembahasan
    api/                 # Route handler (auth, packages, attempts)
```

## Konfigurasi

- `AUTH_SECRET` (opsional): kunci penandatanganan sesi JWT. Ada nilai default untuk
  pengembangan; **wajib diisi di produksi**. Lihat `.env.example`.
- URL database SQLite diset langsung di `prisma/schema.prisma` (`file:./dev.db`).

---

Alat latihan pribadi. Tidak berafiliasi dengan UIN Siber Syekh Nurjati Cirebon.
