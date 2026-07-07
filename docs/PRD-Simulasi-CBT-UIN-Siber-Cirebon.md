# PRD — Sistem Simulasi Latihan CBT SPMB Mandiri UIN Siber Syekh Nurjati Cirebon

**Product Requirements Document (PRD)**
**Versi:** 1.0
**Tanggal:** 7 Juli 2026
**Status:** Draft
**Penyusun:** Tim Pengembang (proyek pribadi)
**Tipe Produk:** Aplikasi web latihan / simulasi ujian berbasis komputer (Computer Based Test)

---

## 1. Ringkasan Eksekutif

Dokumen ini mendefinisikan kebutuhan produk untuk membangun **sistem simulasi latihan CBT** yang meniru pengalaman ujian **Seleksi Penerimaan Mahasiswa Baru (SPMB) Jalur Mandiri Reguler UIN Siber Syekh Nurjati Cirebon (UIN SSC)**.

Tujuan utama produk ini adalah membantu calon peserta (dalam kasus ini, adik dari pemilik proyek) **berlatih dalam kondisi yang menyerupai ujian sesungguhnya**: antarmuka mirip aplikasi CBT resmi, tipe soal sesuai kisi-kisi, timer hitung mundur, navigasi soal, penanda ragu-ragu, penyimpanan jawaban otomatis, serta skoring dan pembahasan di akhir.

Produk ini **bukan** aplikasi ujian resmi dan **tidak berafiliasi** dengan UIN SSC; ini murni alat latihan pribadi/edukatif.

---

## 2. Latar Belakang & Hasil Riset

### 2.1 Tentang SPMB Mandiri UIN Siber Syekh Nurjati Cirebon

UIN Siber Syekh Nurjati Cirebon (sebelumnya IAIN Syekh Nurjati) menyelenggarakan jalur **SPMB Mandiri Reguler**. Berdasarkan pengumuman resmi Nomor B-3564/Un.30/R/PP.00.9/06/2025 untuk TA 2025/2026:

- **Ujian dilakukan dengan metode CBT (Computer Based Test)**, dilaksanakan pada 15–17 Juli 2025 sesuai jadwal pada kartu ujian, dalam beberapa sesi.
- Pada penyelenggaraan 2025, seleksi terdiri dari **tes CBT dan wawancara**, diikuti sekitar 400 calon mahasiswa.
- Calon mahasiswa dapat memilih **maksimal tiga program studi** dan wajib memilih salah satu prodi keagamaan pada pilihan ketiga.

### 2.2 Materi/Mata Ujian yang Diujikan (Kisi-Kisi Resmi UIN SSC)

Berdasarkan pengumuman resmi, mata ujian jalur mandiri UIN SSC mencakup:

**A) Tes Kemampuan Dasar (TKD):**
- Tes Potensi Akademik (TPA)
- Kebahasaan

**B) Tes Kemampuan Bidang:**
- IPA (untuk kelompok IPA)
- IPS (untuk kelompok IPS)

**C) Tes Kemampuan Baca Tulis Al-Quran (BTQ)**

### 2.3 Rincian Materi (Referensi Pola Umum UM/Mandiri UIN)

Karena kisi-kisi rinci per subtes tidak dipublikasikan detail oleh UIN SSC, kita mengacu pada pola umum Ujian Mandiri UIN nasional (mis. UIN Sunan Kalijaga, UIN Sumatera Utara) sebagai basis penyusunan bank soal simulasi:

