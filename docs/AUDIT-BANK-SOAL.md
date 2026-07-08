# Audit Bank Soal — Latihan CBT UIN SSC

**Tanggal:** 2026-07-08  
**Total soal:** 111 (108 PG + 3 rekaman BTQ)  
**Sumber data:** `prisma/data/*.ts`  
**Script otomatis:** `npm run audit:questions`

---

## Ringkasan Eksekutif

| Subtes | Jumlah | Status struktural | Status faktual |
|--------|--------|-------------------|----------------|
| TPA | 30 | ✅ Lulus | ⚠️ Latihan — tidak ada soal figural/gambar |
| Bahasa Indonesia | 14 | ✅ Lulus | ✅ Umumnya valid |
| Bahasa Inggris | 13 | ✅ Lulus | ✅ Umumnya valid |
| Bahasa Arab | 13 | ✅ Lulus | ✅ Umumnya valid |
| Keislaman | 30 | ✅ Lulus | ⚠️ Perlu review ahli (fikih, hadis, sejarah) |
| BTQ | 11 (8 PG + 3 rekaman) | ✅ Lulus | ✅ Diperbaiki (2 error kritis) |

**Kesimpulan:** Bank soal **layak dipakai untuk latihan**, dengan catatan bahwa ini **bukan soal resmi SPMB UIN SSC** dan sebagian butuh validasi ahli sebelum dipakai sebagai acuan ujian sungguhan.

---

## Error Kritis yang Diperbaiki (2026-07-08)

### 1. BTQ — Nun mati + ba (Iqlab)

| | Sebelum | Sesudah |
|---|---------|---------|
| Kunci | `Izhar` ❌ | `Iqlab` ✅ |
| Alasan | Nun sukun + ba → **iqlab** (nun dibaca mim dengan dengung), bukan izhar | |

### 2. BTQ — Idgham bighunnah

| | Sebelum | Sesudah |
|---|---------|---------|
| Pertanyaan | "idgham bila gunnah" (ejaan salah) | "idgham **bighunnah**" |
| Pembahasan | Huruf lam, ra, nun (salah) | Huruf **ي ن م و** (ya, nun, mim, waw) ✅ |

### 3. Bahasa Indonesia — Kata Baku #1

| | Sebelum | Sesudah |
|---|---------|---------|
| Opsi | `" Risik"` (spasi leading) | `"Risico"` |

---

## Temuan per Subtes

### TPA (30 soal)

- **Struktur:** Semua soal punya 5 opsi, kunci valid, pembahasan ada.
- **Kualitas:** Soal verbal, numerik, logika, dan deret angka — konsisten dengan latihan TPA umum.
- **Gap:** Tidak ada soal **figural/spasial** (hanya teks). Ujian TPA asli sering menyertakan pola gambar.
- **Rekomendasi:** Tambah 5–10 soal figural jika ingin mendekati format ujian sungguhan.

### Bahasa Indonesia (14 soal)

- Ejaan, kata baku, PUEBI, imbuhan, konjungsi — umumnya benar.
- Satu typo opsi sudah diperbaiki.

### Bahasa Inggris (13 soal)

- Grammar, vocabulary, reading — standar latihan TOEFL-style ringan.
- Tidak ada error faktual yang terdeteksi.

### Bahasa Arab (13 soal)

- Nahwu, sharaf, mufrodat — level dasar menengah.
- Rekomendasi review native speaker untuk soal i'rab kompleks.

### Keislaman (30 soal)

- Cakupan: aqidah, ibadah, muamalah, akhlak, sejarah Islam.
- **Tidak diaudit faktual mendalam** — beberapa jawaban bergantung mazhab/penafsiran.
- **Rekomendasi wajib:** Review ustadz/ahli keislaman sebelum klaim "jawaban resmi".

### BTQ (11 soal)

- 8 PG + 3 rekaman (tilawah, hafalan, doa).
- Setelah perbaikan idgham & iqlab, regresi faktual lulus di `audit-questions.ts`.
- Rekaman: butuh file audio di `public/audio/btq/` saat deploy.

---

## Validasi Otomatis

Jalankan:

```bash
npm run audit:questions
```

Memeriksa:

- Total 111 soal
- Setiap PG: ≥2 opsi, kunci ada di opsi
- REKAMAN: tanpa opsi, tanpa correctOption
- Distribusi per subtes sesuai seed
- Regresi faktual BTQ (iqlab, idgham bighunnah)

---

## Rekomendasi Lanjutan

1. **Metadata soal:** Tambah field `sumber`, `statusReview` (`draft` | `reviewed` | `verified`) di `QuestionSeed`.
2. **Disclaimer UI:** Tampilkan di landing/dashboard: *"Soal latihan — bukan soal resmi SPMB UIN Siber Cirebon."*
3. **Review ahli:** Keislaman, BTQ tajwid, Bahasa Arab — minimal 1 reviewer per bidang.
4. **TPA figural:** Tambah soal gambar/pola untuk kelengkapan format.

---

## Changelog Audit

- 2026-07-08 — Audit penuh 111 soal; perbaikan BTQ iqlab & idgham; typo Bahasa Indonesia; script `audit:questions`.
