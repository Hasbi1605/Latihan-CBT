import type { SeedQuestion } from "./types";

// Tes Potensi Akademik (TPA): penalaran verbal, logika, dan kuantitatif.
// Berbasis teks (tanpa gambar) agar sesuai MVP; gaya mengacu UM-PTKIN.
export const tpaQuestions: SeedQuestion[] = [
  {
    subkategori: "Verbal - Sinonim",
    teks: "Sinonim (persamaan kata) yang paling tepat untuk kata KREDIBEL adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Kredibel berarti dapat dipercaya atau dapat diandalkan (memiliki kredibilitas).",
    opsi: [
      { teks: "Diragukan" },
      { teks: "Dapat dipercaya", benar: true },
      { teks: "Terkenal" },
      { teks: "Mahal" },
      { teks: "Berbahaya" },
    ],
  },
  {
    subkategori: "Verbal - Sinonim",
    teks: "Sinonim yang paling tepat untuk kata SAHIH adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Sahih berarti sah, benar, atau valid.",
    opsi: [
      { teks: "Palsu" },
      { teks: "Lemah" },
      { teks: "Valid", benar: true },
      { teks: "Kabur" },
      { teks: "Rumit" },
    ],
  },
  {
    subkategori: "Verbal - Sinonim",
    teks: "Sinonim yang paling tepat untuk kata MUTAKHIR adalah ...",
    tingkat: "SEDANG",
    pembahasan: "Mutakhir berarti terkini, terbaru, atau paling akhir.",
    opsi: [
      { teks: "Kuno" },
      { teks: "Terbaru", benar: true },
      { teks: "Langka" },
      { teks: "Umum" },
      { teks: "Sederhana" },
    ],
  },
  {
    subkategori: "Verbal - Antonim",
    teks: "Antonim (lawan kata) yang paling tepat untuk kata GERSANG adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Gersang berarti tandus/kering; lawannya adalah subur.",
    opsi: [
      { teks: "Kering" },
      { teks: "Panas" },
      { teks: "Subur", benar: true },
      { teks: "Luas" },
      { teks: "Tandus" },
    ],
  },
  {
    subkategori: "Verbal - Antonim",
    teks: "Antonim yang paling tepat untuk kata SKEPTIS adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Skeptis berarti ragu/kurang percaya; lawannya adalah yakin atau percaya.",
    opsi: [
      { teks: "Ragu" },
      { teks: "Yakin", benar: true },
      { teks: "Curiga" },
      { teks: "Bingung" },
      { teks: "Takut" },
    ],
  },
  {
    subkategori: "Verbal - Antonim",
    teks: "Antonim yang paling tepat untuk kata MAYOR adalah ...",
    tingkat: "SEDANG",
    pembahasan: "Mayor berarti besar/utama; lawannya adalah minor (kecil).",
    opsi: [
      { teks: "Minor", benar: true },
      { teks: "Besar" },
      { teks: "Umum" },
      { teks: "Penting" },
      { teks: "Tinggi" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "NAKHODA : KAPAL = ... : ...",
    tingkat: "SEDANG",
    pembahasan:
      "Nakhoda mengemudikan kapal, sebagaimana pilot mengemudikan pesawat.",
    opsi: [
      { teks: "Masinis : Rel" },
      { teks: "Pilot : Pesawat", benar: true },
      { teks: "Sopir : Jalan" },
      { teks: "Penumpang : Tiket" },
      { teks: "Dokter : Obat" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "HAUS : MINUM = LAPAR : ...",
    tingkat: "MUDAH",
    pembahasan:
      "Rasa haus diatasi dengan minum, rasa lapar diatasi dengan makan.",
    opsi: [
      { teks: "Tidur" },
      { teks: "Makan", benar: true },
      { teks: "Nasi" },
      { teks: "Sakit" },
      { teks: "Kenyang" },
    ],
  },
  {
    subkategori: "Verbal - Analogi",
    teks: "TEPUNG : KUE = BENANG : ...",
    tingkat: "SEDANG",
    pembahasan:
      "Tepung adalah bahan untuk membuat kue; benang adalah bahan untuk membuat kain.",
    opsi: [
      { teks: "Jarum" },
      { teks: "Kapas" },
      { teks: "Kain", benar: true },
      { teks: "Baju" },
      { teks: "Mesin" },
    ],
  },
  {
    subkategori: "Logika - Silogisme",
    teks:
      "Semua mamalia bernapas dengan paru-paru. Paus adalah mamalia. Kesimpulan yang tepat adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Silogisme kategoris: karena semua mamalia bernapas dengan paru-paru dan paus adalah mamalia, maka paus bernapas dengan paru-paru.",
    opsi: [
      { teks: "Paus bernapas dengan insang" },
      { teks: "Paus bukan mamalia" },
      { teks: "Paus bernapas dengan paru-paru", benar: true },
      { teks: "Sebagian mamalia adalah paus" },
      { teks: "Semua paus hidup di darat" },
    ],
  },
  {
    subkategori: "Logika - Penalaran",
    teks:
      "Jika hujan turun maka jalan menjadi basah. Kenyataannya jalan tidak basah. Kesimpulan yang sah adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Modus tollens: jika p maka q; diketahui bukan q, maka bukan p. Karena jalan tidak basah, berarti hujan tidak turun.",
    opsi: [
      { teks: "Hujan turun" },
      { teks: "Hujan tidak turun", benar: true },
      { teks: "Jalan sedang diperbaiki" },
      { teks: "Hari mendung" },
      { teks: "Tidak dapat disimpulkan" },
    ],
  },
  {
    subkategori: "Logika - Penalaran",
    teks:
      "Semua siswa kelas A rajin belajar. Sebagian siswa yang rajin belajar meraih nilai tinggi. Pernyataan yang pasti benar adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Dari premis hanya dapat dipastikan bahwa semua siswa kelas A rajin belajar. Tidak dapat dipastikan semua meraih nilai tinggi (hanya 'sebagian yang rajin').",
    opsi: [
      { teks: "Semua siswa kelas A meraih nilai tinggi" },
      { teks: "Semua siswa kelas A rajin belajar", benar: true },
      { teks: "Sebagian siswa kelas A malas" },
      { teks: "Semua yang bernilai tinggi adalah siswa kelas A" },
      { teks: "Tidak ada siswa kelas A yang bernilai tinggi" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret",
    teks: "Bilangan selanjutnya dari deret 3, 6, 12, 24, ... adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Setiap suku dikalikan 2. Maka 24 × 2 = 48.",
    opsi: [
      { teks: "36" },
      { teks: "42" },
      { teks: "48", benar: true },
      { teks: "30" },
      { teks: "60" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret",
    teks: "Bilangan selanjutnya dari deret 2, 5, 10, 17, 26, ... adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Selisih antar suku bertambah ganjil: +3, +5, +7, +9, lalu +11. Maka 26 + 11 = 37.",
    opsi: [
      { teks: "35" },
      { teks: "36" },
      { teks: "37", benar: true },
      { teks: "38" },
      { teks: "40" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret",
    teks: "Bilangan selanjutnya dari deret 1, 1, 2, 3, 5, 8, ... adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Deret Fibonacci: tiap suku adalah jumlah dua suku sebelumnya. Maka 5 + 8 = 13.",
    opsi: [
      { teks: "11" },
      { teks: "12" },
      { teks: "13", benar: true },
      { teks: "14" },
      { teks: "16" },
    ],
  },
  {
    subkategori: "Kuantitatif - Deret Huruf",
    teks: "Huruf selanjutnya dari deret A, C, E, G, ... adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Pola melompati satu huruf (A, _, C, _, E, _, G, _, I). Maka huruf berikutnya adalah I.",
    opsi: [
      { teks: "H" },
      { teks: "I", benar: true },
      { teks: "J" },
      { teks: "K" },
      { teks: "F" },
    ],
  },
  {
    subkategori: "Kuantitatif - Persentase",
    teks: "Nilai dari 15% × 240 adalah ...",
    tingkat: "MUDAH",
    pembahasan: "15% × 240 = 0,15 × 240 = 36.",
    opsi: [
      { teks: "24" },
      { teks: "30" },
      { teks: "36", benar: true },
      { teks: "40" },
      { teks: "45" },
    ],
  },
  {
    subkategori: "Kuantitatif - Persentase",
    teks:
      "Sebuah barang berharga Rp80.000 diberi diskon 25%. Harga setelah diskon adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Diskon 25% dari 80.000 = 20.000. Harga = 80.000 − 20.000 = 60.000.",
    opsi: [
      { teks: "Rp55.000" },
      { teks: "Rp60.000", benar: true },
      { teks: "Rp65.000" },
      { teks: "Rp70.000" },
      { teks: "Rp75.000" },
    ],
  },
  {
    subkategori: "Kuantitatif - Persentase",
    teks: "Jika 25% dari suatu bilangan adalah 50, maka bilangan tersebut adalah ...",
    tingkat: "SEDANG",
    pembahasan: "25% = 1/4. Jika 1/4 bagian = 50, maka bilangan penuh = 50 × 4 = 200.",
    opsi: [
      { teks: "100" },
      { teks: "150" },
      { teks: "200", benar: true },
      { teks: "250" },
      { teks: "125" },
    ],
  },
  {
    subkategori: "Kuantitatif - Aljabar",
    teks: "Jika 3x + 7 = 22, maka nilai x adalah ...",
    tingkat: "MUDAH",
    pembahasan: "3x = 22 − 7 = 15, sehingga x = 15 / 3 = 5.",
    opsi: [
      { teks: "3" },
      { teks: "4" },
      { teks: "5", benar: true },
      { teks: "6" },
      { teks: "7" },
    ],
  },
  {
    subkategori: "Kuantitatif - Statistika",
    teks: "Rata-rata dari data 4, 8, 6, 10 adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Jumlah = 4 + 8 + 6 + 10 = 28. Rata-rata = 28 / 4 = 7.",
    opsi: [
      { teks: "6" },
      { teks: "7", benar: true },
      { teks: "8" },
      { teks: "9" },
      { teks: "28" },
    ],
  },
  {
    subkategori: "Kuantitatif - Perbandingan",
    teks:
      "Dua bilangan memiliki perbandingan 2 : 3 dan jumlahnya 40. Bilangan yang lebih besar adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Jumlah bagian = 2 + 3 = 5. Nilai 1 bagian = 40 / 5 = 8. Bilangan lebih besar = 3 × 8 = 24.",
    opsi: [
      { teks: "16" },
      { teks: "20" },
      { teks: "24", benar: true },
      { teks: "28" },
      { teks: "30" },
    ],
  },
  {
    subkategori: "Kuantitatif - Geometri",
    teks: "Keliling sebuah persegi yang panjang sisinya 9 cm adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Keliling persegi = 4 × sisi = 4 × 9 = 36 cm.",
    opsi: [
      { teks: "18 cm" },
      { teks: "27 cm" },
      { teks: "36 cm", benar: true },
      { teks: "45 cm" },
      { teks: "81 cm" },
    ],
  },
  {
    subkategori: "Kuantitatif - Operasi",
    teks: "Hasil dari 7² − 3² adalah ...",
    tingkat: "MUDAH",
    pembahasan: "7² = 49 dan 3² = 9, maka 49 − 9 = 40.",
    opsi: [
      { teks: "16" },
      { teks: "32" },
      { teks: "40", benar: true },
      { teks: "58" },
      { teks: "21" },
    ],
  },
  {
    subkategori: "Kuantitatif - Kecepatan",
    teks:
      "Sebuah mobil menempuh jarak 120 km dalam waktu 2 jam. Kecepatan rata-rata mobil tersebut adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Kecepatan = jarak / waktu = 120 / 2 = 60 km/jam.",
    opsi: [
      { teks: "40 km/jam" },
      { teks: "50 km/jam" },
      { teks: "60 km/jam", benar: true },
      { teks: "70 km/jam" },
      { teks: "80 km/jam" },
    ],
  },
  {
    subkategori: "Kuantitatif - Desimal",
    teks: "Hasil dari 0,2 × 0,5 adalah ...",
    tingkat: "SEDANG",
    pembahasan: "0,2 × 0,5 = 0,1.",
    opsi: [
      { teks: "0,01" },
      { teks: "0,1", benar: true },
      { teks: "1,0" },
      { teks: "0,25" },
      { teks: "0,7" },
    ],
  },
  {
    subkategori: "Kuantitatif - Persentase",
    teks:
      "Harga sebuah barang naik dari Rp100.000 menjadi Rp125.000. Persentase kenaikannya adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Kenaikan = 25.000. Persentase = 25.000 / 100.000 × 100% = 25%.",
    opsi: [
      { teks: "20%" },
      { teks: "25%", benar: true },
      { teks: "30%" },
      { teks: "15%" },
      { teks: "12,5%" },
    ],
  },
  {
    subkategori: "Kuantitatif - FPB",
    teks: "FPB (Faktor Persekutuan Terbesar) dari 12 dan 18 adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Faktor 12: 1,2,3,4,6,12. Faktor 18: 1,2,3,6,9,18. Faktor persekutuan terbesar = 6.",
    opsi: [
      { teks: "2" },
      { teks: "3" },
      { teks: "6", benar: true },
      { teks: "9" },
      { teks: "12" },
    ],
  },
  {
    subkategori: "Kuantitatif - Pecahan",
    teks: "Hasil dari 2/5 + 1/10 adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Samakan penyebut: 2/5 = 4/10. Maka 4/10 + 1/10 = 5/10 = 1/2.",
    opsi: [
      { teks: "3/15" },
      { teks: "1/2", benar: true },
      { teks: "3/10" },
      { teks: "2/7" },
      { teks: "1/5" },
    ],
  },
  {
    subkategori: "Kuantitatif - Soal Cerita",
    teks:
      "Sebuah kelas berisi 30 siswa, 40% di antaranya perempuan. Jumlah siswa laki-laki adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Perempuan = 40% × 30 = 12. Laki-laki = 30 − 12 = 18.",
    opsi: [
      { teks: "12" },
      { teks: "15" },
      { teks: "18", benar: true },
      { teks: "20" },
      { teks: "24" },
    ],
  },
];