| Komponen | Cakupan materi | Estimasi bobot* |
|---|---|---|
| **Tes Potensi Akademik (TPA)** | Penalaran verbal (sinonim, antonim, analogi), penalaran numerik (deret, aritmetika, persentase, perbandingan), penalaran logis (silogisme, sebab-akibat, penarikan kesimpulan), pemahaman bacaan | ~25 soal |
| **Kebahasaan — Bahasa Indonesia** | Pemahaman teks, ide pokok, tata bahasa, ejaan | bagian kebahasaan |
| **Kebahasaan — Bahasa Inggris** | Grammar (tenses, subject-verb agreement, passive voice), vocabulary/sinonim kontekstual, reading comprehension, structure (melengkapi kalimat) | ~10 soal |
| **Kebahasaan — Bahasa Arab** | Mufrodat (kosakata), Qawa'id/nahwu-sharf (isim, fi'il, huruf, jumlah ismiyyah & fi'liyyah), qira'ah (pemahaman teks), terjemah | ~10 soal |
| **Tes Kemampuan Bidang IPA** | Matematika, Fisika, Kimia, Biologi | ~20 soal |
| **Tes Kemampuan Bidang IPS** | Sosiologi, Sejarah, Geografi, Ekonomi | ~20 soal |
| **Dirasah Islamiyah / Keislaman** | Al-Qur'an & Hadis, Fikih, Akidah/Tauhid, Akhlak, Sejarah Kebudayaan Islam (SKI) | ~20 soal |
| **Baca Tulis Al-Quran (BTQ)** | Tajwid, makharijul huruf, kelancaran membaca, penulisan huruf hijaiyah | penilaian khusus |

> *\*Bobot bersifat estimasi berdasarkan pola UIN lain dan harus dikonfigurasi ulang bila UIN SSC merilis kisi-kisi resmi. Sistem harus fleksibel agar jumlah & bobot soal per subtes bisa diubah admin.*

**Catatan tentang BTQ:** Pada ujian resmi, BTQ sering diuji secara lisan/praktik (membaca di depan penguji). Untuk versi simulasi CBT, komponen ini diadaptasi menjadi soal pilihan ganda berbasis teori (tajwid, hukum bacaan, makharijul huruf, penulisan) — dengan opsi pengembangan lanjutan berupa rekaman audio (lihat bagian *Out of Scope / Fase Lanjutan*).

### 2.4 Karakteristik & Fitur Aplikasi CBT Sesungguhnya (Acuan Meniru)

Dari riset berbagai sistem CBT (UNBK, CBT SEB, sistem CBT PMB kampus), fitur & tampilan standar yang harus ditiru:

1. **Halaman login peserta** — menggunakan username/nomor peserta + password.
2. **Token ujian** — kode yang dimasukkan sebelum memulai (diberikan "pengawas"); menambah nuansa realistis & keamanan sesi.
3. **Halaman konfirmasi/detail ujian** — menampilkan nama ujian, jumlah soal, durasi, dan tombol "Mulai".
4. **Area soal utama** — satu soal + pilihan jawaban (A–E) di tengah.
5. **Navigasi nomor soal** — daftar nomor yang bisa diklik untuk loncat antar soal, dengan **indikator warna**:
   - Putih/abu = belum dijawab
   - Hijau/biru = sudah dijawab
   - Kuning = ditandai ragu-ragu
   - Highlight/hitam = soal aktif saat ini
6. **Timer hitung mundur** — sisa waktu real-time; ujian otomatis submit saat waktu habis.
7. **Tombol navigasi** — "Sebelumnya" & "Selanjutnya".
8. **Tombol "Ragu-ragu"/"Tandai"** — menandai soal untuk diperiksa kembali.
9. **Penyimpanan jawaban otomatis** — tiap kali pindah soal / interval waktu, agar tahan terhadap refresh/putus koneksi.
10. **Tombol "Selesai"** — dengan dialog konfirmasi ("Apakah Anda yakin ingin mengakhiri ujian?") dan peringatan bila masih ada soal belum dijawab / masih ada tanda ragu.
11. **Acak soal & acak opsi jawaban** — tiap peserta/percobaan mendapat urutan berbeda (anti-hafal urutan).
12. **Halaman hasil** — skor per subtes & total setelah ujian selesai.

Fitur tambahan yang umum: pengaturan ukuran font, mode gelap, dan kalkulator bawaan (opsional, tergantung tipe tes).

---

## 3. Tujuan & Sasaran (Goals)

