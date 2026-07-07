# PRD — Sistem Simulasi Latihan CBT SPMB Mandiri UIN Siber Syekh Nurjati Cirebon

**Product Requirements Document (PRD)**
**Versi:** 2.0 (revisi setelah deep research)
**Tanggal:** 7 Juli 2026
**Status:** Draft
**Tipe Produk:** Aplikasi web latihan / simulasi ujian berbasis komputer (Computer Based Test)
**Konteks pengguna:** Adik penyusun, calon peserta SPMB Mandiri Reguler UIN SSC TA 2026/2027, prodi tujuan **S1 Akuntansi Syariah (Fakultas Ekonomi dan Bisnis Islam)**.

> **Perubahan penting dari v1.0:** Setelah menelusuri pengumuman resmi **2026** (bukan hanya 2025), struktur ujian berubah. Untuk TA 2026/2027 mata ujian **hanya 3: Tes Potensi Akademik, Kebahasaan, dan Keislaman** — **tidak ada lagi pembagian IPA/IPS**, dan **BTQ tidak lagi tercantum sebagai mata ujian terpisah**. Ini konsisten dengan pengalaman adik yang tidak ditanya kelompok IPA/IPS saat mendaftar. PRD ini menjadikan struktur 2026 sebagai acuan utama.

---

## 1. Ringkasan Eksekutif

Produk ini adalah **sistem simulasi latihan CBT** yang meniru pengalaman ujian **SPMB Jalur Mandiri Reguler UIN Siber Syekh Nurjati Cirebon (UIN SSC)** untuk membantu adik penyusun berlatih dalam kondisi semirip mungkin dengan ujian sesungguhnya.

Tiga pilar produk:
1. **Realisme antarmuka & mekanik** — meniru aplikasi CBT/SSE resmi: login peserta, token, **timer per-subtes berurutan**, navigasi nomor dengan indikator warna, tandai ragu-ragu, auto-save, auto-submit, konfirmasi selesai, acak soal & opsi.
2. **Akurasi materi** — struktur & komposisi soal mengacu pada mata ujian resmi UIN SSC 2026 (TPA, Kebahasaan, Keislaman) dengan gaya soal mengikuti **UM-PTKIN (SSE)** sebagai referensi otoritatif terdekat.
3. **Umpan balik belajar** — skoring per subtes, pembahasan, dan pelacakan progres antar percobaan.

Produk ini **bukan** aplikasi ujian resmi dan **tidak berafiliasi** dengan UIN SSC; murni alat latihan pribadi/edukatif.

---

## 2. Hasil Deep Research (Temuan & Sumber)

### 2.1 Struktur RESMI SPMB Mandiri UIN SSC 2026/2027 (acuan utama — tahun adik)

Sumber: Pengumuman resmi Rektor UIN SSC **Nomor 3686/Un.30/R/PP.00.9/06/2026** (ditandatangani elektronik 8 Juni 2026) dan pemberitaan resmi.

- **Pendaftaran:** online di `https://admisi.uinssc.ac.id/`, 8 Juni – 7 Juli 2026 (Reguler S1).
- **Pilihan prodi:** maksimal 3 prodi; **wajib memilih 1 prodi keagamaan pada pilihan ke-3**.
- **Prodi Akuntansi Syariah** berada di **Fakultas Ekonomi dan Bisnis Islam (FEBI)**, akreditasi *Baik Sekali*.
- **Metode:** Computer Based Test (CBT).
- **Jadwal (Reguler S1):** Cetak Kartu Ujian 15 Juni – 10 Juli 2026 · **Pelaksanaan Ujian CBT 13–15 Juli 2026** · Technical Meeting 16 Juli 2026 · **Pengumuman Hasil 22 Juli 2026**.
- **MATA UJIAN YANG DIUJIKAN (2026): `A. Tes Potensi Akademik; B. Kebahasaan; C. Keislaman`.**
  - **Tidak ada** Tes Kemampuan Bidang IPA/IPS (berbeda dari 2025).
  - **Tidak ada** komponen "Baca Tulis Al-Quran" terpisah (di 2025 ada; di 2026 tidak dicantumkan — kemungkinan diserap ke dalam *Keislaman* atau technical meeting).
