import type { SeedQuestion } from "./types";

// TPA tambahan: penalaran verbal, kuantitatif, dan logika (UM-PTKIN).
export const tpaExtraQuestions: SeedQuestion[] = [
  // ── Verbal - Analogi (12) ──
  {
    subkategori: "Verbal - Analogi",
    teks: "KOMPAS : ARAH = JAM : ...",
    tingkat: "MUDAH",
    pembahasan:
      "Kompas menunjukkan arah; jam menunjukkan waktu. Hubungan alat dengan fungsi utamanya.",
    opsi: [
      { teks: "Detik" },
      { teks: "Waktu", benar: true },
      { teks: "Jarum" },
      { teks: "Baterai" },
      { teks: "Angka" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "PENULIS : NOVEL = PEMATUNG : ...",
    tingkat: "MUDAH",
    pembahasan:
      "Penulis menciptakan novel; pematung menciptakan patung. Hubungan pencipta dengan karya.",
    opsi: [
      { teks: "Batu" },
      { teks: "Pahat" },
      { teks: "Patung", benar: true },
      { teks: "Galeri" },
      { teks: "Museum" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "TERAPI : PENYAKIT = PENDIDIKAN : ...",
    tingkat: "SEDANG",
    pembahasan:
      "Terapi mengatasi penyakit; pendidikan mengatasi kebodohan atau ketidaktahuan.",
    opsi: [
      { teks: "Sekolah" },
      { teks: "Guru" },
      { teks: "Kebodohan", benar: true },
      { teks: "Buku" },
      { teks: "Ujian" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "BENIH : TANAMAN = LARVA : ...",
    tingkat: "SEDANG",
    pembahasan:
      "Benih berkembang menjadi tanaman; larva berkembang menjadi serangga dewasa.",
    opsi: [
      { teks: "Telur" },
      { teks: "Serangga", benar: true },
      { teks: "Pupa" },
      { teks: "Daun" },
      { teks: "Air" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "KATAK : AMPHIBI = PAUS : ...",
    tingkat: "MUDAH",
    pembahasan:
      "Katak termasuk kelas amphibi; paus termasuk kelas mamalia.",
    opsi: [
      { teks: "Ikan" },
      { teks: "Reptil" },
      { teks: "Mamalia", benar: true },
      { teks: "Aves" },
      { teks: "Invertebrata" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "TERANG : GELAP = PANAS : ...",
    tingkat: "MUDAH",
    pembahasan: "Terang dan gelap adalah lawan kata; panas dan dingin adalah lawan kata.",
    opsi: [
      { teks: "Api" },
      { teks: "Dingin", benar: true },
      { teks: "Hangat" },
      { teks: "Matahari" },
      { teks: "Suhu" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "KONTRAK : PERJANJIAN = RESEP : ...",
    tingkat: "SEDANG",
    pembahasan:
      "Kontrak adalah bentuk tertulis dari perjanjian; resep adalah petunjuk tertulis untuk membuat obat.",
    opsi: [
      { teks: "Dokter" },
      { teks: "Obat", benar: true },
      { teks: "Apotek" },
      { teks: "Pasien" },
      { teks: "Suntik" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "PETA : WILAYAH = DENAH : ...",
    tingkat: "SEDANG",
    pembahasan:
      "Peta menggambarkan wilayah geografis; denah menggambarkan bangunan atau ruangan.",
    opsi: [
      { teks: "Jalan" },
      { teks: "Bangunan", benar: true },
      { teks: "Kompas" },
      { teks: "Kota" },
      { teks: "Gunung" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "FOTOSINTESIS : TANAMAN = RESPIRASI : ...",
    tingkat: "SULIT",
    pembahasan:
      "Fotosintesis adalah proses vital tanaman; respirasi adalah proses vital manusia (dan hewan) untuk menghasilkan energi.",
    opsi: [
      { teks: "Oksigen" },
      { teks: "Manusia", benar: true },
      { teks: "Daun" },
      { teks: "Matahari" },
      { teks: "Klorofil" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "KONSERVASI : LESTARI = REHABILITASI : ...",
    tingkat: "SULIT",
    pembahasan:
      "Konservasi bertujuan melestarikan; rehabilitasi bertujuan memulihkan kondisi yang rusak.",
    opsi: [
      { teks: "Hancur" },
      { teks: "Pulih", benar: true },
      { teks: "Baru" },
      { teks: "Lama" },
      { teks: "Beku" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "EPIGRAF : BUKU = MOTTO : ...",
    tingkat: "SULIT",
    pembahasan:
      "Epigraf adalah kutipan pembuka buku; motto adalah semboyan atau prinsip organisasi.",
    opsi: [
      { teks: "Organisasi", benar: true },
      { teks: "Pidato" },
      { teks: "Lagu" },
      { teks: "Surat" },
      { teks: "Novel" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "KURATOR : PAMERAN = EDITOR : ...",
    tingkat: "SEDANG",
    pembahasan:
      "Kurator mengelola dan menyusun pameran; editor mengelola dan menyusun publikasi.",
    opsi: [
      { teks: "Penulis" },
      { teks: "Publikasi", benar: true },
      { teks: "Cetak" },
      { teks: "Koran" },
      { teks: "Artikel" },
    ],
  },

  // ── Verbal - Silogisme (10) ──
  {
    subkategori: "Verbal - Silogisme",
    teks:
      "Semua mahasiswa yang lulus ujian masuk perguruan tinggi. Budi lulus ujian masuk perguruan tinggi. Kesimpulan yang paling tepat adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Premis hanya menyatakan bahwa lulus ujian adalah syarat masuk PTN, bukan bahwa semua yang lulus pasti mahasiswa. Dari Budi lulus saja tidak dapat disimpulkan ia mahasiswa.",
    opsi: [
      { teks: "Budi pasti mahasiswa" },
      { teks: "Budi tidak lulus ujian" },
      { teks: "Tidak dapat disimpulkan dengan pasti", benar: true },
      { teks: "Semua yang lulus adalah mahasiswa" },
      { teks: "Budi tidak masuk perguruan tinggi" },
    ],
  },
  {
    subkategori: "Verbal - Silogisme",
    teks:
      "Semua tumbuhan membutuhkan air. Padi adalah tumbuhan. Kesimpulan yang sah adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Silogisme kategoris: semua tumbuhan butuh air, padi adalah tumbuhan, maka padi membutuhkan air.",
    opsi: [
      { teks: "Padi tidak membutuhkan air" },
      { teks: "Sebagian tumbuhan adalah padi" },
      { teks: "Padi membutuhkan air", benar: true },
      { teks: "Semua yang butuh air adalah padi" },
      { teks: "Padi adalah hewan" },
    ],
  },
  {
    subkategori: "Verbal - Silogisme",
    teks:
      "Jika cuaca cerah, maka jemuran akan kering. Hari ini jemuran kering. Kesimpulan yang sah adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Ini adalah kekeliruan afirmasi konsekuen. Jemuran kering bisa karena cuaca cerah atau angin/kipas. Tidak dapat disimpulkan cuaca pasti cerah.",
    opsi: [
      { teks: "Cuaca pasti cerah" },
      { teks: "Cuaca pasti hujan" },
      { teks: "Tidak dapat disimpulkan cuaca cerah atau tidak", benar: true },
      { teks: "Jemuran tidak akan kering" },
      { teks: "Cuaca pasti mendung" },
    ],
  },
  {
    subkategori: "Verbal - Silogisme",
    teks:
      "Jika lampu lalu lintas merah, kendaraan harus berhenti. Kendaraan A tidak berhenti. Kesimpulan yang sah adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Modus tollens: jika p maka q; diketahui bukan q, maka bukan p. Kendaraan tidak berhenti berarti lampu tidak merah.",
    opsi: [
      { teks: "Lampu pasti merah" },
      { teks: "Lampu tidak merah", benar: true },
      { teks: "Kendaraan A melanggar hukum" },
      { teks: "Lampu pasti hijau" },
      { teks: "Tidak dapat disimpulkan" },
    ],
  },
  {
    subkategori: "Verbal - Silogisme",
    teks:
      "Semua dokter adalah sarjana. Sebagian sarjana bekerja di rumah sakit. Kesimpulan yang pasti benar adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Dari premis hanya dapat dipastikan semua dokter sarjana. Tidak dapat dipastikan semua dokter di RS atau sebagian sarjana adalah dokter.",
    opsi: [
      { teks: "Semua dokter bekerja di rumah sakit" },
      { teks: "Sebagian dokter bukan sarjana" },
      { teks: "Semua dokter adalah sarjana", benar: true },
      { teks: "Semua sarjana adalah dokter" },
      { teks: "Tidak ada sarjana di rumah sakit" },
    ],
  },
  {
    subkategori: "Verbal - Silogisme",
    teks:
      "Tidak ada burung yang merupakan mamalia. Semua elang adalah burung. Kesimpulan yang sah adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Elang adalah burung; tidak ada burung yang mamalia; maka elang bukan mamalia.",
    opsi: [
      { teks: "Elang adalah mamalia" },
      { teks: "Sebagian elang mamalia" },
      { teks: "Elang bukan mamalia", benar: true },
      { teks: "Semua mamalia adalah elang" },
      { teks: "Elang bukan burung" },
    ],
  },
  {
    subkategori: "Verbal - Silogisme",
    teks:
      "Jika nilai ujian di atas 80, siswa dinyatakan lulus. Siswa D dinyatakan lulus. Kesimpulan yang sah adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Afirmasi konsekuen: lulus bisa karena nilai di atas 80 atau alasan lain (misalnya remisi). Tidak dapat dipastikan nilai di atas 80.",
    opsi: [
      { teks: "Nilai siswa D pasti di atas 80" },
      { teks: "Siswa D pasti tidak lulus" },
      { teks: "Tidak dapat dipastikan nilai di atas 80", benar: true },
      { teks: "Siswa D nilainya 80" },
      { teks: "Semua yang lulus nilainya 100" },
    ],
  },
  {
    subkategori: "Verbal - Silogisme",
    teks:
      "Semua karyawan yang hadir rapat mendapat uang makan. Rina tidak mendapat uang makan. Kesimpulan yang sah adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Modus tollens: hadir rapat → dapat uang makan. Tidak dapat uang makan → tidak hadir rapat.",
    opsi: [
      { teks: "Rina hadir rapat" },
      { teks: "Rina tidak hadir rapat", benar: true },
      { teks: "Rina adalah karyawan" },
      { teks: "Semua yang tidak hadir dapat uang makan" },
      { teks: "Rina mendapat bonus" },
    ],
  },
  {
    subkategori: "Verbal - Silogisme",
    teks:
      "Sebagian atlet profesional pernah cedera. Semua yang pernah cedera perlu rehabilitasi. Kesimpulan yang pasti benar adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Dari 'sebagian atlet cedera' dan 'semua yang cedera perlu rehabilitasi', dapat disimpulkan sebagian atlet perlu rehabilitasi.",
    opsi: [
      { teks: "Semua atlet pernah cedera" },
      { teks: "Sebagian atlet perlu rehabilitasi", benar: true },
      { teks: "Semua atlet perlu rehabilitasi" },
      { teks: "Tidak ada atlet yang cedera" },
      { teks: "Semua yang rehabilitasi adalah atlet" },
    ],
  },
  {
    subkategori: "Verbal - Silogisme",
    teks:
      "Jika tanah longsor, jalan ditutup. Jalan tidak ditutup. Kesimpulan yang sah adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Modus tollens: longsor → jalan ditutup. Jalan tidak ditutup → tidak longsor.",
    opsi: [
      { teks: "Tanah longsor" },
      { teks: "Tanah tidak longsor", benar: true },
      { teks: "Jalan rusak parah" },
      { teks: "Cuaca buruk" },
      { teks: "Tidak dapat disimpulkan" },
    ],
  },

  // ── Verbal - Sinonim (5) ──
  {
    subkategori: "Verbal - Sinonim",
    teks: "Sinonim yang paling tepat untuk kata PROGRESIF adalah ...",
    tingkat: "SEDANG",
    pembahasan: "Progresif berarti maju, berkembang, atau mengikuti kemajuan zaman.",
    opsi: [
      { teks: "Konservatif" },
      { teks: "Maju", benar: true },
      { teks: "Lambat" },
      { teks: "Statis" },
      { teks: "Kuno" },
    ],
  },
  {
    subkategori: "Verbal - Sinonim",
    teks: "Sinonim yang paling tepat untuk kata EKSPLISIT adalah ...",
    tingkat: "SEDANG",
    pembahasan: "Eksplisit berarti terang, jelas, atau dinyatakan secara terbuka.",
    opsi: [
      { teks: "Samaran" },
      { teks: "Tersembunyi" },
      { teks: "Jelas", benar: true },
      { teks: "Kabur" },
      { teks: "Rahasia" },
    ],
  },
  {
    subkategori: "Verbal - Sinonim",
    teks: "Sinonim yang paling tepat untuk kata KOMPREHENSIF adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Komprehensif berarti menyeluruh, lengkap, atau mencakup banyak aspek.",
    opsi: [
      { teks: "Terbatas" },
      { teks: "Sebagian" },
      { teks: "Menyeluruh", benar: true },
      { teks: "Dangkal" },
      { teks: "Sementara" },
    ],
  },
  {
    subkategori: "Verbal - Sinonim",
    teks: "Sinonim yang paling tepat untuk kata KONSISTEN adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Konsisten berarti tetap, teguh, atau selaras dengan keadaan sebelumnya.",
    opsi: [
      { teks: "Berubah-ubah" },
      { teks: "Tetap", benar: true },
      { teks: "Acak" },
      { teks: "Bertentangan" },
      { teks: "Ragu" },
    ],
  },
  {
    subkategori: "Verbal - Sinonim",
    teks: "Sinonim yang paling tepat untuk kata INOVATIF adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Inovatif berarti membawa pembaruan, kreatif, atau orisinal.",
    opsi: [
      { teks: "Kreatif", benar: true },
      { teks: "Biasa" },
      { teks: "Usang" },
      { teks: "Kaku" },
      { teks: "Tradisional" },
    ],
  },

  // ── Verbal - Antonim (5) ──
  {
    subkategori: "Verbal - Antonim",
    teks: "Antonim yang paling tepat untuk kata ABSTRAK adalah ...",
    tingkat: "SEDANG",
    pembahasan: "Abstrak berarti tidak konkret atau tidak nyata; lawannya konkret.",
    opsi: [
      { teks: "Konkret", benar: true },
      { teks: "Umum" },
      { teks: "Kabur" },
      { teks: "Filosofis" },
      { teks: "Teoretis" },
    ],
  },
  {
    subkategori: "Verbal - Antonim",
    teks: "Antonim yang paling tepat untuk kata EGOIS adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Egois berarti hanya mementingkan diri sendiri; lawannya altruistik atau dermawan.",
    opsi: [
      { teks: "Serakah" },
      { teks: "Dermawan", benar: true },
      { teks: "Pemalu" },
      { teks: "Angkuh" },
      { teks: "Pelit" },
    ],
  },
  {
    subkategori: "Verbal - Antonim",
    teks: "Antonim yang paling tepat untuk kata VOLATIL adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Volatil berarti mudah berubah atau tidak stabil; lawannya stabil.",
    opsi: [
      { teks: "Stabil", benar: true },
      { teks: "Cair" },
      { teks: "Mudah" },
      { teks: "Kuat" },
      { teks: "Panas" },
    ],
  },
  {
    subkategori: "Verbal - Antonim",
    teks: "Antonim yang paling tepat untuk kata OPTIMIS adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Optimis berarti berharap baik; lawannya pesimis.",
    opsi: [
      { teks: "Pesimis", benar: true },
      { teks: "Realistis" },
      { teks: "Santai" },
      { teks: "Gembira" },
      { teks: "Tenang" },
    ],
  },
  {
    subkategori: "Verbal - Antonim",
    teks: "Antonim yang paling tepat untuk kata HOMOGEN adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Homogen berarti seragam atau sama jenis; lawannya heterogen (beragam).",
    opsi: [
      { teks: "Seragam" },
      { teks: "Heterogen", benar: true },
      { teks: "Padat" },
      { teks: "Cair" },
      { teks: "Murni" },
    ],
  },

  // ── Kuantitatif - Deret Angka (10) ──
  {
    subkategori: "Kuantitatif - Deret Angka",
    teks: "Bilangan selanjutnya dari deret 4, 8, 16, 32, ... adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Setiap suku dikalikan 2. Maka 32 × 2 = 64.",
    opsi: [
      { teks: "48" },
      { teks: "56" },
      { teks: "64", benar: true },
      { teks: "40" },
      { teks: "72" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret Angka",
    teks: "Bilangan selanjutnya dari deret 7, 14, 11, 22, 19, ... adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Pola ganda: ×2 lalu −3 bergantian. 7×2=14, 14−3=11, 11×2=22, 22−3=19, maka 19×2=38.",
    opsi: [
      { teks: "36" },
      { teks: "38", benar: true },
      { teks: "35" },
      { teks: "40" },
      { teks: "42" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret Angka",
    teks: "Bilangan selanjutnya dari deret 100, 95, 85, 70, 50, ... adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Selisih bertambah: −5, −10, −15, −20, lalu −25. Maka 50 − 25 = 25.",
    opsi: [
      { teks: "30" },
      { teks: "35" },
      { teks: "25", benar: true },
      { teks: "20" },
      { teks: "40" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret Angka",
    teks: "Bilangan selanjutnya dari deret 2, 3, 5, 8, 12, 17, ... adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Selisih bertambah 1: +1, +2, +3, +4, +5, lalu +6. Maka 17 + 6 = 23.",
    opsi: [
      { teks: "21" },
      { teks: "22" },
      { teks: "23", benar: true },
      { teks: "24" },
      { teks: "25" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret Angka",
    teks: "Bilangan selanjutnya dari deret 81, 27, 9, 3, ... adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Setiap suku dibagi 3. Maka 3 ÷ 3 = 1.",
    opsi: [
      { teks: "0" },
      { teks: "1", benar: true },
      { teks: "2" },
      { teks: "6" },
      { teks: "9" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret Angka",
    teks: "Bilangan selanjutnya dari deret 3, 7, 15, 31, 63, ... adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Pola: ×2 + 1. 3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63, maka 63×2+1=127.",
    opsi: [
      { teks: "125" },
      { teks: "126" },
      { teks: "127", benar: true },
      { teks: "128" },
      { teks: "130" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret Angka",
    teks: "Bilangan selanjutnya dari deret 1, 4, 9, 16, 25, ... adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Deret bilangan kuadrat: 1², 2², 3², 4², 5², maka 6² = 36.",
    opsi: [
      { teks: "30" },
      { teks: "32" },
      { teks: "36", benar: true },
      { teks: "35" },
      { teks: "49" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret Angka",
    teks: "Bilangan selanjutnya dari deret 5, 10, 20, 35, 55, ... adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Selisih bertambah 5: +5, +10, +15, +20, lalu +25. Maka 55 + 25 = 80.",
    opsi: [
      { teks: "75" },
      { teks: "78" },
      { teks: "80", benar: true },
      { teks: "85" },
      { teks: "70" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret Angka",
    teks: "Bilangan selanjutnya dari deret 2, 6, 12, 20, 30, ... adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Selisih bertambah 2: +4, +6, +8, +10, lalu +12. Maka 30 + 12 = 42.",
    opsi: [
      { teks: "40" },
      { teks: "41" },
      { teks: "42", benar: true },
      { teks: "44" },
      { teks: "38" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret Angka",
    teks: "Bilangan selanjutnya dari deret 1, 3, 6, 10, 15, 21, ... adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Bilangan segitiga: selisih +2, +3, +4, +5, +6, lalu +7. Maka 21 + 7 = 28.",
    opsi: [
      { teks: "26" },
      { teks: "27" },
      { teks: "28", benar: true },
      { teks: "29" },
      { teks: "30" },
    ],
  },

  // ── Kuantitatif - Soal Cerita (10) ──
  {
    subkategori: "Kuantitatif - Soal Cerita",
    teks:
      "Sebuah kereta menempuh jarak 180 km dengan kecepatan rata-rata 60 km/jam. Waktu perjalanan kereta adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Waktu = jarak ÷ kecepatan = 180 ÷ 60 = 3 jam.",
    opsi: [
      { teks: "2 jam" },
      { teks: "2,5 jam" },
      { teks: "3 jam", benar: true },
      { teks: "4 jam" },
      { teks: "5 jam" },
    ],
  },
  {
    subkategori: "Kuantitatif - Soal Cerita",
    teks:
      "Ahmad dan Budi berangkat dari kota yang sama ke arah berlawanan. Ahmad berjalan 4 km/jam dan Budi 6 km/jam. Jarak antara keduanya setelah 2 jam adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Jarak Ahmad = 4 × 2 = 8 km. Jarak Budi = 6 × 2 = 12 km. Total = 8 + 12 = 20 km.",
    opsi: [
      { teks: "16 km" },
      { teks: "18 km" },
      { teks: "20 km", benar: true },
      { teks: "24 km" },
      { teks: "10 km" },
    ],
  },
  {
    subkategori: "Kuantitatif - Soal Cerita",
    teks:
      "Sebuah toko memiliki 240 buku. 35% di antaranya novel. Jumlah buku yang bukan novel adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Novel = 35% × 240 = 84. Bukan novel = 240 − 84 = 156.",
    opsi: [
      { teks: "84" },
      { teks: "120" },
      { teks: "156", benar: true },
      { teks: "160" },
      { teks: "180" },
    ],
  },
  {
    subkategori: "Kuantitatif - Soal Cerita",
    teks:
      "Ibu membeli 3 kg beras dengan harga Rp12.000 per kg dan 2 kg gula dengan harga Rp15.000 per kg. Total belanja ibu adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Beras = 3 × 12.000 = 36.000. Gula = 2 × 15.000 = 30.000. Total = 66.000.",
    opsi: [
      { teks: "Rp60.000" },
      { teks: "Rp63.000" },
      { teks: "Rp66.000", benar: true },
      { teks: "Rp72.000" },
      { teks: "Rp54.000" },
    ],
  },
  {
    subkategori: "Kuantitatif - Soal Cerita",
    teks:
      "Sebuah kolam terisi penuh dalam 6 jam oleh keran A saja, atau 4 jam oleh keran B saja. Jika kedua keran dibuka bersamaan, kolam terisi penuh dalam ...",
    tingkat: "SULIT",
    pembahasan:
      "Kecepatan A = 1/6 kolam per jam. Kecepatan B = 1/4 kolam per jam. Bersama = 1/6 + 1/4 = 2/12 + 3/12 = 5/12. Waktu = 12/5 = 2,4 jam.",
    opsi: [
      { teks: "2 jam" },
      { teks: "2,4 jam", benar: true },
      { teks: "3 jam" },
      { teks: "5 jam" },
      { teks: "1,5 jam" },
    ],
  },
  {
    subkategori: "Kuantitatif - Soal Cerita",
    teks:
      "Umur Ayah 3 kali umur anak. Selisih umur mereka 28 tahun. Umur anak saat ini adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Misal umur anak = x, ayah = 3x. Selisih = 3x − x = 2x = 28, maka x = 14 tahun.",
    opsi: [
      { teks: "10 tahun" },
      { teks: "12 tahun" },
      { teks: "14 tahun", benar: true },
      { teks: "16 tahun" },
      { teks: "7 tahun" },
    ],
  },
  {
    subkategori: "Kuantitatif - Soal Cerita",
    teks:
      "Sebuah pabrik memproduksi 450 unit barang dalam 5 hari dengan 3 mesin identik. Jumlah barang yang diproduksi 2 mesin dalam 4 hari adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Produksi per mesin per hari = 450 ÷ (5 × 3) = 30 unit. Dua mesin 4 hari = 30 × 2 × 4 = 240 unit.",
    opsi: [
      { teks: "200 unit" },
      { teks: "220 unit" },
      { teks: "240 unit", benar: true },
      { teks: "270 unit" },
      { teks: "300 unit" },
    ],
  },
  {
    subkategori: "Kuantitatif - Soal Cerita",
    teks:
      "Dari 80 siswa, 50 mengikuti ekstrakurikuler olahraga dan 35 mengikuti seni. Jika 15 siswa mengikuti keduanya, jumlah siswa yang tidak mengikuti keduanya adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Yang ikut minimal satu = 50 + 35 − 15 = 70. Tidak ikut = 80 − 70 = 10.",
    opsi: [
      { teks: "5" },
      { teks: "10", benar: true },
      { teks: "15" },
      { teks: "20" },
      { teks: "25" },
    ],
  },
  {
    subkategori: "Kuantitatif - Soal Cerita",
    teks:
      "Sebuah mobil berangkat pukul 08.00 dengan kecepatan 50 km/jam. Mobil lain berangkat pukul 09.00 dari titik yang sama dengan kecepatan 75 km/jam. Mobil kedua menyusul mobil pertama pada pukul ...",
    tingkat: "SULIT",
    pembahasan:
      "Mobil 1 unggul 50 km saat mobil 2 berangkat. Kecepatan relatif = 75 − 50 = 25 km/jam. Waktu susul = 50 ÷ 25 = 2 jam setelah 09.00, yaitu pukul 11.00.",
    opsi: [
      { teks: "10.00" },
      { teks: "10.30" },
      { teks: "11.00", benar: true },
      { teks: "11.30" },
      { teks: "12.00" },
    ],
  },
  {
    subkategori: "Kuantitatif - Soal Cerita",
    teks:
      "Harga sebuah jaket Rp200.000 dinaikkan 20%, lalu diturunkan 20% dari harga baru. Harga akhir jaket adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Naik 20%: 200.000 × 1,2 = 240.000. Turun 20%: 240.000 × 0,8 = 192.000.",
    opsi: [
      { teks: "Rp200.000" },
      { teks: "Rp196.000" },
      { teks: "Rp192.000", benar: true },
      { teks: "Rp180.000" },
      { teks: "Rp160.000" },
    ],
  },

  // ── Kuantitatif - Pecahan/Persen (5) ──
  {
    subkategori: "Kuantitatif - Pecahan/Persen",
    teks: "Hasil dari 3/4 − 1/6 adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Penyebut sama 12: 3/4 = 9/12 dan 1/6 = 2/12. Maka 9/12 − 2/12 = 7/12.",
    opsi: [
      { teks: "2/12" },
      { teks: "5/12" },
      { teks: "7/12", benar: true },
      { teks: "1/2" },
      { teks: "11/12" },
    ],
  },
  {
    subkategori: "Kuantitatif - Pecahan/Persen",
    teks: "Nilai dari 20% dari 350 adalah ...",
    tingkat: "MUDAH",
    pembahasan: "20% × 350 = 0,2 × 350 = 70.",
    opsi: [
      { teks: "35" },
      { teks: "50" },
      { teks: "70", benar: true },
      { teks: "80" },
      { teks: "105" },
    ],
  },
  {
    subkategori: "Kuantitatif - Pecahan/Persen",
    teks:
      "Sebuah barang dibeli Rp80.000 dan dijual Rp100.000. Persentase keuntungannya adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Keuntungan = 20.000. Persentase = 20.000 ÷ 80.000 × 100% = 25%.",
    opsi: [
      { teks: "15%" },
      { teks: "20%" },
      { teks: "25%", benar: true },
      { teks: "30%" },
      { teks: "40%" },
    ],
  },
  {
    subkategori: "Kuantitatif - Pecahan/Persen",
    teks: "Hasil dari 2/3 × 9/10 adalah ...",
    tingkat: "MUDAH",
    pembahasan: "2/3 × 9/10 = 18/30 = 3/5.",
    opsi: [
      { teks: "1/5" },
      { teks: "2/5" },
      { teks: "3/5", benar: true },
      { teks: "4/5" },
      { teks: "6/10" },
    ],
  },
  {
    subkategori: "Kuantitatif - Pecahan/Persen",
    teks:
      "Jika 40% dari suatu bilangan adalah 72, maka 75% dari bilangan tersebut adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Bilangan penuh = 72 ÷ 0,4 = 180. Maka 75% × 180 = 135.",
    opsi: [
      { teks: "108" },
      { teks: "120" },
      { teks: "135", benar: true },
      { teks: "144" },
      { teks: "150" },
    ],
  },

  // ── Logika - Penalaran (5) ──
  {
    subkategori: "Logika - Penalaran",
    teks:
      "Lima siswa A, B, C, D, E duduk berjajar. A duduk di ujung kiri. C duduk tepat di tengah. B duduk di sebelah kanan C. D tidak duduk di ujung. Posisi E adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Urutan: A di kiri (posisi 1), C di tengah (posisi 3), B di kanan C (posisi 4). D tidak di ujung, maka D di posisi 2. E di posisi 5 (ujung kanan).",
    opsi: [
      { teks: "Posisi 2" },
      { teks: "Posisi 3" },
      { teks: "Posisi 5 (ujung kanan)", benar: true },
      { teks: "Posisi 1" },
      { teks: "Posisi 4" },
    ],
  },
  {
    subkategori: "Logika - Penalaran",
    teks:
      "Di sebuah lomba, Andi finis sebelum Budi tetapi setelah Cici. Dedi finis setelah Budi. Dina finis sebelum Cici. Urutan finis dari tercepat adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Dina < Cici < Andi < Budi < Dedi. Urutan: Dina, Cici, Andi, Budi, Dedi.",
    opsi: [
      { teks: "Cici, Dina, Andi, Budi, Dedi" },
      { teks: "Dina, Cici, Andi, Budi, Dedi", benar: true },
      { teks: "Dina, Andi, Cici, Budi, Dedi" },
      { teks: "Andi, Cici, Dina, Budi, Dedi" },
      { teks: "Dina, Cici, Budi, Andi, Dedi" },
    ],
  },
  {
    subkategori: "Logika - Penalaran",
    teks:
      "Jika hari ini Selasa, maka 100 hari dari sekarang adalah hari ...",
    tingkat: "SEDANG",
    pembahasan:
      "100 ÷ 7 = 14 sisa 2. Dua hari setelah Selasa adalah Kamis.",
    opsi: [
      { teks: "Rabu" },
      { teks: "Kamis", benar: true },
      { teks: "Jumat" },
      { teks: "Senin" },
      { teks: "Sabtu" },
    ],
  },
  {
    subkategori: "Logika - Penalaran",
    teks:
      "Empat bilangan 2, 5, 8, dan 11 disusun berurutan. Bilangan posisi keempat adalah 11. Bilangan posisi kedua adalah kelipatan 5. Bilangan posisi ketiga lebih besar dari posisi pertama. Jika posisi pertama adalah 2, bilangan posisi ketiga adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Posisi 4 = 11. Posisi 2 = 5 (satu-satunya kelipatan 5). Sisa 2 dan 8 untuk posisi 1 dan 3. Posisi 1 = 2, maka posisi 3 = 8 (karena 8 > 2).",
    opsi: [
      { teks: "5" },
      { teks: "8", benar: true },
      { teks: "11" },
      { teks: "2" },
      { teks: "13" },
    ],
  },
  {
    subkategori: "Logika - Penalaran",
    teks:
      "Sebuah kode sandi terdiri dari 3 angka berbeda. Digit pertama genap, digit kedua ganjil, digit ketiga kelipatan 3. Digit pertama adalah 4 dan digit ketiga adalah 9. Digit kedua yang memenuhi syarat adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Digit kedua harus ganjil dan berbeda dari 4 serta 9. Dari pilihan, hanya 5 yang ganjil dan belum terpakai.",
    opsi: [
      { teks: "2" },
      { teks: "4" },
      { teks: "5", benar: true },
      { teks: "6" },
      { teks: "8" },
    ],
  },
];