### 3.1 Tujuan Produk
1. Menyediakan **simulasi pengalaman ujian CBT** yang senyata mungkin agar peserta terbiasa dengan mekanik, tekanan waktu, dan navigasi ujian sesungguhnya.
2. Menyediakan **bank soal** sesuai kisi-kisi jalur mandiri UIN SSC (TPA, Kebahasaan, Kemampuan Bidang IPA/IPS, Keislaman, BTQ teori).
3. Memberikan **umpan balik (skor + pembahasan)** untuk membantu peserta belajar dari kesalahan.
4. Melacak **progres/riwayat** latihan dari waktu ke waktu.

### 3.2 Metrik Keberhasilan (Success Metrics)
- Peserta dapat menyelesaikan minimal 1 paket simulasi penuh tanpa kendala teknis.
- Waktu, navigasi, dan skoring berfungsi akurat (0 kesalahan hitung skor pada pengujian).
- Peningkatan skor peserta antar percobaan (tren naik) sebagai indikator manfaat belajar.
- Antarmuka dinilai "mirip CBT asli" secara subjektif oleh peserta.

### 3.3 Non-Goals (Bukan Tujuan)
- Bukan sistem PMB resmi (tidak menangani pendaftaran, pembayaran, kelulusan nyata).
- Tidak terintegrasi dengan sistem UIN SSC.
- Tidak menyimpan data pribadi sensitif nyata.

---

## 4. Persona Pengguna & User Stories

### 4.1 Persona
- **Peserta (Adik / Camaba):** siswa SMA/MA/sederajat yang akan mengikuti SPMB Mandiri UIN. Butuh latihan yang realistis dan pembahasan.
- **Admin (Kakak / Penyusun soal):** menyiapkan bank soal, membuat paket ujian, mengatur durasi & bobot, memantau hasil.

### 4.2 User Stories

**Sebagai Peserta:**
- Saya ingin login dengan akun saya agar progres saya tersimpan.
- Saya ingin memasukkan token dan melihat detail ujian sebelum mulai, seperti ujian asli.
- Saya ingin mengerjakan soal dengan navigasi nomor, timer, dan tombol ragu-ragu.
- Saya ingin jawaban saya tersimpan otomatis agar tidak hilang bila halaman ter-refresh.
- Saya ingin melihat skor per subtes dan pembahasan setelah selesai.
- Saya ingin melihat riwayat percobaan saya untuk memantau perkembangan.

**Sebagai Admin:**
- Saya ingin menamb/mengedit/menghapus soal di bank soal dengan kategori/subtes.
- Saya ingin membuat paket ujian dengan memilih jumlah soal per subtes, durasi, dan aturan pengacakan.
- Saya ingin mengunggah soal secara massal (mis. via CSV/JSON) agar cepat.
- Saya ingin melihat hasil/analitik peserta.

---

## 5. Ruang Lingkup Fungsional (Functional Requirements)

### 5.1 Modul Autentikasi & Peserta
- **FR-1.1** Registrasi/pembuatan akun peserta oleh admin, atau self-register sederhana (nama, nomor peserta, password).
- **FR-1.2** Login peserta & admin (role-based access).
- **FR-1.3** Halaman "Kartu Ujian" virtual (nama, nomor peserta, sesi, daftar mata ujian) meniru kartu ujian asli.

