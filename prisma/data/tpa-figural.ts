import type { SeedQuestion } from "./types";

// TPA figural/spasial — pola gambar (UM-PTKIN Penalaran Gambar).
export const tpaFiguralQuestions: SeedQuestion[] = [
  {
    subkategori: "Figural - Pola",
    teks: "Perhatikan deret gambar berikut. Gambar yang tepat untuk melengkapi pola adalah ...",
    gambarUrl: "/images/tpa/figural/01.svg",
    tingkat: "MUDAH",
    pembahasan:
      "Pola bolak-balik: lingkaran kosong dan lingkaran terisi. Setelah lingkaran terisi, berikutnya lingkaran kosong.",
    opsi: [
      { teks: "Lingkaran kosong", benar: true },
      { teks: "Lingkaran terisi penuh" },
      { teks: "Persegi kosong" },
      { teks: "Persegi terisi penuh" },
      { teks: "Segitiga kosong" },
    ],
  },
  {
    subkategori: "Figural - Pola",
    teks: "Perhatikan deret gambar berikut. Gambar selanjutnya yang sesuai pola adalah ...",
    gambarUrl: "/images/tpa/figural/02.svg",
    tingkat: "SEDANG",
    pembahasan:
      "Segitiga berputar 90° searah jarum jam setiap langkah. Posisi setelah segitiga menunjuk kanan adalah segitiga menunjuk bawah.",
    opsi: [
      { teks: "Segitiga menunjuk ke atas" },
      { teks: "Segitiga menunjuk ke kanan" },
      { teks: "Segitiga menunjuk ke bawah", benar: true },
      { teks: "Segitiga menunjuk ke kiri" },
      { teks: "Lingkaran" },
    ],
  },
  {
    subkategori: "Figural - Pola",
    teks: "Perhatikan deret gambar berikut. Jumlah elemen pada gambar berikutnya adalah ...",
    gambarUrl: "/images/tpa/figural/03.svg",
    tingkat: "MUDAH",
    pembahasan: "Jumlah titik bertambah satu setiap langkah: 1, 2, 3, 4, maka berikutnya 5 titik.",
    opsi: [
      { teks: "3 titik" },
      { teks: "4 titik" },
      { teks: "5 titik", benar: true },
      { teks: "6 titik" },
      { teks: "7 titik" },
    ],
  },
  {
    subkategori: "Figural - Pola",
    teks: "Perhatikan deret gambar berikut. Ukuran bentuk berikutnya yang tepat adalah ...",
    gambarUrl: "/images/tpa/figural/04.svg",
    tingkat: "SEDANG",
    pembahasan:
      "Ukuran persegi membesar bertahap: kecil → sedang → besar → lebih besar. Pola melanjutkan ukuran terbesar.",
    opsi: [
      { teks: "Persegi kecil" },
      { teks: "Persegi sedang" },
      { teks: "Persegi besar" },
      { teks: "Persegi paling besar", benar: true },
      { teks: "Persegi sangat kecil" },
    ],
  },
  {
    subkategori: "Figural - Pola",
    teks: "Perhatikan deret gambar berikut. Arah panah berikutnya adalah ...",
    gambarUrl: "/images/tpa/figural/05.svg",
    tingkat: "SEDANG",
    pembahasan:
      "Panah berputar 90° searah jarum jam: atas → kanan → bawah → kiri → atas.",
    opsi: [
      { teks: "Ke atas", benar: true },
      { teks: "Ke kanan" },
      { teks: "Ke bawah" },
      { teks: "Ke kiri" },
      { teks: "Diagonal kanan atas" },
    ],
  },
  {
    subkategori: "Figural - Pola",
    teks: "Perhatikan deret gambar berikut. Simbol berikutnya dalam pola adalah ...",
    gambarUrl: "/images/tpa/figural/06.svg",
    tingkat: "MUDAH",
    pembahasan: "Pola bolak-balik tanda plus (+) dan minus (−). Setelah minus, berikutnya plus.",
    opsi: [
      { teks: "Tanda plus (+)", benar: true },
      { teks: "Tanda minus (−)" },
      { teks: "Tanda kali (×)" },
      { teks: "Tanda bagi (÷)" },
      { teks: "Lingkaran" },
    ],
  },
  {
    subkategori: "Figural - Pola",
    teks: "Perhatikan deret gambar berikut. Bagian yang hilang pada pola grid adalah ...",
    gambarUrl: "/images/tpa/figural/07.svg",
    tingkat: "SULIT",
    pembahasan:
      "Setiap baris memuat satu kotak terisi, satu setengah terisi, dan satu kosong. Baris terakhir sudah ada terisi dan kosong, maka yang hilang adalah setengah terisi.",
    opsi: [
      { teks: "Kotak terisi penuh" },
      { teks: "Kotak setengah terisi", benar: true },
      { teks: "Kotak kosong" },
      { teks: "Lingkaran terisi" },
      { teks: "Segitiga terisi" },
    ],
  },
  {
    subkategori: "Figural - Pola",
    teks: "Perhatikan deret gambar berikut. Bangun keempat dalam pola tersebut adalah ...",
    gambarUrl: "/images/tpa/figural/08.svg",
    tingkat: "SULIT",
    pembahasan:
      "Jumlah sisi berkurang satu per langkah: heksagon (6) → pentagon (5) → persegi (4) → segitiga (3).",
    opsi: [
      { teks: "Segitiga", benar: true },
      { teks: "Persegi" },
      { teks: "Pentagon" },
      { teks: "Heksagon" },
      { teks: "Lingkaran" },
    ],
  },
];
