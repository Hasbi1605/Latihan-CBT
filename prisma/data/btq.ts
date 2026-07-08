import type { SeedOption } from "./types";

/** Soal teori BTQ (pilihan ganda) + prompt bacaan (rekaman). */
export const btqQuestions: Array<{
  subkategori: string;
  teks: string;
  arahTeks?: "LTR" | "RTL";
  tingkat?: "MUDAH" | "SEDANG" | "SULIT";
  tipe: "PG" | "REKAMAN";
  pembahasan: string;
  opsi?: SeedOption[];
}> = [
  {
    subkategori: "Tajwid - Nun Mati/Tanwin",
    teks: "Hukum bacaan nun mati atau tanwin yang diikuti huruf ba adalah ...",
    tingkat: "SEDANG",
    tipe: "PG",
    pembahasan:
      "Nun mati/tanwin + ba → Iqlab (nun dibaca menjadi mim dengan dengung). Contoh: min ba'di → mimba'di.",
    opsi: [
      { teks: "Idgham" },
      { teks: "Iqlab", benar: true },
      { teks: "Izhar" },
      { teks: "Ikhfa" },
      { teks: "Qalqalah" },
    ],
  },
  {
    subkategori: "Tajwid - Idgham",
    teks: "Huruf-huruf idgham bighunnah (dengung) pada nun mati/tanwin berjumlah ...",
    tingkat: "SEDANG",
    tipe: "PG",
    pembahasan:
      "Idgham bighunnah ada 4 huruf: ي ن م و (ya, nun, mim, waw). Mnemonik: يَرْمُلُون.",
    opsi: [
      { teks: "2 huruf" },
      { teks: "4 huruf", benar: true },
      { teks: "5 huruf" },
      { teks: "6 huruf" },
      { teks: "15 huruf" },
    ],
  },
  {
    subkategori: "Tajwid - Mad",
    teks: "Mad thobi'i (mad asli/natural) panjang bacaannya ...",
    tingkat: "MUDAH",
    tipe: "PG",
    pembahasan: "Mad thobi'i (mad al-asli) dibaca 2 harakat (1 alif panjang).",
    opsi: [
      { teks: "1 harakat" },
      { teks: "2 harakat", benar: true },
      { teks: "4 harakat" },
      { teks: "6 harakat" },
      { teks: "Tidak dibaca" },
    ],
  },
  {
    subkategori: "Makharijul Huruf",
    teks: "Huruf ح (ha) keluar dari ...",
    tingkat: "SEDANG",
    tipe: "PG",
    pembahasan: "Ha (ح) makhrajnya tenggorokan tengah (wasat al-halq).",
    opsi: [
      { teks: "Bibir bawah" },
      { teks: "Pangkal lidah" },
      { teks: "Tenggorokan tengah", benar: true },
      { teks: "Hidung" },
      { teks: "Gigi seri" },
    ],
  },
  {
    subkategori: "Makharijul Huruf",
    teks: "Huruf ق (qaf) keluar dari ...",
    tingkat: "SEDANG",
    tipe: "PG",
    pembahasan: "Qaf (ق) makhrajnya pangkal lidah dengan langit-langit (aqs al-lisan ma'a ash-shajr).",
    opsi: [
      { teks: "Bibir" },
      { teks: "Pangkal lidah + langit-langit", benar: true },
      { teks: "Ujung lidah" },
      { teks: "Tenggorokan bawah" },
      { teks: "Hidung" },
    ],
  },
  {
    subkategori: "Tajwid - Qalqalah",
    teks: "Huruf qalqalah (bergetar) berjumlah ...",
    tingkat: "MUDAH",
    tipe: "PG",
    pembahasan: "Huruf qalqalah ada 5: ق ط ب ج د (qaf, tha, ba, jim, dal).",
    opsi: [
      { teks: "3 huruf" },
      { teks: "4 huruf" },
      { teks: "5 huruf", benar: true },
      { teks: "6 huruf" },
      { teks: "7 huruf" },
    ],
  },
  {
    subkategori: "Tajwid - Ikhfa",
    teks: "Ikhfa syafawi terjadi ketika mim sukun bertemu dengan huruf ...",
    tingkat: "SULIT",
    tipe: "PG",
    pembahasan: "Ikhfa syafawi: mim sukun + ba → mim dibaca samar-samar dengan sisa getaran di bibir.",
    opsi: [
      { teks: "Ba", benar: true },
      { teks: "Mim" },
      { teks: "Nun" },
      { teks: "Lam" },
      { teks: "Waw" },
    ],
  },
  {
    subkategori: "Tajwid - Waqf",
    teks: "Tanda waqf (berhenti) yang artinya 'berhenti diperbolehkan, lanjut lebih baik' adalah ...",
    tingkat: "SEDANG",
    tipe: "PG",
    pembahasan: "Tanda ج (jim) artinya jaiz (boleh berhenti, lanjut lebih utama).",
    opsi: [
      { teks: "Tanda م (wajib berhenti)" },
      { teks: "Tanda ج (jaiz)", benar: true },
      { teks: "Tanda لا (larang berhenti)" },
      { teks: "Tanda ∴ (wajib lanjut)" },
      { teks: "Tanda ص (saktah)" },
    ],
  },
  {
    subkategori: "Praktik Baca",
    teks: "Bacalah ayat berikut dengan tajwid yang benar:\n\nبِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    tipe: "REKAMAN",
    pembahasan:
      "Perhatikan mad, ghunnah pada mim shadah, dan makhraj huruf ha pada الرَّحْمَٰنِ.",
  },
  {
    subkategori: "Praktik Baca",
    teks: "Bacalah ayat berikut:\n\nقُلْ هُوَ اللَّهُ أَحَدٌ",
    arahTeks: "RTL",
    tingkat: "MUDAH",
    tipe: "REKAMAN",
    pembahasan:
      "Perhatikan qalqalah pada ق dan د, serta makhraj qaf dan ha.",
  },
  {
    subkategori: "Praktik Baca",
    teks: "Bacalah ayat berikut:\n\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    tipe: "REKAMAN",
    pembahasan:
      "Perhatikan mad pada يَاكَ dan bacaan idgham/idgham syafawi bila ada.",
  },
];