### 5.2 Modul Ujian / CBT (Inti)
- **FR-2.1** Halaman daftar ujian yang tersedia diikuti peserta.
- **FR-2.2** Input **token** sebelum memulai + halaman konfirmasi detail ujian (jumlah soal, durasi).
- **FR-2.3** Tampilan soal: teks soal (dukung gambar & teks Arab RTL), opsi A–E.
- **FR-2.4** Navigasi nomor soal dengan indikator warna status (belum dijawab / sudah / ragu / aktif).
- **FR-2.5** Tombol Sebelumnya / Selanjutnya.
- **FR-2.6** Tombol "Ragu-ragu / Tandai" (toggle).
- **FR-2.7** **Timer hitung mundur** yang tahan refresh (dihitung dari waktu server/waktu mulai + durasi, bukan sekadar countdown di client).
- **FR-2.8** **Auto-save** jawaban tiap perubahan/pindah soal; state ujian dapat dipulihkan bila peserta menutup/membuka ulang.
- **FR-2.9** **Auto-submit** saat waktu habis.
- **FR-2.10** Tombol "Selesai" dengan dialog konfirmasi + peringatan soal belum dijawab / masih ada tanda ragu.
- **FR-2.11** **Acak urutan soal** & **acak urutan opsi** (dapat dikonfigurasi per paket).
- **FR-2.12** Struktur ujian bersubtes (TPA, Kebahasaan, Bidang, Keislaman, BTQ) — bisa dalam satu sesi berurutan atau paket terpisah.

### 5.3 Modul Skoring & Hasil
- **FR-3.1** Skoring otomatis pilihan ganda; skor per subtes & total.
- **FR-3.2** Halaman hasil: ringkasan skor, jumlah benar/salah/kosong per subtes.
- **FR-3.3** **Review/pembahasan**: menampilkan soal, jawaban peserta, kunci, dan penjelasan.
- **FR-3.4** Konfigurasi apakah pembahasan tampil langsung atau disembunyikan hingga admin mengizinkan.

### 5.4 Modul Bank Soal & Manajemen Ujian (Admin)
- **FR-4.1** CRUD soal: pertanyaan, opsi, kunci, subtes/kategori, tingkat kesulitan, pembahasan, lampiran gambar.
- **FR-4.2** Dukungan konten khusus: gambar (matematika/fisika), teks Arab (RTL & font Arab), format matematis dasar.
- **FR-4.3** Import massal soal (CSV/JSON) & export.
- **FR-4.4** CRUD paket ujian: pilih komposisi jumlah soal per subtes, durasi, aturan acak, token, jendela waktu aktif.
- **FR-4.5** Manajemen peserta & reset sesi ujian bila ada kendala teknis.
- **FR-4.6** Dashboard hasil/analitik dasar (rata-rata skor, per subtes, per peserta).

### 5.5 Modul Riwayat & Progres (Peserta)
- **FR-5.1** Daftar riwayat percobaan dengan skor & tanggal.
- **FR-5.2** Grafik tren skor antar percobaan.

---

## 6. Kebutuhan Non-Fungsional (Non-Functional Requirements)

- **NFR-1 Reliabilitas data ujian:** jawaban tidak boleh hilang saat refresh/putus koneksi (auto-save + pemulihan state). Timer berbasis server-time.
- **NFR-2 Performa:** perpindahan antar soal < 300 ms; mendukung minimal beberapa peserta bersamaan (skala kecil, cukup untuk keluarga/kelas kecil).
- **NFR-3 Kompatibilitas:** berjalan di browser desktop & tablet modern (Chrome, Firefox, Edge); layout responsif.
- **NFR-4 Keamanan:** password ter-hash, proteksi role, kunci jawaban tidak terekspos ke client sebelum submit, validasi token sesi.
- **NFR-5 Usability:** UI bersih meniru CBT asli, kontras baik, dukungan ukuran font & mode gelap (opsional).
- **NFR-6 Aksesibilitas bahasa:** dukungan render teks Arab (RTL) yang benar.
- **NFR-7 Maintainability:** kode modular, konfigurasi bank soal & paket mudah diubah tanpa ubah kode.
- **NFR-8 Anti-kecurangan ringan (opsional):** deteksi pindah tab/blur window untuk latihan disiplin (peringatan/log), bukan proctoring penuh.

---

## 7. Rancangan Alur Pengguna (User Flow)

