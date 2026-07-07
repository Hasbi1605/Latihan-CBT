import type { SeedQuestion } from "./types";

// Keislaman: Al-Qur'an & Hadis, Fikih, Akidah-Akhlak, dan Sejarah Kebudayaan Islam (SKI).
// Mengacu materi Literasi Ajaran Islam UM-PTKIN.
export const keislamanQuestions: SeedQuestion[] = [
  // ====================== AL-QUR'AN & HADIS (8) ======================
  {
    subkategori: "Quran-Hadis",
    teks: "Jumlah surah dalam Al-Qur'an adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Al-Qur'an terdiri atas 114 surah.",
    opsi: [
      { teks: "104" },
      { teks: "114", benar: true },
      { teks: "120" },
      { teks: "144" },
      { teks: "99" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Surah pertama dalam Al-Qur'an adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Surah pertama dalam mushaf Al-Qur'an adalah Al-Fatihah.",
    opsi: [
      { teks: "Al-Baqarah" },
      { teks: "Al-Fatihah", benar: true },
      { teks: "An-Nas" },
      { teks: "Al-Ikhlas" },
      { teks: "Al-'Alaq" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Surah terpanjang dalam Al-Qur'an adalah ...",
    tingkat: "SEDANG",
    pembahasan: "Surah terpanjang adalah Al-Baqarah yang terdiri atas 286 ayat.",
    opsi: [
      { teks: "Ali 'Imran" },
      { teks: "An-Nisa" },
      { teks: "Al-Baqarah", benar: true },
      { teks: "Al-Ma'idah" },
      { teks: "Al-A'raf" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Wahyu pertama yang diturunkan kepada Nabi Muhammad SAW adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Wahyu pertama adalah Surah Al-'Alaq ayat 1–5, yang diterima di Gua Hira.",
    opsi: [
      { teks: "QS Al-Fatihah 1–7" },
      { teks: "QS Al-'Alaq 1–5", benar: true },
      { teks: "QS Al-Muddassir 1–7" },
      { teks: "QS Al-Baqarah 1–5" },
      { teks: "QS An-Nas 1–6" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Jumlah juz dalam Al-Qur'an adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Al-Qur'an terbagi menjadi 30 juz.",
    opsi: [
      { teks: "20" },
      { teks: "25" },
      { teks: "30", benar: true },
      { teks: "40" },
      { teks: "114" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Satu-satunya surah dalam Al-Qur'an yang tidak diawali basmalah adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Surah At-Taubah (Bara'ah) adalah satu-satunya surah yang tidak diawali dengan basmalah.",
    opsi: [
      { teks: "Al-Fatihah" },
      { teks: "At-Taubah", benar: true },
      { teks: "An-Naml" },
      { teks: "Al-Kahfi" },
      { teks: "Yasin" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Secara bahasa dan istilah, hadis adalah segala sesuatu yang bersumber dari Nabi berupa ...",
    tingkat: "SEDANG",
    pembahasan:
      "Hadis meliputi perkataan (qauli), perbuatan (fi'li), dan ketetapan/persetujuan (taqriri) Nabi Muhammad SAW.",
    opsi: [
      { teks: "Perkataan saja" },
      { teks: "Perbuatan saja" },
      { teks: "Perkataan, perbuatan, dan ketetapan Nabi", benar: true },
      { teks: "Pendapat para sahabat" },
      { teks: "Ijtihad ulama" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Kitab suci yang diturunkan kepada Nabi Daud AS adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Zabur diturunkan kepada Nabi Daud AS; Taurat kepada Musa AS, Injil kepada Isa AS, dan Al-Qur'an kepada Muhammad SAW.",
    opsi: [
      { teks: "Taurat" },
      { teks: "Injil" },
      { teks: "Zabur", benar: true },
      { teks: "Al-Qur'an" },
      { teks: "Suhuf Ibrahim" },
    ],
  },

  // ====================== FIKIH (8) ======================
  {
    subkategori: "Fikih",
    teks: "Rukun Islam berjumlah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Rukun Islam ada 5: syahadat, salat, zakat, puasa Ramadan, dan haji bagi yang mampu.",
    opsi: [
      { teks: "3" },
      { teks: "4" },
      { teks: "5", benar: true },
      { teks: "6" },
      { teks: "7" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Jumlah rakaat salat fardu dalam sehari semalam adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Subuh 2 + Zuhur 4 + Asar 4 + Magrib 3 + Isya 4 = 17 rakaat.",
    opsi: [
      { teks: "11" },
      { teks: "15" },
      { teks: "17", benar: true },
      { teks: "19" },
      { teks: "20" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Bersuci dari hadas dan najis dalam istilah fikih disebut ...",
    tingkat: "MUDAH",
    pembahasan: "Thaharah berarti bersuci dari hadas maupun najis.",
    opsi: [
      { teks: "Thaharah", benar: true },
      { teks: "Tayamum" },
      { teks: "Istinja" },
      { teks: "Wudu" },
      { teks: "Ghusl" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Salah satu hal yang membatalkan wudu adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Keluarnya sesuatu dari qubul atau dubur (misalnya buang air atau kentut) membatalkan wudu.",
    opsi: [
      { teks: "Membaca Al-Qur'an" },
      { teks: "Buang air kecil", benar: true },
      { teks: "Berjalan kaki" },
      { teks: "Makan roti" },
      { teks: "Tidur sebentar sambil duduk tegak" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Rukun haji yang tidak boleh ditinggalkan dan menjadi puncak ibadah haji adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Wukuf di Arafah adalah rukun haji terpenting; tanpa wukuf, haji tidak sah.",
    opsi: [
      { teks: "Melempar jumrah" },
      { teks: "Wukuf di Arafah", benar: true },
      { teks: "Tawaf wada" },
      { teks: "Mabit di Mina" },
      { teks: "Mencium Hajar Aswad" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Besar zakat fitrah untuk setiap jiwa adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Zakat fitrah sebesar 1 sha' (setara ± 2,5–3 kg) makanan pokok per jiwa.",
    opsi: [
      { teks: "1 sha' (± 2,5 kg) makanan pokok", benar: true },
      { teks: "5 kg beras" },
      { teks: "10 kg gandum" },
      { teks: "2,5% dari harta" },
      { teks: "1 kg emas" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Kadar zakat mal (harta) yang wajib dikeluarkan jika telah mencapai nisab dan haul adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Zakat mal (misalnya emas, perak, dan uang simpanan) sebesar 2,5% setelah mencapai nisab dan haul (satu tahun).",
    opsi: [
      { teks: "2,5%", benar: true },
      { teks: "5%" },
      { teks: "10%" },
      { teks: "20%" },
      { teks: "25%" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Puasa pada bulan Ramadan hukumnya ...",
    tingkat: "MUDAH",
    pembahasan:
      "Puasa Ramadan hukumnya wajib bagi setiap muslim yang balig, berakal, dan mampu.",
    opsi: [
      { teks: "Sunah" },
      { teks: "Wajib", benar: true },
      { teks: "Makruh" },
      { teks: "Mubah" },
      { teks: "Haram" },
    ],
  },

  // ====================== AKIDAH-AKHLAK (7) ======================
  {
    subkategori: "Akidah-Akhlak",
    teks: "Rukun iman berjumlah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Rukun iman ada 6: iman kepada Allah, malaikat, kitab, rasul, hari akhir, dan qada-qadar.",
    opsi: [
      { teks: "4" },
      { teks: "5" },
      { teks: "6", benar: true },
      { teks: "7" },
      { teks: "10" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Malaikat yang bertugas menyampaikan wahyu kepada para nabi adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Malaikat Jibril bertugas menyampaikan wahyu.",
    opsi: [
      { teks: "Mikail" },
      { teks: "Jibril", benar: true },
      { teks: "Israfil" },
      { teks: "Izrail" },
      { teks: "Munkar" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Asmaul Husna 'Ar-Rahman' memiliki arti ...",
    tingkat: "MUDAH",
    pembahasan: "Ar-Rahman berarti Yang Maha Pengasih.",
    opsi: [
      { teks: "Maha Pengasih", benar: true },
      { teks: "Maha Kuasa" },
      { teks: "Maha Melihat" },
      { teks: "Maha Pemberi Rezeki" },
      { teks: "Maha Adil" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Malaikat yang bertugas mencatat amal baik dan buruk manusia adalah ...",
    tingkat: "SEDANG",
    pembahasan: "Raqib mencatat amal baik dan Atid mencatat amal buruk.",
    opsi: [
      { teks: "Jibril dan Mikail" },
      { teks: "Munkar dan Nakir" },
      { teks: "Raqib dan Atid", benar: true },
      { teks: "Israfil dan Izrail" },
      { teks: "Malik dan Ridwan" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Sifat wajib bagi Allah yang berarti 'terdahulu (tidak berpermulaan)' adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Qidam berarti terdahulu/tidak berpermulaan; lawannya (sifat mustahil) adalah hudus (baru).",
    opsi: [
      { teks: "Wujud" },
      { teks: "Qidam", benar: true },
      { teks: "Baqa" },
      { teks: "Wahdaniyah" },
      { teks: "Qiyamuhu binafsihi" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Perilaku jujur dalam ajaran Islam disebut ...",
    tingkat: "MUDAH",
    pembahasan:
      "Sikap jujur disebut sidiq, salah satu akhlak terpuji (mahmudah) dan sifat wajib rasul.",
    opsi: [
      { teks: "Amanah" },
      { teks: "Sidiq", benar: true },
      { teks: "Tabligh" },
      { teks: "Fatanah" },
      { teks: "Qanaah" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Perilaku menerima dengan ikhlas atas apa yang telah menjadi ketentuan Allah disebut ...",
    tingkat: "SEDANG",
    pembahasan:
      "Qanaah adalah sikap merasa cukup dan menerima dengan ikhlas pemberian Allah.",
    opsi: [
      { teks: "Tawaduk" },
      { teks: "Qanaah", benar: true },
      { teks: "Riya" },
      { teks: "Takabur" },
      { teks: "Israf" },
    ],
  },

  // ====================== SEJARAH KEBUDAYAAN ISLAM / SKI (7) ======================
  {
    subkategori: "SKI",
    teks: "Nabi Muhammad SAW dilahirkan di kota ...",
    tingkat: "MUDAH",
    pembahasan: "Nabi Muhammad SAW lahir di kota Mekah pada Tahun Gajah (± 571 M).",
    opsi: [
      { teks: "Madinah" },
      { teks: "Mekah", benar: true },
      { teks: "Taif" },
      { teks: "Yaman" },
      { teks: "Syam" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Peristiwa hijrahnya Nabi Muhammad SAW dari Mekah ke Madinah menjadi dasar penetapan ...",
    tingkat: "SEDANG",
    pembahasan:
      "Peristiwa hijrah (622 M) dijadikan dasar awal penanggalan kalender Hijriah pada masa Umar bin Khattab.",
    opsi: [
      { teks: "Kalender Masehi" },
      { teks: "Awal kalender Hijriah", benar: true },
      { teks: "Hari raya Idul Fitri" },
      { teks: "Tahun Gajah" },
      { teks: "Isra Mikraj" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Khalifah pertama dari Khulafaur Rasyidin adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Abu Bakar Ash-Shiddiq adalah khalifah pertama setelah wafatnya Nabi Muhammad SAW.",
    opsi: [
      { teks: "Umar bin Khattab" },
      { teks: "Abu Bakar Ash-Shiddiq", benar: true },
      { teks: "Usman bin Affan" },
      { teks: "Ali bin Abi Thalib" },
      { teks: "Muawiyah" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Perang pertama antara kaum muslimin dan kaum kafir Quraisy adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Perang Badar (2 H) adalah perang besar pertama yang dimenangkan kaum muslimin.",
    opsi: [
      { teks: "Perang Uhud" },
      { teks: "Perang Badar", benar: true },
      { teks: "Perang Khandaq" },
      { teks: "Perang Tabuk" },
      { teks: "Perang Hunain" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Sahabat yang mendapat gelar 'Al-Faruq' (pembeda antara hak dan batil) adalah ...",
    tingkat: "SEDANG",
    pembahasan: "Umar bin Khattab dikenal dengan gelar Al-Faruq.",
    opsi: [
      { teks: "Abu Bakar" },
      { teks: "Umar bin Khattab", benar: true },
      { teks: "Usman bin Affan" },
      { teks: "Ali bin Abi Thalib" },
      { teks: "Hamzah" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Sahabat yang dijuluki 'Dzun Nurain' (pemilik dua cahaya) karena menikahi dua putri Nabi adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Usman bin Affan dijuluki Dzun Nurain karena menikahi dua putri Nabi (Ruqayyah, lalu Ummu Kultsum).",
    opsi: [
      { teks: "Ali bin Abi Thalib" },
      { teks: "Usman bin Affan", benar: true },
      { teks: "Umar bin Khattab" },
      { teks: "Abu Bakar" },
      { teks: "Zaid bin Haritsah" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Masjid pertama yang dibangun Nabi Muhammad SAW dalam perjalanan hijrah adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Masjid Quba adalah masjid pertama yang dibangun Nabi (di dekat Madinah) dalam perjalanan hijrah.",
    opsi: [
      { teks: "Masjidil Haram" },
      { teks: "Masjid Nabawi" },
      { teks: "Masjid Quba", benar: true },
      { teks: "Masjidil Aqsa" },
      { teks: "Masjid Agung" },
    ],
  },
];
