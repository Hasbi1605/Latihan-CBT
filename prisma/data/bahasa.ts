import type { SeedQuestion } from "./types";

// Kebahasaan: Bahasa Indonesia, Bahasa Inggris, dan Bahasa Arab.
// Mengacu materi Literasi Membaca UM-PTKIN (ID/EN/AR).
export const bahasaQuestions: SeedQuestion[] = [
  // ====================== BAHASA INDONESIA (14) ======================
  {
    subkategori: "Indonesia - Kata Baku",
    teks: "Penulisan kata baku yang benar menurut KBBI adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Bentuk baku: risiko (bukan resiko), praktik (bukan praktek), apotek (bukan apotik). Jawaban yang seluruhnya baku adalah 'risiko'.",
    opsi: [
      { teks: "Resiko" },
      { teks: "Risiko", benar: true },
      { teks: "Resico" },
      { teks: "Risico" },
      { teks: " Risik" },
    ],
  },
  {
    subkategori: "Indonesia - Kata Baku",
    teks: "Kata berikut yang penulisannya sudah baku adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Bentuk baku adalah 'jadwal' (bukan jadual), 'izin' (bukan ijin), 'analisis' (bukan analisa).",
    opsi: [
      { teks: "Jadual" },
      { teks: "Ijin" },
      { teks: "Analisa" },
      { teks: "Jadwal", benar: true },
      { teks: "Sistim" },
    ],
  },
  {
    subkategori: "Indonesia - Ide Pokok",
    teks:
      "Bacalah paragraf berikut. \"Sampah plastik menjadi masalah serius di banyak kota. Plastik sulit terurai dan mencemari tanah serta laut. Oleh karena itu, pengurangan penggunaan plastik sekali pakai sangat diperlukan.\" Ide pokok paragraf tersebut adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Kalimat-kalimat dalam paragraf berfokus pada masalah sampah plastik dan perlunya pengurangannya. Ide pokok: sampah plastik sebagai masalah serius yang perlu dikurangi.",
    opsi: [
      { teks: "Cara mendaur ulang plastik" },
      { teks: "Sampah plastik adalah masalah serius yang perlu dikurangi", benar: true },
      { teks: "Laut tercemar oleh minyak" },
      { teks: "Plastik mudah terurai" },
      { teks: "Kota besar selalu bersih" },
    ],
  },
  {
    subkategori: "Indonesia - Simpulan",
    teks:
      "\"Ani rajin belajar setiap hari. Ia juga mengikuti bimbingan belajar. Hasilnya, nilai ujian Ani selalu tinggi.\" Simpulan yang tepat dari paragraf tersebut adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Paragraf menunjukkan hubungan sebab-akibat: usaha belajar Ani menghasilkan nilai tinggi. Simpulan: ketekunan belajar berpengaruh pada hasil ujian yang baik.",
    opsi: [
      { teks: "Ani anak orang kaya" },
      { teks: "Bimbingan belajar itu mahal" },
      { teks: "Ketekunan belajar berpengaruh pada nilai yang tinggi", benar: true },
      { teks: "Ujian selalu mudah" },
      { teks: "Ani tidak pernah bermain" },
    ],
  },
  {
    subkategori: "Indonesia - Ejaan",
    teks: "Penggunaan huruf kapital yang tepat terdapat pada kalimat ...",
    tingkat: "SEDANG",
    pembahasan:
      "Nama hari, bulan, dan nama diri diawali huruf kapital. 'Kami berlibur ke Cirebon pada hari Senin.' sudah tepat.",
    opsi: [
      { teks: "kami berlibur ke cirebon pada hari senin." },
      { teks: "Kami berlibur ke Cirebon pada hari Senin.", benar: true },
      { teks: "Kami Berlibur ke Cirebon pada Hari Senin." },
      { teks: "kami berlibur ke Cirebon pada Hari senin." },
      { teks: "Kami berlibur ke cirebon pada hari Senin." },
    ],
  },
  {
    subkategori: "Indonesia - Kata Depan",
    teks:
      "Penulisan kata depan 'di' yang benar terdapat pada kalimat ...",
    tingkat: "SEDANG",
    pembahasan:
      "Kata depan 'di' (menunjuk tempat) ditulis terpisah, sedangkan awalan 'di-' (kata kerja pasif) ditulis serangkai. 'Buku itu diletakkan di atas meja.' sudah benar.",
    opsi: [
      { teks: "Buku itu di letakkan diatas meja." },
      { teks: "Buku itu diletakkan di atas meja.", benar: true },
      { teks: "Buku itu di letakkan di atas meja." },
      { teks: "Buku itu diletakkan diatas meja." },
      { teks: "Buku itu diletakan di-atas meja." },
    ],
  },
  {
    subkategori: "Indonesia - Sinonim",
    teks: "Kata 'majemuk' pada 'keluarga majemuk' bersinonim dengan ...",
    tingkat: "SEDANG",
    pembahasan: "Majemuk berarti terdiri atas beberapa bagian; sinonimnya adalah beragam/gabungan.",
    opsi: [
      { teks: "Tunggal" },
      { teks: "Gabungan", benar: true },
      { teks: "Kecil" },
      { teks: "Modern" },
      { teks: "Miskin" },
    ],
  },
  {
    subkategori: "Indonesia - Peribahasa",
    teks: "Makna peribahasa 'besar pasak daripada tiang' adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Peribahasa ini bermakna pengeluaran lebih besar daripada pendapatan.",
    opsi: [
      { teks: "Pekerjaan yang sia-sia" },
      { teks: "Pengeluaran lebih besar daripada pendapatan", benar: true },
      { teks: "Orang sombong akan jatuh" },
      { teks: "Bekerja tanpa hasil" },
      { teks: "Menunda pekerjaan penting" },
    ],
  },
  {
    subkategori: "Indonesia - Kalimat Efektif",
    teks: "Kalimat yang paling efektif adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Kalimat efektif tidak berlebihan (tidak mubazir). 'Para siswa berdiskusi di kelas.' sudah efektif; opsi lain mengandung pemborosan kata (para siswa-siswa, saling ... satu sama lain).",
    opsi: [
      { teks: "Para siswa-siswa sedang berdiskusi di dalam kelas." },
      { teks: "Para siswa berdiskusi di kelas.", benar: true },
      { teks: "Siswa-siswa saling berdiskusi satu sama lain di kelas." },
      { teks: "Semua para siswa berdiskusi di dalam ruang kelas." },
      { teks: "Para siswa sedang saling berdiskusi bersama-sama." },
    ],
  },
  {
    subkategori: "Indonesia - Antonim",
    teks: "Antonim kata 'abstrak' adalah ...",
    tingkat: "MUDAH",
    pembahasan: "Abstrak berarti tidak berwujud; lawannya adalah konkret (nyata/berwujud).",
    opsi: [
      { teks: "Konkret", benar: true },
      { teks: "Rumit" },
      { teks: "Semu" },
      { teks: "Umum" },
      { teks: "Jelas" },
    ],
  },
  {
    subkategori: "Indonesia - Imbuhan",
    teks: "Makna imbuhan 'ter-' pada kata 'tercepat' adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Imbuhan 'ter-' pada 'tercepat' menyatakan tingkat paling (superlatif), yaitu paling cepat.",
    opsi: [
      { teks: "Tidak sengaja" },
      { teks: "Dapat di-" },
      { teks: "Paling", benar: true },
      { teks: "Sedang" },
      { teks: "Menjadi" },
    ],
  },
  {
    subkategori: "Indonesia - Konjungsi",
    teks:
      "Konjungsi yang tepat untuk melengkapi kalimat 'Ia tidak masuk sekolah ... sakit.' adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Konjungsi 'karena' menyatakan sebab, sesuai konteks alasan tidak masuk sekolah.",
    opsi: [
      { teks: "tetapi" },
      { teks: "karena", benar: true },
      { teks: "meskipun" },
      { teks: "atau" },
      { teks: "sehingga" },
    ],
  },
  {
    subkategori: "Indonesia - Tanda Baca",
    teks: "Penggunaan tanda koma yang tepat terdapat pada kalimat ...",
    tingkat: "SEDANG",
    pembahasan:
      "Tanda koma dipakai untuk memisahkan unsur dalam perincian. 'Ibu membeli beras, gula, dan minyak.' sudah tepat.",
    opsi: [
      { teks: "Ibu membeli beras gula dan minyak." },
      { teks: "Ibu membeli beras, gula, dan minyak.", benar: true },
      { teks: "Ibu membeli beras, gula dan, minyak." },
      { teks: "Ibu, membeli beras gula dan minyak." },
      { teks: "Ibu membeli, beras, gula, minyak." },
    ],
  },
  {
    subkategori: "Indonesia - Makna Kata",
    teks: "Kata 'valid' dalam kalimat 'data itu valid' bermakna ...",
    tingkat: "MUDAH",
    pembahasan: "Valid berarti sahih atau dapat dipercaya kebenarannya.",
    opsi: [
      { teks: "Banyak" },
      { teks: "Sahih", benar: true },
      { teks: "Lama" },
      { teks: "Rahasia" },
      { teks: "Salah" },
    ],
  },

  // ====================== BAHASA INGGRIS (13) ======================
  {
    subkategori: "Inggris - Tenses",
    teks: "Choose the correct answer: She ___ to school every day.",
    tingkat: "MUDAH",
    pembahasan:
      "Simple present tense untuk subjek orang ketiga tunggal (she) memakai 'goes'.",
    opsi: [
      { teks: "go" },
      { teks: "goes", benar: true },
      { teks: "going" },
      { teks: "gone" },
      { teks: "is go" },
    ],
  },
  {
    subkategori: "Inggris - Tenses",
    teks: "Choose the correct answer: They ___ football when it started to rain.",
    tingkat: "SEDANG",
    pembahasan:
      "Past continuous ('were playing') untuk aksi yang sedang berlangsung ketika aksi lain (started) terjadi.",
    opsi: [
      { teks: "play" },
      { teks: "plays" },
      { teks: "were playing", benar: true },
      { teks: "have played" },
      { teks: "will play" },
    ],
  },
  {
    subkategori: "Inggris - Subject-Verb Agreement",
    teks: "Choose the correct answer: Each of the students ___ a book.",
    tingkat: "SEDANG",
    pembahasan:
      "'Each of' diikuti kata kerja tunggal, sehingga memakai 'has'.",
    opsi: [
      { teks: "have" },
      { teks: "has", benar: true },
      { teks: "having" },
      { teks: "are" },
      { teks: "were" },
    ],
  },
  {
    subkategori: "Inggris - Passive Voice",
    teks: "Change into passive voice: 'The chef cooks the meal.'",
    tingkat: "SEDANG",
    pembahasan:
      "Passive present simple: object + is/are + past participle. 'The meal is cooked by the chef.'",
    opsi: [
      { teks: "The meal is cooked by the chef.", benar: true },
      { teks: "The meal cooks the chef." },
      { teks: "The meal was cook by the chef." },
      { teks: "The meal is cooking the chef." },
      { teks: "The meal has cook by the chef." },
    ],
  },
  {
    subkategori: "Inggris - Vocabulary",
    teks: "The synonym of the word 'happy' is ...",
    tingkat: "MUDAH",
    pembahasan: "'Happy' bersinonim dengan 'glad' (senang/gembira).",
    opsi: [
      { teks: "sad" },
      { teks: "glad", benar: true },
      { teks: "angry" },
      { teks: "tired" },
      { teks: "bored" },
    ],
  },
  {
    subkategori: "Inggris - Vocabulary",
    teks: "The antonym of the word 'expensive' is ...",
    tingkat: "MUDAH",
    pembahasan: "Lawan kata 'expensive' (mahal) adalah 'cheap' (murah).",
    opsi: [
      { teks: "costly" },
      { teks: "cheap", benar: true },
      { teks: "rich" },
      { teks: "large" },
      { teks: "valuable" },
    ],
  },
  {
    subkategori: "Inggris - Preposition",
    teks: "Choose the correct preposition: The book is ___ the table.",
    tingkat: "MUDAH",
    pembahasan:
      "'On' menunjukkan sesuatu berada di atas permukaan (table).",
    opsi: [
      { teks: "in" },
      { teks: "on", benar: true },
      { teks: "at" },
      { teks: "of" },
      { teks: "for" },
    ],
  },
  {
    subkategori: "Inggris - Article",
    teks: "Choose the correct article: She is ___ honest person.",
    tingkat: "SEDANG",
    pembahasan:
      "Kata 'honest' berawalan bunyi vokal (huruf 'h' tidak dibunyikan), sehingga memakai 'an'.",
    opsi: [
      { teks: "a" },
      { teks: "an", benar: true },
      { teks: "the" },
      { teks: "one" },
      { teks: "some" },
    ],
  },
  {
    subkategori: "Inggris - Comparison",
    teks: "Choose the correct answer: This building is ___ than that one.",
    tingkat: "SEDANG",
    pembahasan:
      "Bentuk komparatif untuk kata sifat panjang memakai 'more', dan untuk 'tall' memakai '-er': 'taller'.",
    opsi: [
      { teks: "tall" },
      { teks: "taller", benar: true },
      { teks: "tallest" },
      { teks: "more tall" },
      { teks: "most tall" },
    ],
  },
  {
    subkategori: "Inggris - Modal",
    teks: "Choose the correct modal: You ___ wear a helmet when riding a motorcycle.",
    tingkat: "SEDANG",
    pembahasan:
      "'Must' menyatakan kewajiban/keharusan yang kuat, sesuai konteks keselamatan berkendara.",
    opsi: [
      { teks: "must", benar: true },
      { teks: "might" },
      { teks: "could" },
      { teks: "would" },
      { teks: "may" },
    ],
  },
  {
    subkategori: "Inggris - Reading",
    teks:
      "Read: \"Rina wakes up at five. She prays, then helps her mother prepare breakfast before going to school.\" What does Rina do after praying?",
    tingkat: "SEDANG",
    pembahasan:
      "Sesuai teks, setelah shalat (praying) Rina membantu ibunya menyiapkan sarapan.",
    opsi: [
      { teks: "She goes to school" },
      { teks: "She helps her mother prepare breakfast", benar: true },
      { teks: "She sleeps again" },
      { teks: "She reads a book" },
      { teks: "She wakes up" },
    ],
  },
  {
    subkategori: "Inggris - Question Form",
    teks: "Choose the correct question: '___ do you live?' — 'In Cirebon.'",
    tingkat: "MUDAH",
    pembahasan:
      "Jawaban menunjukkan tempat (In Cirebon), maka kata tanya yang tepat adalah 'Where'.",
    opsi: [
      { teks: "What" },
      { teks: "When" },
      { teks: "Where", benar: true },
      { teks: "Who" },
      { teks: "Why" },
    ],
  },
  {
    subkategori: "Inggris - Sentence Completion",
    teks: "Complete the sentence: If it rains tomorrow, we ___ stay at home.",
    tingkat: "SEDANG",
    pembahasan:
      "Conditional type 1 (nyata di masa depan): if + present, will + verb. Maka 'will'.",
    opsi: [
      { teks: "will", benar: true },
      { teks: "would" },
      { teks: "were" },
      { teks: "had" },
      { teks: "are" },
    ],
  },

  // ====================== BAHASA ARAB (13) ======================
  {
    subkategori: "Arab - Mufrodat",
    teks: "Arti kata كِتَاب dalam bahasa Indonesia adalah ...",
    tingkat: "MUDAH",
    pembahasan: "كِتَاب (kitāb) berarti 'buku'.",
    opsi: [
      { teks: "Pena" },
      { teks: "Buku", benar: true },
      { teks: "Meja" },
      { teks: "Pintu" },
      { teks: "Rumah" },
    ],
  },
  {
    subkategori: "Arab - Mufrodat",
    teks: "Arti kata مَدْرَسَة dalam bahasa Indonesia adalah ...",
    tingkat: "MUDAH",
    pembahasan: "مَدْرَسَة (madrasah) berarti 'sekolah'.",
    opsi: [
      { teks: "Masjid" },
      { teks: "Sekolah", benar: true },
      { teks: "Pasar" },
      { teks: "Rumah sakit" },
      { teks: "Kantor" },
    ],
  },
  {
    subkategori: "Arab - Mufrodat",
    teks: "Arti kata طَالِب dalam bahasa Indonesia adalah ...",
    tingkat: "MUDAH",
    pembahasan: "طَالِب (ṭālib) berarti 'pelajar' atau 'siswa' (laki-laki).",
    opsi: [
      { teks: "Guru" },
      { teks: "Pelajar", benar: true },
      { teks: "Dokter" },
      { teks: "Pedagang" },
      { teks: "Petani" },
    ],
  },
  {
    subkategori: "Arab - Mufrodat",
    teks: "Arti kata قَلَم dalam bahasa Indonesia adalah ...",
    tingkat: "MUDAH",
    pembahasan: "قَلَم (qalam) berarti 'pena' atau 'pulpen'.",
    opsi: [
      { teks: "Buku" },
      { teks: "Pena", benar: true },
      { teks: "Tas" },
      { teks: "Papan tulis" },
      { teks: "Kursi" },
    ],
  },
  {
    subkategori: "Arab - Mufrodat",
    teks: "Kata 'rumah' dalam bahasa Arab adalah ...",
    tingkat: "MUDAH",
    pembahasan: "'Rumah' dalam bahasa Arab adalah بَيْت (bait).",
    opsi: [
      { teks: "سُوق" },
      { teks: "بَيْت", benar: true },
      { teks: "مَسْجِد" },
      { teks: "شَارِع" },
      { teks: "حَدِيقَة" },
    ],
  },
  {
    subkategori: "Arab - Dhomir",
    teks: "Kata ganti (dhamir) أَنَا berarti ...",
    tingkat: "MUDAH",
    pembahasan: "أَنَا (anā) berarti 'saya/aku'.",
    opsi: [
      { teks: "Kamu (lk)" },
      { teks: "Dia (lk)" },
      { teks: "Saya", benar: true },
      { teks: "Kami" },
      { teks: "Mereka" },
    ],
  },
  {
    subkategori: "Arab - Dhomir",
    teks: "Kata ganti (dhamir) هُوَ berarti ...",
    tingkat: "MUDAH",
    pembahasan: "هُوَ (huwa) berarti 'dia' (laki-laki tunggal).",
    opsi: [
      { teks: "Dia (perempuan)" },
      { teks: "Dia (laki-laki)", benar: true },
      { teks: "Kamu" },
      { teks: "Saya" },
      { teks: "Mereka" },
    ],
  },
  {
    subkategori: "Arab - Qawa'id",
    teks: "Kata يَكْتُبُ termasuk jenis kata ...",
    tingkat: "SEDANG",
    pembahasan:
      "يَكْتُبُ (yaktubu = sedang/akan menulis) adalah fi'il mudhari' (kata kerja bentuk sekarang/akan datang).",
    opsi: [
      { teks: "Isim (kata benda)" },
      { teks: "Fi'il (kata kerja)", benar: true },
      { teks: "Huruf (kata tugas)" },
      { teks: "Dhamir" },
      { teks: "Adad (bilangan)" },
    ],
  },
  {
    subkategori: "Arab - Qawa'id",
    teks: "Kalimat هَذَا بَيْتٌ merupakan contoh ...",
    tingkat: "SULIT",
    pembahasan:
      "هَذَا بَيْتٌ (ini rumah) diawali isim (kata benda/isim isyarah), sehingga tergolong jumlah ismiyyah (kalimat nominal).",
    opsi: [
      { teks: "Jumlah fi'liyyah" },
      { teks: "Jumlah ismiyyah", benar: true },
      { teks: "Huruf jar" },
      { teks: "Fi'il amr" },
      { teks: "Isim isyarah saja" },
    ],
  },
  {
    subkategori: "Arab - Adad",
    teks: "Bilangan ثَلاثَة dalam bahasa Indonesia adalah ...",
    tingkat: "MUDAH",
    pembahasan: "ثَلاثَة (tsalātsah) berarti 'tiga'.",
    opsi: [
      { teks: "Dua" },
      { teks: "Tiga", benar: true },
      { teks: "Empat" },
      { teks: "Lima" },
      { teks: "Sepuluh" },
    ],
  },
  {
    subkategori: "Arab - Mufrodat",
    teks: "Arti kata أُسْتَاذ dalam bahasa Indonesia adalah ...",
    tingkat: "MUDAH",
    pembahasan: "أُسْتَاذ (ustādz) berarti 'guru' (laki-laki).",
    opsi: [
      { teks: "Murid" },
      { teks: "Guru", benar: true },
      { teks: "Kepala sekolah" },
      { teks: "Penjaga" },
      { teks: "Tamu" },
    ],
  },
  {
    subkategori: "Arab - Qira'ah",
    teks:
      "Perhatikan kalimat: ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ. Arti kalimat tersebut adalah ...",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    pembahasan:
      "ذَهَبَ (telah pergi) الطَّالِبُ (siswa itu) إِلَى (ke) الْمَدْرَسَةِ (sekolah) = 'Siswa itu pergi ke sekolah.'",
    opsi: [
      { teks: "Siswa itu pergi ke sekolah", benar: true },
      { teks: "Guru itu masuk kelas" },
      { teks: "Siswa itu membaca buku" },
      { teks: "Ibu pergi ke pasar" },
      { teks: "Anak itu bermain bola" },
    ],
  },
  {
    subkategori: "Arab - Qira'ah",
    teks:
      "Perhatikan kalimat: الْقُرْآنُ كِتَابُ اللهِ. Arti kalimat tersebut adalah ...",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    pembahasan: "الْقُرْآنُ (Al-Qur'an) كِتَابُ اللهِ (kitab Allah) = 'Al-Qur'an adalah kitab Allah.'",
    opsi: [
      { teks: "Al-Qur'an adalah kitab Allah", benar: true },
      { teks: "Al-Qur'an diturunkan di Mekah" },
      { teks: "Membaca Al-Qur'an itu ibadah" },
      { teks: "Kitab itu milik guru" },
      { teks: "Allah menciptakan manusia" },
    ],
  },
];