```
[Login Peserta]
      │
      ▼
[Dashboard Peserta] ── lihat Kartu Ujian, Riwayat
      │  (pilih paket simulasi)
      ▼
[Detail Ujian + Input Token] ── tampil: nama, jumlah soal, durasi
      │  (klik "Mulai")
      ▼
[Halaman Ujian CBT]
   ├── Area soal (A–E)
   ├── Navigasi nomor (warna status)
   ├── Timer hitung mundur (server-based)
   ├── Tombol Ragu-ragu / Prev / Next
   └── Auto-save tiap aksi
      │  (klik "Selesai" → konfirmasi)  atau (waktu habis → auto-submit)
      ▼
[Skoring Otomatis]
      │
      ▼
[Halaman Hasil] ── skor per subtes + total
      │  (klik "Lihat Pembahasan")
      ▼
[Review/Pembahasan per soal]
```

---

## 8. Model Data (Konseptual)

| Entitas | Field utama |
|---|---|
| **User** | id, nama, nomor_peserta, password_hash, role (peserta/admin) |
| **Subtest** | id, nama (TPA/Bahasa/IPA/IPS/Keislaman/BTQ), deskripsi |
| **Question** | id, subtest_id, teks (rich/HTML), gambar_url, tipe (PG), tingkat_kesulitan, arah_teks (LTR/RTL), pembahasan |
| **Option** | id, question_id, label (A–E), teks, is_correct |
| **ExamPackage** | id, nama, durasi_menit, token, komposisi_subtes (JSON: subtest_id→jumlah_soal), acak_soal, acak_opsi, jendela_aktif |
| **Attempt** | id, user_id, package_id, waktu_mulai, waktu_selesai, status (berlangsung/selesai), skor_total |
| **AttemptAnswer** | id, attempt_id, question_id, option_id_dipilih, ragu (bool), waktu_update |
| **AttemptScore** | id, attempt_id, subtest_id, benar, salah, kosong, skor |

---

## 9. Rekomendasi Teknis (Usulan, dapat disesuaikan)

Karena ini proyek skala kecil dengan kebutuhan realtime-timer & auto-save, usulan stack:

- **Frontend:** React (Vite) + Tailwind CSS untuk UI cepat & responsif; state management ringan (Zustand/Context). Dukungan RTL untuk teks Arab.
- **Backend:** Node.js (Express/NestJS) **atau** Laravel (PHP) — pilih yang paling dikuasai. Menyediakan REST API untuk soal, attempt, auto-save, skoring, dan otoritatif atas waktu (server time).
- **Database:** PostgreSQL atau MySQL (relasional, cocok untuk model di atas). SQLite dapat dipakai untuk versi paling ringan/single-user.
- **Autentikasi:** JWT/session + hashing (bcrypt/argon2).
- **Deploy:** cukup satu VPS / layanan gratis (mis. Railway/Render/Vercel+backend) untuk pemakaian keluarga.

> Alternatif "cepat jadi" (Fase MVP tercepat): aplikasi web tunggal dengan data soal disimpan sebagai file JSON + penyimpanan progres di `localStorage`/backend ringan, bila hanya untuk 1–2 pengguna. Keputusan final diambil saat fase implementasi.

---

## 10. Rencana Rilis Bertahap (Milestones)

**Fase 0 — Persiapan konten**
- Kumpulkan/tulis bank soal awal per subtes beserta kunci & pembahasan (target minimal 1 paket lengkap per kelompok IPA & IPS).

**Fase 1 — MVP CBT Inti**
- Login peserta, satu paket ujian, tampilan soal, navigasi nomor + indikator warna, timer, ragu-ragu, auto-save, submit, skoring, halaman hasil sederhana.

**Fase 2 — Bank Soal & Admin**
- Panel admin CRUD soal & paket, import massal, acak soal/opsi, pembahasan, riwayat & tren skor.

**Fase 3 — Penyempurnaan Realisme & QoL**
- Token ujian, kartu ujian virtual, dukungan gambar & teks Arab RTL, mode gelap, ukuran font, konfigurasi bobot subtes, dashboard analitik.

