# Audit Bank Soal — Latihan CBT UIN SSC

**Tanggal:** 2026-07-08 (diperbarui)  
**Total soal:** 311 (308 PG + 3 rekaman BTQ)  
**Sumber data:** `prisma/data/*.ts` (bank inti + ekspansi kurasi UM-PTKIN)  
**Script otomatis:** `npm run audit:questions`

---

## Ringkasan Eksekutif

| Subtes | Jumlah | Status struktural | Status faktual |
|--------|--------|-------------------|----------------|
| TPA | 100 | ✅ Lulus | ✅ Verbal/kuantitatif + **8 figural** (SVG) |
| Bahasa Indonesia | ~34 | ✅ Lulus | ✅ Diperkaya |
| Bahasa Inggris | ~33 | ✅ Lulus | ✅ Diperkaya |
| Bahasa Arab | ~33 | ✅ Lulus | ⚠️ Review native speaker disarankan |
| Keislaman | 100 | ✅ Lulus | ⚠️ Review ahli disarankan (fikih mendalam) |
| BTQ | 11 (8 PG + 3 rekaman) | ✅ Lulus | ✅ Error kritis sudah diperbaiki |

**Kesimpulan:** Bank soal **lebih mendekati format UM-PTKIN** untuk latihan. Tetap **bukan soal resmi SPMB UIN SSC**. Paket Replika mengacak 30/40/30 dari bank; paket Intensif 50/50/50.

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

### TPA (100 soal)

- **Struktur:** 30 inti + 62 ekspansi + 8 figural dengan `gambarUrl` SVG.
- **Kualitas:** Verbal (sinonim, antonim, analogi, silogisme), kuantitatif, logika, deret angka, soal cerita.
- **Figural:** 8 soal pola gambar di `public/images/tpa/figural/`.

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

- 2026-07-08 — Ekspansi bank ke 311 soal; kurasi gaya UM-PTKIN; 8 TPA figural; paket Intensif; disclaimer dashboard.
- 2026-07-08 — Audit penuh 111 soal; perbaikan BTQ iqlab & idgham; typo Bahasa Indonesia; script `audit:questions`.