- **Jumlah soal & durasi:** **TIDAK dipublikasikan** dalam pengumuman ("sesuai jadwal/ketentuan pada kartu ujian"). ⇒ Harus **dikonfigurasi**, dengan default estimasi (lihat §2.3).

> **Perbandingan 2025 vs 2026:**
> - **2025:** TKD (TPA + Kebahasaan) **+ Tes Kemampuan Bidang (IPA/IPS)** **+ Tes Baca Tulis Al-Quran** + wawancara.
> - **2026:** **TPA + Kebahasaan + Keislaman** (3 komponen; tanpa IPA/IPS; tanpa BTQ terpisah).

### 2.2 UM-PTKIN (SSE) — referensi otoritatif untuk gaya soal, jumlah, dan durasi

UIN SSC juga menyelenggarakan **UM-PTKIN**, dan CBT mandiri-nya bergaya serupa. Struktur UM-PTKIN dipublikasikan resmi, sehingga menjadi **acuan terbaik** untuk merancang komposisi & gaya soal simulasi.

**UM-PTKIN 2026 — 4 materi, total 121 soal / 140 menit** (dikerjakan berurutan, timer per bagian):

| # | Materi UM-PTKIN 2026 | Jumlah soal | Durasi |
|---|---|---:|---:|
| 1 | Penalaran Akademik (verbal, gambar/figural, kuantitatif) | 30 | 30 menit |
| 2 | Penalaran Matematika (numerasi, interpretasi grafik/tabel) | 15 | 25 menit |
| 3 | Literasi Membaca (B. Indonesia, B. Inggris, B. Arab) | 40 | 45 menit |
| 4 | Literasi Ajaran Islam (Al-Qur'an, Hadis, Fikih, SKI) | 36 | 40 menit |

*(Sebagai pembanding, UM-PTKIN 2025: PA 25/30', Matematika 15/20', Literasi Membaca 40/40', Literasi Ajaran Islam 30/30'.)*

**Ciri penting yang WAJIB ditiru:** setiap materi/bagian punya **timer sendiri** dan dikerjakan **berurutan**; waktu dihitung sejak peserta membuka soal pertama tiap bagian. Jika waktu satu bagian habis, lanjut ke bagian berikutnya (tidak bisa kembali).

### 2.3 Pemetaan mata ujian UIN SSC 2026 → materi & komposisi simulasi

Karena UIN SSC 2026 memakai 3 label (TPA, Kebahasaan, Keislaman) namun tidak merilis jumlah/durasi, kita petakan ke gaya UM-PTKIN dan tetapkan **default yang dapat diubah admin**:

| Mata Ujian UIN SSC 2026 | Isi (mengacu UM-PTKIN & pola UM UIN) | Default soal | Default durasi |
|---|---|---:|---:|
| **A. Tes Potensi Akademik (TPA)** | Penalaran **verbal** (sinonim, antonim, analogi, silogisme/logika), penalaran **gambar/figural** (deret & pola gambar), penalaran **kuantitatif/numerik** (deret angka, aritmetika, perbandingan, soal cerita) | 30 | 30 menit |
| **B. Kebahasaan** | **Literasi B. Indonesia** (ide pokok, makna, ejaan, kalimat efektif), **B. Inggris** (grammar, vocabulary, reading), **B. Arab** (mufrodat, qawa'id/nahwu-sharf dasar, qira'ah) | 40 | 40 menit |
| **C. Keislaman** | **Al-Qur'an & Hadis**, **Fikih** (thaharah, ibadah, muamalah dasar), **Akidah/Tauhid & Akhlak**, **Sejarah Kebudayaan Islam (SKI)**, konteks moderasi beragama | 30 | 30 menit |
| **(Opsional) BTQ** | Teori tajwid & makharijul huruf (PG) **+ modul rekaman bacaan** (lihat §2.4) | 10 | — |

> **Total default simulasi inti: ~100 soal / ~100 menit** (3 subtes). Angka ini **estimasi acuan** (bukan angka resmi UIN SSC) dan **sepenuhnya dapat dikonfigurasi** admin saat kartu ujian/kisi resmi tersedia. Untuk mode "paling menantang", admin dapat menaikkan ke skala penuh UM-PTKIN (121 soal / 140 menit).

**Rincian gaya soal (dari riset):**
- **TPA – Verbal:** sinonim, antonim, padanan hubungan (analogi), pengelompokan kata, silogisme, logika cerita; konteks keindonesiaan, keislaman, sains-teknologi, pendidikan, kesehatan, ekonomi-bisnis, seni-budaya-olahraga.
- **TPA – Gambar/Figural:** deret gambar, pola/simbol abstrak, hubungan ruang.
- **TPA – Kuantitatif:** deret angka (mis. 2,4,8,16,…), operasi berurut, perbandingan, persentase, soal cerita matematis.
- **Kebahasaan – Arab:** mufrodat kontekstual, qawa'id (isim, fi'il, huruf, jumlah ismiyyah & fi'liyyah), qira'ah, terjemah — **butuh dukungan teks RTL & font Arab.**
- **Keislaman:** kemukjizatan Al-Qur'an, ilmu hadis (hadis/sunnah/khabar/atsar), ushul fikih dasar, ibadah, SKI; sering berbentuk stimulus/wacana lalu ditanya.

### 2.4 Format BTQ (Baca Tulis Al-Qur'an) & keputusan modul rekaman

- **Fakta:** BTQ **ada** sebagai mata ujian di **2025**, namun **tidak** tercantum sebagai mata ujian terpisah di pengumuman resmi **2026** (hanya TPA, Kebahasaan, Keislaman). Pada praktik penerimaan UIN, kemampuan baca Al-Qur'an lazim diuji **lisan/praktik** (membaca di hadapan penguji) dan/atau sebagai bagian technical meeting/verifikasi, bukan murni pilihan ganda. UM-PTKIN pun menyebut "kemampuan dasar baca-tulis Al-Qur'an" sebagai bagian literasi.
- **Permintaan pengguna:** ingin ada **modul rekaman** untuk BTQ, "jika memang soal asli ada".
- **Keputusan produk:** Sediakan **Modul BTQ (opsional, dapat diaktifkan/nonaktifkan admin)** yang terdiri dari:
  1. **Bagian teori (PG):** tajwid, hukum bacaan (nun mati/tanwin, mim mati, mad), makharijul huruf, penulisan huruf hijaiyah — masuk skoring otomatis.
  2. **Bagian praktik (rekaman audio):** sistem menampilkan potongan ayat, peserta **merekam bacaan** (rekam suara di browser), audio tersimpan, lalu **dinilai manual** oleh admin/penguji dengan rubrik (kelancaran, tajwid, makhraj) — atau sekadar untuk latihan mandiri (self-review). *Auto-grading bacaan Al-Qur'an di luar lingkup awal.*
- **Default:** Modul BTQ **nonaktif** pada mode "Replika Resmi 2026" (agar benar-benar mirip ujian tahun ini), namun **tersedia** pada mode "Latihan Lengkap" karena bermanfaat dan diminta pengguna. Transparan bahwa ini di luar 3 mata ujian resmi 2026.

### 2.5 Karakteristik aplikasi CBT/SSE yang wajib ditiru

Dari riset UNBK, CBT SEB, SSE UM-PTKIN, dan CBT PMB kampus:
1. **Login peserta** (nomor peserta + password) + **kartu ujian** virtual.
2. **Token ujian** dari "pengawas" sebelum mulai.
3. **Halaman konfirmasi/detail** (nama ujian, jumlah soal, durasi, petunjuk).
4. **Area soal** (teks + gambar + teks Arab RTL), opsi A–E.
5. **Navigasi nomor** dengan **indikator warna**: belum dijawab (putih/abu), sudah dijawab (hijau/biru), ragu-ragu (kuning), soal aktif (highlight).
6. **Timer hitung mundur** berbasis waktu server; **per-subtes berurutan**; **auto-submit** saat habis.
7. **Tombol Sebelumnya / Selanjutnya**, **Ragu-ragu/Tandai** (toggle).
8. **Auto-save** tiap aksi + **pemulihan state** bila refresh/putus koneksi.
9. **Tombol Selesai** + dialog konfirmasi + peringatan soal belum dijawab / masih ada tanda ragu.
10. **Acak urutan soal & acak urutan opsi** per peserta/percobaan.
11. **Halaman hasil** + **pembahasan**.
12. Fitur bantu: ukuran font, mode gelap; (opsional) deteksi pindah tab untuk latihan disiplin.

---

## 3. Tujuan, Sasaran, Non-Goals

### 3.1 Tujuan
1. Simulasi CBT semirip mungkin dengan SPMB Mandiri UIN SSC 2026 (3 subtes, timer per-bagian, mekanik identik).
2. Bank soal sesuai kisi TPA, Kebahasaan, Keislaman (+ opsi BTQ).
3. Umpan balik: skor per subtes + pembahasan.
4. Pelacakan progres antar percobaan.

### 3.2 Metrik Keberhasilan
- Adik dapat menyelesaikan ≥1 paket simulasi penuh tanpa kendala teknis.
- Skoring & timer akurat (0 kesalahan pada uji).
- Tren skor naik antar percobaan.
- Penilaian subjektif "mirip aslinya" dari adik.

### 3.3 Non-Goals
- Bukan sistem PMB resmi (tanpa pendaftaran/pembayaran/kelulusan nyata).
- Tidak terintegrasi sistem UIN SSC.
- Tanpa proctoring kamera penuh; tanpa auto-grading bacaan Al-Qur'an (fase awal).

---

## 4. Persona & User Stories

**Persona:**
- **Peserta (Adik):** camaba Akuntansi Syariah; butuh latihan realistis + pembahasan.
- **Admin (Kakak/penyusun):** menyiapkan bank soal, paket, memantau hasil, menilai rekaman BTQ.

**User Stories — Peserta:**
- Login & lihat kartu ujian virtual; masukkan token; baca detail ujian sebelum mulai.
- Kerjakan **3 subtes berurutan** dengan **timer per subtes**, navigasi nomor, tandai ragu-ragu.
- Jawaban tersimpan otomatis; aman saat refresh.
- (Opsional BTQ) merekam bacaan ayat.
- Lihat skor per subtes + pembahasan; lihat riwayat & tren.

**User Stories — Admin:**
- CRUD soal per subtes + pembahasan + lampiran (gambar, teks Arab, audio).
- Buat paket ujian: pilih jumlah soal/durasi **per subtes**, aturan acak, token, jendela waktu, mode ("Replika Resmi 2026" / "Latihan Lengkap").
- Import massal (CSV/JSON) & export.
- Lihat hasil/analitik; nilai rekaman BTQ dengan rubrik.

---

## 5. Kebutuhan Fungsional (Functional Requirements)

### 5.1 Autentikasi & Peserta
- **FR-1.1** Akun peserta (dibuat admin atau self-register: nama, nomor peserta, password).
- **FR-1.2** Login + role-based access (peserta/admin).
- **FR-1.3** Kartu ujian virtual (nama, nomor, sesi, daftar subtes).

### 5.2 Ujian / CBT (Inti)
- **FR-2.1** Daftar ujian tersedia.
- **FR-2.2** Input **token** + halaman konfirmasi (jumlah soal, durasi, petunjuk).
- **FR-2.3** **Ujian multi-subtes berurutan** (TPA → Kebahasaan → Keislaman [→ BTQ opsional]); tiap subtes **timer independen**; saat waktu subtes habis, pindah otomatis ke subtes berikutnya (tidak bisa kembali). *(Meniru alur SSE UM-PTKIN.)*
- **FR-2.4** Tampilan soal: teks kaya + gambar + **teks Arab RTL**; opsi A–E.
- **FR-2.5** Navigasi nomor + indikator warna status (dibatasi pada subtes aktif).
- **FR-2.6** Tombol Sebelumnya / Selanjutnya.
- **FR-2.7** Tombol Ragu-ragu / Tandai (toggle).
- **FR-2.8** Timer per-subtes berbasis **server-time** (tahan refresh/manipulasi client).
- **FR-2.9** **Auto-save** tiap perubahan + **pemulihan state** saat masuk ulang.
- **FR-2.10** **Auto-submit** subtes saat waktunya habis; auto-submit ujian saat subtes terakhir habis.
- **FR-2.11** Tombol Selesai (per subtes / ujian) + dialog konfirmasi + peringatan soal kosong / tanda ragu.
- **FR-2.12** Acak urutan soal & acak urutan opsi (dikonfigurasi per paket).

### 5.3 Modul BTQ (Opsional)
- **FR-3.1** Bagian teori BTQ (PG) — skoring otomatis.
- **FR-3.2** Bagian praktik: **rekaman audio** bacaan ayat via browser (MediaRecorder), simpan file, kaitkan ke attempt.
- **FR-3.3** Panel admin untuk memutar & **menilai rekaman** dengan rubrik (kelancaran, tajwid, makhraj) + catatan.
- **FR-3.4** Toggle aktif/nonaktif modul BTQ per paket.

### 5.4 Skoring & Hasil
- **FR-4.1** Skoring otomatis PG; skor **per subtes** & total (dukung pembobotan).
- **FR-4.2** Halaman hasil: benar/salah/kosong per subtes + total; (opsional) nilai BTQ manual digabung.
- **FR-4.3** **Review/pembahasan** per soal: soal, jawaban peserta, kunci, penjelasan.
- **FR-4.4** Konfigurasi tampil hasil langsung atau ditunda.

### 5.5 Bank Soal & Manajemen Ujian (Admin)
- **FR-5.1** CRUD soal: pertanyaan, opsi, kunci, subtes/sub-kategori, tingkat kesulitan, pembahasan, arah teks (LTR/RTL), lampiran gambar/audio.
- **FR-5.2** Dukungan konten: gambar (figural/kuantitatif), **teks Arab (RTL + font)**, notasi matematis dasar, audio (BTQ).
- **FR-5.3** Import massal (CSV/JSON) + export + template.
- **FR-5.4** CRUD paket: komposisi **per subtes** (jumlah, durasi), acak, token, jendela aktif, mode ("Replika Resmi 2026" / "Latihan Lengkap").
- **FR-5.5** Manajemen peserta + reset sesi bila ada kendala.
- **FR-5.6** Dashboard analitik (rata-rata skor total & per subtes, per peserta, per sub-kategori untuk diagnosa kelemahan).

### 5.6 Riwayat & Progres (Peserta)
- **FR-6.1** Daftar riwayat percobaan (skor, tanggal, durasi).
- **FR-6.2** Grafik tren skor + rincian per subtes (identifikasi materi lemah).

---

## 6. Kebutuhan Non-Fungsional

- **NFR-1 Reliabilitas data ujian:** jawaban tidak hilang saat refresh/putus koneksi (auto-save + pemulihan). Timer berbasis server.
- **NFR-2 Performa:** pindah soal < 300 ms; mendukung beberapa peserta bersamaan (skala kecil).
- **NFR-3 Kompatibilitas:** browser desktop & tablet modern; responsif. **Rekaman audio** butuh izin mikrofon (HTTPS).
- **NFR-4 Keamanan:** password ter-hash; kunci jawaban tak terekspos sebelum submit; validasi token & kepemilikan sesi.
- **NFR-5 Usability:** UI meniru CBT asli; kontras baik; ukuran font & mode gelap.
- **NFR-6 Aksesibilitas bahasa:** render **teks Arab RTL** benar (mis. font Amiri/Scheherazade).
- **NFR-7 Maintainability:** komposisi soal/paket dapat diubah tanpa ubah kode.
- **NFR-8 Anti-kecurangan ringan (opsional):** log pindah tab/blur untuk latihan disiplin (bukan proctoring penuh).

---

## 7. Alur Pengguna (User Flow)

```
[Login Peserta] → [Dashboard: Kartu Ujian, Riwayat]
      │ pilih paket → [Detail Ujian + Token] (nama, jumlah soal, durasi, petunjuk)
      ▼
[SUBTES 1: TPA]  timer 30' ─┐
[SUBTES 2: Kebahasaan] 40' ─┼─ berurutan, timer independen, auto-lanjut saat habis
[SUBTES 3: Keislaman] 30' ─┘
[(opsional) BTQ: teori PG + rekaman audio]
   ├── area soal (A–E), navigasi warna, ragu-ragu, prev/next, auto-save
   └── Selesai (konfirmasi) / waktu habis → auto-submit
      ▼
[Skoring otomatis] → [Hasil: skor per subtes + total]
      │ (BTQ rekaman → dinilai admin manual → nilai digabung)
      ▼
[Review/Pembahasan per soal] → [Riwayat & tren]
```

---

## 8. Model Data (Konseptual)

| Entitas | Field utama |
|---|---|
| **User** | id, nama, nomor_peserta, password_hash, role |
| **Subtest** | id, kode (TPA/BAHASA/KEISLAMAN/BTQ), nama, deskripsi |
| **SubCategory** | id, subtest_id, nama (mis. Verbal, Figural, Kuantitatif / Indonesia, Inggris, Arab / Quran-Hadis, Fikih, Akidah-Akhlak, SKI) |
| **Question** | id, subtest_id, subcategory_id, teks (HTML), gambar_url, audio_prompt_url, tipe (PG/REKAMAN), tingkat_kesulitan, arah_teks (LTR/RTL), pembahasan |
| **Option** | id, question_id, label (A–E), teks, is_correct |
| **ExamPackage** | id, nama, mode (REPLIKA_2026/LATIHAN_LENGKAP), token, jendela_aktif, komposisi (JSON: per subtest → {jumlah, durasi_menit, acak_soal, acak_opsi}) |
| **Attempt** | id, user_id, package_id, waktu_mulai, waktu_selesai, status, skor_total |
| **AttemptSection** | id, attempt_id, subtest_id, waktu_mulai, waktu_selesai_efektif, status |
| **AttemptAnswer** | id, attempt_section_id, question_id, option_id_dipilih, ragu (bool), waktu_update |
| **AttemptRecording** | id, attempt_section_id, question_id, audio_url, nilai_manual, catatan_penguji |
| **AttemptScore** | id, attempt_id, subtest_id, benar, salah, kosong, skor |

---

## 9. Rekomendasi Teknis (Usulan)

- **Frontend:** React (Vite) + Tailwind CSS; state ringan (Zustand). Dukungan **RTL** untuk Arab; **MediaRecorder API** untuk rekaman BTQ.
- **Backend:** Node.js (NestJS/Express) atau Laravel — REST API; **otoritatif atas waktu (server-time)**; endpoint auto-save, skoring, upload audio.
- **Database:** PostgreSQL/MySQL (relasional). SQLite untuk versi paling ringan (1–2 pengguna).
- **Penyimpanan audio:** file lokal/objek storage (mis. folder terproteksi atau S3-compatible).
- **Auth:** JWT/session + hashing (argon2/bcrypt).
- **Deploy:** VPS kecil / Railway / Render (butuh HTTPS untuk izin mikrofon).

> Alternatif MVP tercepat: satu web app, bank soal file JSON, progres di backend ringan/localStorage untuk 1–2 pengguna. Keputusan final saat implementasi.

---

## 10. Strategi Sumber Soal (Hybrid)

Sesuai permintaan (hybrid) dan agar **mirip aslinya**:
1. **Adaptasi bergaya UM-PTKIN & UM UIN** — susun soal baru mengikuti kisi & gaya resmi (verbal/figural/kuantitatif; literasi ID/EN/AR; Al-Qur'an-Hadis/Fikih/Akidah-Akhlak/SKI). Ini tulang punggung agar realistis.
2. **Kurasi dari bank latihan publik** — soal try-out UM-PTKIN/UM UIN yang boleh dipakai untuk edukasi, ditulis ulang/diverifikasi agar tidak melanggar hak cipta.
3. **Buatan sendiri** untuk mengisi celah materi/tingkat kesulitan tertentu.
4. Setiap soal wajib punya **kunci + pembahasan + tag subkategori + tingkat kesulitan** agar analitik kelemahan berjalan.
5. **Verifikasi kebenaran** oleh orang kompeten (khususnya Bahasa Arab & Keislaman).

Target awal: minimal **1 paket penuh** (≈100 soal: TPA 30, Kebahasaan 40, Keislaman 30) + (opsional) 10 soal teori BTQ & 3–5 prompt rekaman.

---

## 11. Rencana Rilis Bertahap

**Fase 0 — Konten awal:** susun 1 paket penuh (TPA/Kebahasaan/Keislaman) + kunci + pembahasan; siapkan aset RTL Arab.

**Fase 1 — MVP CBT inti:** login, 1 paket, **3 subtes berurutan dengan timer per-subtes**, navigasi + indikator warna, ragu-ragu, auto-save, auto-submit, skoring, hasil per subtes.

**Fase 2 — Bank soal & admin:** CRUD soal & paket, import massal, acak soal/opsi, pembahasan, riwayat & tren, analitik per subkategori.

**Fase 3 — Realisme & QoL:** token, kartu ujian virtual, dukungan gambar & **teks Arab RTL**, mode gelap, ukuran font, mode paket ("Replika 2026"/"Latihan Lengkap").

**Fase 4 — Modul BTQ & lanjutan:** teori BTQ (PG) + **rekaman audio** + rubrik penilaian admin; (opsional) deteksi pindah tab; multi-sesi/multi-peserta.

---

## 12. Di Luar Lingkup (Out of Scope)

- Pendaftaran/pembayaran/kelulusan resmi.
- Wawancara & technical meeting (bagian proses asli, tidak disimulasikan CBT).
- Proctoring kamera penuh.
- Auto-grading bacaan Al-Qur'an (penilaian BTQ = manual pada fase awal).
- Tes Kemampuan Bidang IPA/IPS (tidak ada pada skema resmi 2026).

---

## 13. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Jumlah soal/durasi resmi UIN SSC tidak dipublikasikan & bisa berubah | Simulasi kurang presisi | Semua komposisi **dapat dikonfigurasi**; default mengacu UM-PTKIN; perbarui saat kartu ujian/kisi rilis |
| BTQ tidak ada di skema resmi 2026 tapi tetap ingin dilatih | Kebingungan cakupan | Jadikan **modul opsional**, default nonaktif di mode Replika 2026; transparan di UI |
| Kualitas/kebenaran soal (khususnya Arab & Keislaman) | Salah belajar | Review ahli; sertakan sumber & pembahasan |
| Kehilangan jawaban saat koneksi putus | Frustrasi | Auto-save server + pemulihan; timer server |
| Manipulasi timer di client | Latihan tak realistis | Sisa waktu dihitung server (waktu_mulai + durasi per subtes) |
| Hak cipta soal pihak ketiga | Masalah legal/etis | Tulis ulang/soal sendiri; hanya sumber yang boleh untuk edukasi |
| Izin mikrofon/browser untuk rekaman BTQ | Fitur gagal | Wajib HTTPS; fallback unggah file audio |

---

## 14. Ringkasan Keputusan (menjawab pertanyaan terbuka v1.0)

- **Kelompok IPA/IPS:** **tidak relevan** untuk 2026 — skema resmi menghapus Tes Kemampuan Bidang; adik cukup fokus **TPA, Kebahasaan, Keislaman**. (Konsisten: adik tidak ditanya IPA/IPS.)
- **Prodi:** Akuntansi Syariah (FEBI). Tidak mengubah mata ujian (sama untuk semua prodi di 2026), namun **pilihan ke-3 wajib prodi keagamaan** — relevan untuk strategi pendaftaran, bukan materi ujian.
- **BTQ:** disediakan sebagai **modul opsional dengan rekaman audio** (teori PG + praktik rekam), sesuai permintaan; transparan bahwa bukan bagian 3 mata ujian resmi 2026.
- **Sumber soal:** **hybrid** (adaptasi gaya UM-PTKIN/UM UIN + kurasi + buatan sendiri), semua dengan kunci & pembahasan.
- **Jumlah/durasi:** default **~100 soal / ~100 menit** (TPA 30/30', Kebahasaan 40/40', Keislaman 30/30'), **dapat dikonfigurasi**; mode "Latihan Lengkap" bisa skala penuh UM-PTKIN (121/140').

---

## Lampiran A — Referensi Riset

**Resmi UIN SSC:**
- Pengumuman SPMB Mandiri Reguler UIN SSC **2026/2027**, Nomor **3686/Un.30/R/PP.00.9/06/2026** (mata ujian: **TPA, Kebahasaan, Keislaman**; CBT 13–15 Juli 2026; Akuntansi Syariah = FEBI). URL: `https://info.uinssc.ac.id/wp-content/uploads/2026/06/Pengumuman-SPMB-Mandiri-Tahun-2026-Revisi-1.pdf`
- Pengumuman SPMB Mandiri **2025/2026**, Nomor B-3564/Un.30/R/PP.00.9/06/2025 (2025: TKD [TPA+Kebahasaan] + Bidang IPA/IPS + BTQ).
- Berita resmi info.uinssc.ac.id & rakyatcirebon.disway.id (jadwal & materi 2026); berita 2024/2025 (CBT + wawancara, ~400–440 peserta).

**UM-PTKIN (acuan gaya/jumlah/durasi):**
- um.ptkin.ac.id (materi: Penalaran Akademik, Penalaran Matematika, Literasi Membaca, Literasi Ajaran Islam; SSE luring).
- Tirto/Tribunnews/Bernas/Mamikos/IDN Times: rincian jumlah soal & durasi UM-PTKIN 2025 & 2026 (2026: 121 soal/140'; PA 30/30', Matematika 15/25', Literasi Membaca 40/45', Literasi Ajaran Islam 36/40').
- UIN Sunan Gunung Djati: SSE UM-PTKIN 2026 (Tes Literasi mencakup **kemampuan dasar baca-tulis Al-Qur'an**).
- UIN Sunan Kalijaga & UIN Sumatera Utara: pola Mandiri CBT (TPA, Dirasah Islamiyah, Bahasa Arab & Inggris) — pembanding.

**Referensi fitur/tampilan CBT:**
- Manual CBT SEB, UNBK (simadrasah), CBT PMB (vitka, TMF), dokumen fitur standar CBT: login, token, navigasi nomor + indikator warna, timer, ragu-ragu, auto-save, konfirmasi selesai, acak soal/opsi, timer per-bagian berurutan (SSE UM-PTKIN).

> **Disclaimer:** Jumlah soal & durasi spesifik **SPMB Mandiri UIN SSC** tidak dipublikasikan resmi (mengacu kartu ujian). Angka pada dokumen ini adalah **estimasi acuan berbasis UM-PTKIN** dan dirancang agar **dapat dikonfigurasi**. Perbarui saat informasi resmi (kartu ujian/technical meeting 16 Juli 2026) tersedia.