**Fase 4 (Opsional / Lanjutan)**
- Modul BTQ berbasis rekaman audio (peserta merekam bacaan, admin menilai manual).
- Deteksi pindah tab / mode fokus untuk latihan disiplin.
- Multi-sesi & multi-peserta bersamaan.

---

## 11. Di Luar Lingkup (Out of Scope)

- Pendaftaran resmi, pembayaran, virtual account, dan proses kelulusan nyata.
- Wawancara (bagian dari seleksi asli, tidak disimulasikan dalam CBT ini).
- Proctoring/pengawasan kamera penuh seperti ujian daring resmi.
- Penilaian esai otomatis / AI grading (semua soal simulasi berbentuk pilihan ganda; BTQ = teori PG pada fase awal).

---

## 12. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Kisi-kisi resmi UIN SSC tidak rinci/berubah tiap tahun | Materi simulasi kurang akurat | Buat komposisi subtes yang dapat dikonfigurasi admin; verifikasi ulang saat pengumuman terbaru rilis |
| Kualitas & kebenaran soal buatan sendiri | Peserta belajar hal keliru | Review soal oleh orang yang kompeten; sertakan sumber/pembahasan |
| Kehilangan jawaban saat koneksi putus | Frustrasi & data hilang | Auto-save ke server + pemulihan state; timer berbasis server |
| Timer tidak akurat (manipulasi client) | Latihan tidak realistis | Hitung sisa waktu dari `waktu_mulai + durasi` di server |
| Hak cipta materi soal pihak ketiga | Masalah legal/etis | Gunakan soal buatan sendiri atau sumber yang boleh dipakai untuk edukasi |

---

## 13. Pertanyaan Terbuka (Open Questions)

1. Kelompok mana yang menjadi fokus adik — **IPA atau IPS** (menentukan Tes Kemampuan Bidang)?
2. Program studi tujuan (memengaruhi penekanan Keislaman/BTQ)?
3. Apakah komponen **BTQ** cukup disimulasikan sebagai soal teori PG, atau perlu modul rekaman audio?
4. Berapa **durasi & jumlah soal** target yang ingin ditiru (bila ada info dari kartu ujian asli)? Referensi UIN lain: ~85 soal / 90 menit.
5. Berapa banyak pengguna (hanya adik, atau beberapa teman) — memengaruhi pilihan stack & deployment.
6. Sumber soal: menulis sendiri, atau mengadaptasi dari kumpulan latihan yang sudah ada?

---

## Lampiran A — Referensi Riset

- Pengumuman resmi SPMB Mandiri Reguler UIN SSC TA 2025/2026, Nomor B-3564/Un.30/R/PP.00.9/06/2025 (materi ujian: TKD [TPA + Kebahasaan], Tes Kemampuan Bidang IPA/IPS, Tes BTQ; CBT 15–17 Juli 2025).
- Berita pelaksanaan SPMB Mandiri UIN Siber Cirebon 2025 (seleksi CBT + wawancara, ~400 peserta, 5 sesi).
- FAQ & pengumuman Admisi UIN Sunan Kalijaga (contoh format Mandiri CBT: 85 soal / 90 menit; subtes TPA, Dirasah Islamiyah, Bahasa Arab & Inggris, Kemampuan Dasar IPA/IPS) — sebagai acuan pola.
- Kisi-kisi Seleksi Mandiri UIN (mis. UIN Sumatera Utara): rincian TPA, Keislaman, Bahasa Arab, Bahasa Inggris.
- Panduan/manual sistem CBT (UNBK, CBT SEB, CBT PMB kampus) — acuan fitur & tampilan: login, token, navigasi nomor + indikator warna, timer, ragu-ragu, auto-save, konfirmasi selesai, acak soal/opsi.

> Catatan: rincian jumlah soal & durasi spesifik UIN SSC belum dipublikasikan detail; angka pada dokumen ini adalah estimasi acuan dan harus dikonfirmasi/diatur ulang. Produk dirancang agar parameter ini dapat dikonfigurasi.
