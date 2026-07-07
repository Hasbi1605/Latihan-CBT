# Simulasi CBT — SPMB Mandiri UIN Siber Syekh Nurjati Cirebon

Aplikasi web **latihan simulasi Computer Based Test (CBT)** yang meniru pengalaman ujian
**SPMB Jalur Mandiri Reguler UIN Siber Syekh Nurjati Cirebon**. Dibangun sebagai alat
latihan pribadi/edukatif — **tidak berafiliasi resmi** dengan UIN SSC.

> Struktur mengacu pengumuman resmi SPMB Mandiri 2026 (mata ujian: **Tes Potensi Akademik,
> Kebahasaan, Keislaman**) dan gaya soal UM-PTKIN (SSE). Dokumen PRD lengkap tersedia pada
> pull request PRD terpisah.

## Status: Tahap 0–5 ✅

### Peserta
- 🔐 Autentikasi peserta & admin (JWT httpOnly)
- 🧭 Dashboard: paket simulasi, filter mode, riwayat, kartu ujian virtual
- 🎫 Token ujian + konfirmasi sebelum mulai
- 🧩 Engine ujian multi-subtes berurutan dengan timer server, auto-save, ragu-ragu, acak soal/opsi
- 🌙 Mode gelap + ukuran font (preferensi tersimpan)
- ⚠ Deteksi tab blur (counter)
- 📊 Skoring otomatis PG + halaman pembahasan
- 🎙 Modul BTQ opsional: teori PG + rekaman audio (penilaian manual admin)
- 🪪 Kartu ujian virtual (cetak/PDF)

### Admin
- 📈 Dashboard analitik (performa subtes, subkategori lemah, percobaan terbaru)
- 📝 CRUD bank soal + import/export JSON
- 📦 Manajemen paket ujian
- 🎧 Penilaian rekaman BTQ (rubrik kelancaran, tajwid, makhraj)

## Teknologi

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Prisma 6** ORM + **SQLite**
- **jose** (JWT sesi) + **bcryptjs** (hash kata sandi)

## Menjalankan Secara Lokal

Prasyarat: Node.js 20+.

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Buka http://localhost:3000

### Akun & token demo

| Peran    | Nomor Peserta | Kata Sandi | Token Ujian                          |
| -------- | ------------- | ---------- | ------------------------------------ |
| Peserta  | `1234567890`  | `password` | `UINSSC2026` (Replika) / `LATIHANBTQ` (Lengkap+BTQ) |
| Admin    | `admin`       | `admin123` | —                                    |

## Skrip yang Tersedia

| Skrip                | Keterangan                                        |
| -------------------- | ------------------------------------------------- |
| `npm run dev`        | Server pengembangan                               |
| `npm run build`      | Build produksi                                    |
| `npm run start`      | Jalankan hasil build                              |
| `npm run test:e2e`   | Tes API end-to-end (butuh server jalan)           |
| `npm run db:migrate` | Migrasi Prisma                                    |
| `npm run db:seed`    | Isi ulang data awal                               |
| `npm run db:reset`   | Reset database                                    |

### Tes E2E

```bash
npm run build && npm run start &
BASE=http://localhost:3000 npm run test:e2e
```

## Struktur Singkat

```
prisma/
  schema.prisma          # Model data (+ BTQ rekaman, tab blur)
  seed.ts                # 100 soal inti + 11 soal BTQ, 2 paket
  data/                  # tpa, bahasa, keislaman, btq
src/
  middleware.ts          # Proteksi rute + redirect admin
  lib/exam.ts            # Logika ujian, rekaman, skoring
  app/
    dashboard/           # Dashboard + kartu ujian
    admin/               # Panel admin (soal, paket, BTQ, analitik)
    ujian/[id]/          # Runner CBT (+ MediaRecorder BTQ)
    hasil/[id]/          # Hasil + pembahasan
    api/                 # REST API peserta & admin
```

## Konfigurasi

- `AUTH_SECRET` (opsional): kunci JWT sesi — wajib di produksi.
- Database SQLite: `prisma/dev.db`
- Rekaman audio disimpan di `uploads/` (diabaikan git)

---

Alat latihan pribadi. Tidak berafiliasi dengan UIN Siber Syekh Nurjati Cirebon.
