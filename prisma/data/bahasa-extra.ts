import type { SeedQuestion } from "./types";

// Tambahan bank soal Kebahasaan UM-PTKIN Literasi Membaca (ID/EN/AR).
export const bahasaExtraQuestions: SeedQuestion[] = [
  // ====================== BAHASA INDONESIA (20) ======================
  {
    subkategori: "Indonesia - Kata Baku",
    teks: "Penulisan kata baku yang benar menurut KBBI adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Bentuk baku adalah 'aktual' (bukan aktuil), 'kualitas' (bukan kwalitas), dan 'efektif' (bukan efektip). Jawaban yang baku: 'aktual'.",
    opsi: [
      { teks: "Aktuil" },
      { teks: "Kwalitas" },
      { teks: "Aktual", benar: true },
      { teks: "Efektip" },
      { teks: "Faktor" },
    ],
  },
  {
    subkategori: "Indonesia - Kata Baku",
    teks: "Kata berikut yang penulisannya tidak baku adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "'Frekuensi' adalah bentuk baku; bentuk tidak baku yang umum adalah 'frekwensi'. Jawaban benar: frekwensi.",
    opsi: [
      { teks: "Frekuensi" },
      { teks: "Frekwensi", benar: true },
      { teks: "Khusus" },
      { teks: "Praktik" },
      { teks: "Sistem" },
    ],
  },
  {
    subkategori: "Indonesia - Kata Baku",
    teks: "Pasangan kata baku dan tidak baku yang tepat adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Bentuk baku 'koordinasi' (bukan kordinasi), 'efektif' (bukan efektif), 'praktik' (bukan praktek). Pasangan tepat: koordinasi — kordinasi.",
    opsi: [
      { teks: "Praktek — praktik" },
      { teks: "Koordinasi — kordinasi", benar: true },
      { teks: "Resiko — risiko" },
      { teks: "Apotik — apotek" },
      { teks: "Analisa — analisis" },
    ],
  },
  {
    subkategori: "Indonesia - Ejaan",
    teks: "Penulisan kata 'di-' (awalan) dan 'di' (kata depan) yang benar terdapat pada kalimat ...",
    tingkat: "MUDAH",
    pembahasan:
      "Awalan pasif 'di-' ditulis serangkai (dibuat), sedangkan kata depan tempat 'di' ditulis terpisah (di rumah).",
    opsi: [
      { teks: "Kue itu di buat di rumah." },
      { teks: "Kue itu dibuat di rumah.", benar: true },
      { teks: "Kue itu dibuat dirumah." },
      { teks: "Kue itu di buat dirumah." },
      { teks: "Kue itu di-buat di-rumah." },
    ],
  },
  {
    subkategori: "Indonesia - Ejaan",
    teks: "Penggunaan huruf kapital yang tepat terdapat pada kalimat ...",
    tingkat: "SEDANG",
    pembahasan:
      "Nama diri (orang, tempat) dan nama hari ditulis dengan huruf kapital. 'Pak Budi tinggal di Yogyakarta sejak hari Rabu.' sudah tepat.",
    opsi: [
      { teks: "pak Budi tinggal di yogyakarta sejak hari rabu." },
      { teks: "Pak Budi tinggal di Yogyakarta sejak hari Rabu.", benar: true },
      { teks: "Pak budi tinggal di Yogyakarta sejak Hari Rabu." },
      { teks: "Pak Budi Tinggal Di Yogyakarta Sejak Hari Rabu." },
      { teks: "Pak Budi tinggal di Yogyakarta sejak hari rabu." },
    ],
  },
  {
    subkategori: "Indonesia - Ejaan",
    teks: "Penulisan kata serapan yang tidak tepat menurut PUEBI adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Kata serapan 'teknologi' mempertahankan huruf 'k' (bukan 'tecnologi'). 'Universitas', 'fotografi', dan 'hipotesis' sudah tepat.",
    opsi: [
      { teks: "Universitas" },
      { teks: "Fotografi" },
      { teks: "Hipotesis" },
      { teks: "Tecnologi", benar: true },
      { teks: "Teknologi" },
    ],
  },
  {
    subkategori: "Indonesia - Ide Pokok",
    teks:
      "Bacalah paragraf berikut. \"Membaca buku setiap hari dapat memperluas kosakata dan wawasan. Kebiasaan ini juga melatih kemampuan berpikir kritis. Oleh karena itu, perpustakaan sekolah perlu dimanfaatkan secara rutin.\" Ide pokok paragraf tersebut adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Seluruh kalimat berkaitan dengan manfaat membaca dan perlunya memanfaatkan perpustakaan. Ide pokok: membaca rutin bermanfaat dan perlu didukung.",
    opsi: [
      { teks: "Perpustakaan sekolah selalu ramai" },
      { teks: "Membaca rutin bermanfaat dan perlu didukung", benar: true },
      { teks: "Buku hanya untuk pelajar pintar" },
      { teks: "Guru wajib membaca setiap malam" },
      { teks: "Kosakata tidak penting dalam ujian" },
    ],
  },
  {
    subkategori: "Indonesia - Ide Pokok",
    teks:
      "\"Air bersih sangat penting bagi kesehatan. Banyak penyakit menular melalui air yang terkontaminasi. Pemerintah daerah terus memperluas jaringan pipa air minum agar masyarakat mendapat akses air layak konsumsi.\" Ide pokok paragraf tersebut adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Paragraf menekankan pentingnya air bersih dan upaya penyediaannya. Ide pokok: air bersih penting bagi kesehatan dan perlu dijamin ketersediaannya.",
    opsi: [
      { teks: "Pemerintah membangun jalan baru" },
      { teks: "Air bersih penting bagi kesehatan dan perlu dijamin", benar: true },
      { teks: "Penyakit hanya menyerang anak-anak" },
      { teks: "Air kotor lebih murah" },
      { teks: "Pipa air tidak perlu diperbaiki" },
    ],
  },
  {
    subkategori: "Indonesia - Ide Pokok",
    teks:
      "\"Energi terbarukan seperti surya dan angin semakin banyak dimanfaatkan. Sumber energi ini ramah lingkungan dan tidak habis. Negara-negara berkembang mulai beralih dari bahan bakar fosil untuk mengurangi polusi.\" Ide pokok paragraf tersebut adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Paragraf membahas keunggulan energi terbarukan dan tren peralihan dari fosil. Ide pokok: energi terbarukan semakin diminati karena ramah lingkungan.",
    opsi: [
      { teks: "Bahan bakar fosil lebih murah" },
      { teks: "Angin dan surya tidak bisa diandalkan" },
      { teks: "Energi terbarukan semakin diminati karena ramah lingkungan", benar: true },
      { teks: "Polusi tidak berpengaruh pada iklim" },
      { teks: "Negara maju menolak energi surya" },
    ],
  },
  {
    subkategori: "Indonesia - Simpulan",
    teks:
      "\"Budi selalu datang tepat waktu ke sekolah. Ia menyiapkan perlengkapan belajar sejak malam sebelumnya. Guru sering memuji ketekunannya.\" Simpulan yang tepat dari paragraf tersebut adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Paragraf menunjukkan kedisiplinan dan persiapan Budi. Simpulan: Budi adalah siswa yang disiplin dan rajin.",
    opsi: [
      { teks: "Budi sering terlambat" },
      { teks: "Budi adalah siswa yang disiplin dan rajin", benar: true },
      { teks: "Guru tidak pernah memuji siswa" },
      { teks: "Budi tidak suka belajar" },
      { teks: "Persiapan belajar tidak penting" },
    ],
  },
  {
    subkategori: "Indonesia - Simpulan",
    teks:
      "\"Tanaman padi membutuhkan air yang cukup selama fase pertumbuhan. Jika musim kemarau berlangsung lama, hasil panen bisa menurun drastis. Petani menerapkan sistem irigasi untuk mengantisipasi kekeringan.\" Simpulan yang tepat adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Paragraf menghubungkan kekeringan dengan penurunan panen dan solusi irigasi. Simpulan: ketersediaan air sangat menentukan hasil panen padi.",
    opsi: [
      { teks: "Padi tidak membutuhkan air" },
      { teks: "Musim kemarau selalu menguntungkan petani" },
      { teks: "Ketersediaan air sangat menentukan hasil panen padi", benar: true },
      { teks: "Irigasi tidak efektif" },
      { teks: "Petani tidak perlu mengantisipasi cuaca" },
    ],
  },
  {
    subkategori: "Indonesia - Simpulan",
    teks:
      "\"Program literasi digital diluncurkan di sekolah menengah. Siswa dilatih memilah informasi di internet dan menghindari hoaks. Setelah tiga bulan, survei menunjukkan peningkatan kemampuan verifikasi sumber.\" Simpulan yang tepat adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Program literasi digital menghasilkan peningkatan kemampuan verifikasi. Simpulan: pelatihan literasi digital efektif meningkatkan kemampuan siswa memilah informasi.",
    opsi: [
      { teks: "Hoaks tidak berbahaya bagi remaja" },
      { teks: "Internet tidak perlu digunakan di sekolah" },
      { teks: "Pelatihan literasi digital efektif meningkatkan kemampuan siswa memilah informasi", benar: true },
      { teks: "Siswa tidak bisa belajar dari internet" },
      { teks: "Survei tidak dapat dipercaya" },
    ],
  },
  {
    subkategori: "Indonesia - PUEBI",
    teks: "Penulisan kata depan 'ke' dan awalan 'ke-' yang benar terdapat pada kalimat ...",
    tingkat: "SEDANG",
    pembahasan:
      "Kata depan 'ke' (arah) ditulis terpisah: 'ke pasar'. Awalan 'ke-' pada kata kerja pasif ditulis serangkai: 'kepukul'. Kalimat benar: 'Anak itu kepukul bola ke arah gawang.'",
    opsi: [
      { teks: "Anak itu ke pukul bola ke arah gawang." },
      { teks: "Anak itu kepukul bola ke arah gawang.", benar: true },
      { teks: "Anak itu kepukul bola kearah gawang." },
      { teks: "Anak itu ke-pukul bola ke arah gawang." },
      { teks: "Anak itu ke pukul bola kearah gawang." },
    ],
  },
  {
    subkategori: "Indonesia - PUEBI",
    teks: "Penggunaan tanda baca yang tepat terdapat pada kalimat ...",
    tingkat: "SEDANG",
    pembahasan:
      "Tanda titik dua (:) dipakai sebelum perincian. 'Persiapan ujian meliputi: buku, alat tulis, dan kartu peserta.' sudah tepat.",
    opsi: [
      { teks: "Persiapan ujian meliputi buku, alat tulis, dan kartu peserta." },
      { teks: "Persiapan ujian meliputi: buku, alat tulis, dan kartu peserta.", benar: true },
      { teks: "Persiapan ujian meliputi; buku, alat tulis, dan kartu peserta." },
      { teks: "Persiapan ujian meliputi buku alat tulis dan kartu peserta." },
      { teks: "Persiapan ujian, meliputi buku, alat tulis, dan kartu peserta." },
    ],
  },
  {
    subkategori: "Indonesia - PUEBI",
    teks: "Penulisan kata hubung 'pun' yang tepat terdapat pada kalimat ...",
    tingkat: "SULIT",
    pembahasan:
      "Partikel 'pun' ditulis serangkai dengan kata yang di depannya jika bukan kata depan. 'Biarpun sulit, ia tetap berusaha.' sudah benar ('biarpun' = meskipun).",
    opsi: [
      { teks: "Biar pun sulit, ia tetap berusaha." },
      { teks: "Biarpun sulit, ia tetap berusaha.", benar: true },
      { teks: "Biar-pun sulit, ia tetap berusaha." },
      { teks: "Biar pun, sulit ia tetap berusaha." },
      { teks: "Biarpun, sulit ia tetap berusaha." },
    ],
  },
  {
    subkategori: "Indonesia - Konjungsi",
    teks: "Konjungsi yang tepat untuk melengkapi kalimat 'Ia belajar dengan giat ... lulus ujian.' adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Konjungsi 'agar' atau 'supaya' menyatakan tujuan. Kalimat lengkap: 'Ia belajar dengan giat agar lulus ujian.'",
    opsi: [
      { teks: "tetapi" },
      { teks: "agar", benar: true },
      { teks: "karena" },
      { teks: "namun" },
      { teks: "sementara" },
    ],
  },
  {
    subkategori: "Indonesia - Konjungsi",
    teks: "Konjungsi kausal yang tepat untuk kalimat 'Jalan licin ... hujan turun deras.' adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Konjungsi kausal menyatakan sebab. 'Karena' atau 'sebab' tepat: 'Jalan licin karena hujan turun deras.'",
    opsi: [
      { teks: "sehingga" },
      { teks: "karena", benar: true },
      { teks: "namun" },
      { teks: "atau" },
      { teks: "melainkan" },
    ],
  },
  {
    subkategori: "Indonesia - Konjungsi",
    teks: "Konjungsi yang tepat untuk menghubungkan kalimat 'Cuaca panas terik. Banyak warga memilih berolahraga di dalam ruangan.' adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Hubungan sebab-akibat antar kalimat membutuhkan konjungsi kausal/korelatif. 'Oleh karena cuaca panas terik, banyak warga memilih berolahraga di dalam ruangan.' → oleh karena itu / karena itu.",
    opsi: [
      { teks: "karena itu", benar: true },
      { teks: "meskipun" },
      { teks: "akan tetapi" },
      { teks: "bahkan" },
      { teks: "sedangkan" },
    ],
  },
  {
    subkategori: "Indonesia - Kalimat Efektif",
    teks: "Kalimat yang paling efektif adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Kalimat efektif tidak boros kata. 'Para atlet berlatih di stadion.' sudah efektif; opsi lain mengandung pemborosan (para atlet-atlet, saling ... bersama-sama).",
    opsi: [
      { teks: "Para atlet-atlet sedang saling berlatih bersama-sama di stadion." },
      { teks: "Para atlet berlatih di stadion.", benar: true },
      { teks: "Semua para atlet berlatih di dalam stadion." },
      { teks: "Para atlet saling berlatih satu sama lain di stadion." },
      { teks: "Para atlet sedang berlatih di dalam ruang stadion." },
    ],
  },
  {
    subkategori: "Indonesia - Kalimat Efektif",
    teks: "Kalimat yang tidak efektif karena pemborosan kata (pleonasme) adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "'Naik ke atas' mengandung pleonasme karena 'naik' sudah mengandung makna ke atas. Kalimat tidak efektif: 'Dia naik ke atas tangga.'",
    opsi: [
      { teks: "Dia membaca buku di perpustakaan." },
      { teks: "Dia naik ke atas tangga.", benar: true },
      { teks: "Ibu memasak di dapur." },
      { teks: "Siswa mengerjakan soal." },
      { teks: "Ayah pergi ke kantor." },
    ],
  },

  // ====================== BAHASA INGGRIS (20) ======================
  {
    subkategori: "Inggris - Grammar",
    teks: "Choose the correct answer: My brother ___ a doctor since 2020.",
    tingkat: "SEDANG",
    pembahasan:
      "Present perfect ('has been') dipakai untuk keadaan yang dimulai di masa lalu dan masih berlanjut. 'My brother has been a doctor since 2020.'",
    opsi: [
      { teks: "is" },
      { teks: "was" },
      { teks: "has been", benar: true },
      { teks: "had been" },
      { teks: "will be" },
    ],
  },
  {
    subkategori: "Inggris - Grammar",
    teks: "Choose the correct answer: By the time we arrived, the movie ___ already started.",
    tingkat: "SULIT",
    pembahasan:
      "Past perfect ('had started') untuk aksi yang selesai sebelum aksi lain di masa lampau (we arrived).",
    opsi: [
      { teks: "has" },
      { teks: "had", benar: true },
      { teks: "was" },
      { teks: "is" },
      { teks: "have" },
    ],
  },
  {
    subkategori: "Inggris - Grammar",
    teks: "Choose the correct answer: Neither the teacher nor the students ___ present yesterday.",
    tingkat: "SEDANG",
    pembahasan:
      "Dengan 'neither...nor', kata kerja mengikuti subjek terdekat (students = plural), maka 'were'.",
    opsi: [
      { teks: "was" },
      { teks: "were", benar: true },
      { teks: "is" },
      { teks: "has been" },
      { teks: "are" },
    ],
  },
  {
    subkategori: "Inggris - Grammar",
    teks: "Choose the correct answer: The report ___ by the committee last week.",
    tingkat: "SEDANG",
    pembahasan:
      "Passive voice past simple: was/were + past participle. 'The report was reviewed by the committee last week.'",
    opsi: [
      { teks: "reviewed" },
      { teks: "was reviewed", benar: true },
      { teks: "is reviewing" },
      { teks: "has review" },
      { teks: "was reviewing" },
    ],
  },
  {
    subkategori: "Inggris - Grammar",
    teks: "Choose the correct answer: If I ___ enough money, I would buy a new laptop.",
    tingkat: "SEDANG",
    pembahasan:
      "Conditional type 2 (hipotesis tidak nyata): If + past simple, would + verb. 'If I had enough money...'",
    opsi: [
      { teks: "have" },
      { teks: "had", benar: true },
      { teks: "has" },
      { teks: "will have" },
      { teks: "would have" },
    ],
  },
  {
    subkategori: "Inggris - Grammar",
    teks: "Choose the correct answer: She asked me where I ___ the day before.",
    tingkat: "SULIT",
    pembahasan:
      "Reported speech: present simple → past simple, 'yesterday' → 'the day before'. 'Where I lived the day before.'",
    opsi: [
      { teks: "live" },
      { teks: "lived", benar: true },
      { teks: "am living" },
      { teks: "will live" },
      { teks: "have lived" },
    ],
  },
  {
    subkategori: "Inggris - Grammar",
    teks: "Choose the correct answer: The students are looking forward to ___ the museum.",
    tingkat: "MUDAH",
    pembahasan:
      "'Look forward to' diikuti gerund (V-ing), bukan infinitive. 'Looking forward to visiting the museum.'",
    opsi: [
      { teks: "visit" },
      { teks: "visiting", benar: true },
      { teks: "visited" },
      { teks: "visits" },
      { teks: "to visit" },
    ],
  },
  {
    subkategori: "Inggris - Vocabulary",
    teks: "The word 'abundant' in 'The region has abundant natural resources' means ...",
    tingkat: "MUDAH",
    pembahasan: "'Abundant' berarti berlimpah atau melimpah (plentiful).",
    opsi: [
      { teks: "scarce" },
      { teks: "plentiful", benar: true },
      { teks: "dangerous" },
      { teks: "hidden" },
      { teks: "expensive" },
    ],
  },
  {
    subkategori: "Inggris - Vocabulary",
    teks: "The antonym of 'generous' is ...",
    tingkat: "MUDAH",
    pembahasan: "'Generous' (dermawan) lawan katanya adalah 'stingy' (kikir/pelit).",
    opsi: [
      { teks: "kind" },
      { teks: "stingy", benar: true },
      { teks: "brave" },
      { teks: "honest" },
      { teks: "polite" },
    ],
  },
  {
    subkategori: "Inggris - Vocabulary",
    teks: "Choose the word that best completes the sentence: The scientist made an important ___ about climate change.",
    tingkat: "SEDANG",
    pembahasan:
      "'Discovery' (penemuan) paling sesuai konteks ilmuwan dan perubahan iklim. 'Decision' = keputusan, 'discussion' = diskusi.",
    opsi: [
      { teks: "decision" },
      { teks: "discovery", benar: true },
      { teks: "discussion" },
      { teks: "direction" },
      { teks: "division" },
    ],
  },
  {
    subkategori: "Inggris - Vocabulary",
    teks: "The phrase 'take for granted' means ...",
    tingkat: "SEDANG",
    pembahasan:
      "'Take for granted' berarti menganggap remeh atau tidak menghargai sesuatu yang sebenarnya berharga.",
    opsi: [
      { teks: "to appreciate fully" },
      { teks: "to fail to appreciate", benar: true },
      { teks: "to give permission" },
      { teks: "to ask politely" },
      { teks: "to return something" },
    ],
  },
  {
    subkategori: "Inggris - Vocabulary",
    teks: "Choose the correct collocation: She ___ a mistake in her calculation.",
    tingkat: "SEDANG",
    pembahasan:
      "Kolokasi yang benar dalam bahasa Inggris: 'make a mistake' (bukan do/create a mistake).",
    opsi: [
      { teks: "did" },
      { teks: "made", benar: true },
      { teks: "took" },
      { teks: "had" },
      { teks: "gave" },
    ],
  },
  {
    subkategori: "Inggris - Vocabulary",
    teks: "The word 'meticulous' describes someone who is ...",
    tingkat: "SULIT",
    pembahasan:
      "'Meticulous' berarti sangat teliti dan cermat dalam detail (very careful and precise).",
    opsi: [
      { teks: "careless" },
      { teks: "very careful and precise", benar: true },
      { teks: "extremely lazy" },
      { teks: "easily angered" },
      { teks: "very talkative" },
    ],
  },
  {
    subkategori: "Inggris - Vocabulary",
    teks: "Choose the synonym of 'endeavor':",
    tingkat: "SEDANG",
    pembahasan: "'Endeavor' (usaha/berusaha) bersinonim dengan 'effort' (usaha).",
    opsi: [
      { teks: "failure" },
      { teks: "effort", benar: true },
      { teks: "rest" },
      { teks: "luck" },
      { teks: "delay" },
    ],
  },
  {
    subkategori: "Inggris - Reading",
    teks:
      "Read: \"The library opens at eight in the morning and closes at five in the afternoon. Students may borrow up to three books for two weeks.\" How long can students keep borrowed books?",
    tingkat: "MUDAH",
    pembahasan:
      "Teks menyatakan siswa dapat meminjam hingga tiga buku selama dua minggu (two weeks).",
    opsi: [
      { teks: "One week" },
      { teks: "Two weeks", benar: true },
      { teks: "Three days" },
      { teks: "One month" },
      { teks: "Until closing time" },
    ],
  },
  {
    subkategori: "Inggris - Reading",
    teks:
      "Read: \"Ahmad enjoys playing football after school. On weekends, he prefers reading history books at home. His sister, Siti, loves painting and often visits art galleries.\" What does Siti enjoy doing?",
    tingkat: "MUDAH",
    pembahasan:
      "Teks menyebut Siti suka melukis (loves painting) dan sering mengunjungi galeri seni.",
    opsi: [
      { teks: "Playing football" },
      { teks: "Reading history books" },
      { teks: "Painting", benar: true },
      { teks: "Visiting the library" },
      { teks: "Cooking at home" },
    ],
  },
  {
    subkategori: "Inggris - Reading",
    teks:
      "Read: \"Recycling paper reduces the need to cut down trees. It also saves energy compared to producing new paper from raw materials. Many schools now have separate bins for paper waste.\" What is the main benefit of recycling paper mentioned in the text?",
    tingkat: "SEDANG",
    pembahasan:
      "Teks menyebut daur ulang kertas mengurangi kebutuhan menebang pohon dan menghemat energi. Manfaat utama yang disebut: mengurangi penebangan pohon.",
    opsi: [
      { teks: "It makes paper cheaper" },
      { teks: "It reduces the need to cut down trees", benar: true },
      { teks: "It eliminates all waste" },
      { teks: "It replaces the need for schools" },
      { teks: "It increases paper production" },
    ],
  },
  {
    subkategori: "Inggris - Reading",
    teks:
      "Read: \"The train to Jakarta departs at 9:15 a.m. Passengers are advised to arrive at least thirty minutes early for ticket checking. Platform 3 is designated for this service.\" When should passengers arrive at the station?",
    tingkat: "SEDANG",
    pembahasan:
      "Penumpang disarankan tiba minimal tiga puluh menit sebelum keberangkatan (9:15). Jadi sekitar pukul 8:45.",
    opsi: [
      { teks: "At 9:15 a.m." },
      { teks: "At least thirty minutes before departure", benar: true },
      { teks: "After the train leaves" },
      { teks: "Only when Platform 3 is empty" },
      { teks: "One hour after departure" },
    ],
  },
  {
    subkategori: "Inggris - Reading",
    teks:
      "Read: \"Although the village is small, it has a well-equipped health center. Residents no longer need to travel far for basic medical care. The center also provides health education programs for families.\" Why is the health center important for the villagers?",
    tingkat: "SEDANG",
    pembahasan:
      "Puskesmas memungkinkan warga mendapat perawatan dasar tanpa harus jauh-jauh. Penting karena menyediakan layanan kesehatan dasar di dekat rumah.",
    opsi: [
      { teks: "It replaces the need for doctors" },
      { teks: "It provides basic medical care nearby", benar: true },
      { teks: "It is only for tourists" },
      { teks: "It sells medicine at high prices" },
      { teks: "It closes during weekends" },
    ],
  },
  {
    subkategori: "Inggris - Reading",
    teks:
      "Read: \"Scientists observed that bees play a vital role in pollinating crops. Without bees, many fruit and vegetable harvests would decline significantly. Protecting bee habitats is therefore essential for food security.\" What would happen without bees according to the text?",
    tingkat: "SULIT",
    pembahasan:
      "Teks menyatakan tanpa lebah, hasil panen buah dan sayur akan menurun drastis (decline significantly).",
    opsi: [
      { teks: "Crops would grow faster" },
      { teks: "Harvests of fruits and vegetables would decline", benar: true },
      { teks: "Food security would improve" },
      { teks: "Bees would find new habitats" },
      { teks: "Pollination would not be needed" },
    ],
  },

  // ====================== BAHASA ARAB (20) ======================
  {
    subkategori: "Arab - Mufrodat",
    teks: "Arti kata مِفْتَاح dalam bahasa Indonesia adalah ...",
    arahTeks: "RTL",
    tingkat: "MUDAH",
    pembahasan: "مِفْتَاح (miftāḥ) berarti 'kunci'.",
    opsi: [
      { teks: "Pintu" },
      { teks: "Kunci", benar: true },
      { teks: "Jendela" },
      { teks: "Meja" },
      { teks: "Kursi" },
    ],
  },
  {
    subkategori: "Arab - Mufrodat",
    teks: "Arti kata مَاء dalam bahasa Indonesia adalah ...",
    arahTeks: "RTL",
    tingkat: "MUDAH",
    pembahasan: "مَاء (mā') berarti 'air'.",
    opsi: [
      { teks: "Api" },
      { teks: "Air", benar: true },
      { teks: "Tanah" },
      { teks: "Angin" },
      { teks: "Cahaya" },
    ],
  },
  {
    subkategori: "Arab - Mufrodat",
    teks: "Arti kata مَدِينَة dalam bahasa Indonesia adalah ...",
    arahTeks: "RTL",
    tingkat: "MUDAH",
    pembahasan: "مَدِينَة (madīnah) berarti 'kota'.",
    opsi: [
      { teks: "Desa" },
      { teks: "Kota", benar: true },
      { teks: "Negara" },
      { teks: "Jalan" },
      { teks: "Pulau" },
    ],
  },
  {
    subkategori: "Arab - Mufrodat",
    teks: "Kata 'guru (perempuan)' dalam bahasa Arab adalah ...",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    pembahasan: "Guru perempuan dalam bahasa Arab adalah مُعَلِّمَة (mu'allimah).",
    opsi: [
      { teks: "مُعَلِّمَة", benar: true },
      { teks: "طَالِبَة" },
      { teks: "أُمّ" },
      { teks: "أُخْت" },
      { teks: "بِنْت" },
    ],
  },
  {
    subkategori: "Arab - Mufrodat",
    teks: "Arti kata صَدِيق dalam bahasa Indonesia adalah ...",
    arahTeks: "RTL",
    tingkat: "MUDAH",
    pembahasan: "صَدِيق (ṣadīq) berarti 'teman' (laki-laki).",
    opsi: [
      { teks: "Musuh" },
      { teks: "Teman", benar: true },
      { teks: "Guru" },
      { teks: "Saudara" },
      { teks: "Tetangga" },
    ],
  },
  {
    subkategori: "Arab - Mufrodat",
    teks: "Kata 'masjid' dalam bahasa Arab adalah ...",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    pembahasan: "'Masjid' dalam bahasa Arab adalah مَسْجِد (masjid).",
    opsi: [
      { teks: "مَدْرَسَة" },
      { teks: "مَسْجِد", benar: true },
      { teks: "سُوق" },
      { teks: "كَنِيسَة" },
      { teks: "بَيْت" },
    ],
  },
  {
    subkategori: "Arab - Nahwu",
    teks: "Kata الْكِتَابُ dalam kalimat الْكِتَابُ مُفِيدٌ berfungsi sebagai ...",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    pembahasan:
      "Dalam jumlah ismiyyah الْكِتَابُ (al-kitābu) berfungsi sebagai mubtada' (subjek/topik).",
    opsi: [
      { teks: "Fi'il (kata kerja)" },
      { teks: "Mubtada' (subjek)", benar: true },
      { teks: "Khabar (predikat)" },
      { teks: "Maf'ul bih" },
      { teks: "Jar majrur" },
    ],
  },
  {
    subkategori: "Arab - Nahwu",
    teks: "Kalimat ذَهَبَ الْوَلَدُ إِلَى الْمَدْرَسَةِ termasuk jenis ...",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    pembahasan:
      "Kalimat diawali fi'il (ذَهَبَ), sehingga tergolong jumlah fi'liyyah (kalimat verbal).",
    opsi: [
      { teks: "Jumlah ismiyyah" },
      { teks: "Jumlah fi'liyyah", benar: true },
      { teks: "Jumlah shibh jumlah" },
      { teks: "Isim isyarah saja" },
      { teks: "Fi'il amr saja" },
    ],
  },
  {
    subkategori: "Arab - Nahwu",
    teks: "Kata إِلَى dalam kalimat ذَهَبَ إِلَى الْمَسْجِدِ termasuk ...",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    pembahasan:
      "إِلَى (ilā) adalah huruf jar (preposisi) yang memajrurkan kata setelahnya (الْمَسْجِدِ).",
    opsi: [
      { teks: "Fi'il madhi" },
      { teks: "Huruf jar", benar: true },
      { teks: "Isim isyarah" },
      { teks: "Dhamir muttasil" },
      { teks: "Adad" },
    ],
  },
  {
    subkategori: "Arab - Nahwu",
    teks: "Kata الْمُعَلِّمُ dalam kalimat جَاءَ الْمُعَلِّمُ berfungsi sebagai ...",
    arahTeks: "RTL",
    tingkat: "SULIT",
    pembahasan:
      "Dalam jumlah fi'liyyah, kata setelah fi'il yang menjadi subjek disebut fa'il. الْمُعَلِّمُ adalah fa'il (pelaku).",
    opsi: [
      { teks: "Maf'ul bih (objek)" },
      { teks: "Fa'il (subjek/pelaku)", benar: true },
      { teks: "Mubtada'" },
      { teks: "Khabar" },
      { teks: "Huruf jar" },
    ],
  },
  {
    subkategori: "Arab - Nahwu",
    teks: "Bentuk الْمَدْرَسَةِ (dengan kasrah di akhir) menunjukkan kata tersebut dalam keadaan ...",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    pembahasan:
      "Kasrah di akhir isim mu'rab menunjukkan i'rab majrur (biasanya setelah huruf jar atau sebagai mudhaf ilaih).",
    opsi: [
      { teks: "Marfu' (nominatif)" },
      { teks: "Majrur (genitif)", benar: true },
      { teks: "Manshub (akusatif)" },
      { teks: "Jazm (diam)" },
      { teks: "Sukun tetap" },
    ],
  },
  {
    subkategori: "Arab - Nahwu",
    teks: "Kalimat هٰذَا بَيْتٌ جَمِيلٌ merupakan contoh ...",
    arahTeks: "RTL",
    tingkat: "MUDAH",
    pembahasan:
      "Kalimat diawali isim isyarah (هٰذَا), bukan fi'il, sehingga tergolong jumlah ismiyyah.",
    opsi: [
      { teks: "Jumlah fi'liyyah" },
      { teks: "Jumlah ismiyyah", benar: true },
      { teks: "Fi'il amr" },
      { teks: "Jumlah inna" },
      { teks: "Maf'ul mutlaq" },
    ],
  },
  {
    subkategori: "Arab - Nahwu",
    teks: "Kata يَقْرَأُ dalam kalimat الطَّالِبُ يَقْرَأُ الْقُرْآنَ adalah ...",
    arahTeks: "RTL",
    tingkat: "SULIT",
    pembahasan:
      "يَقْرَأُ (yaqra'u = membaca) adalah fi'il mudhari' (kata kerja sekarang/akan datang).",
    opsi: [
      { teks: "Fi'il madhi" },
      { teks: "Fi'il mudhari'", benar: true },
      { teks: "Fi'il amr" },
      { teks: "Isim fa'il" },
      { teks: "Masdar" },
    ],
  },
  {
    subkategori: "Arab - Sharaf",
    teks: "Bentuk jamak dari كِتَابٌ (buku) adalah ...",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    pembahasan:
      "Jamak mudhakkar salim dari كِتَابٌ adalah كُتُبٌ (kutub) dengan pola فُعُل.",
    opsi: [
      { teks: "كُتُبٌ", benar: true },
      { teks: "كِتَابَاتٌ" },
      { teks: "كُتُبَانِ" },
      { teks: "كِتَابَيْنِ" },
      { teks: "كُتُبَةٌ" },
    ],
  },
  {
    subkategori: "Arab - Sharaf",
    teks: "Bentuk jamak dari طَالِبٌ (pelajar) adalah ...",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    pembahasan:
      "Jamak mudhakkar salim dari طَالِبٌ adalah طُلَّابٌ (ṭullāb) dengan pola فُعَّال.",
    opsi: [
      { teks: "طُلَّابٌ", benar: true },
      { teks: "طَالِبَاتٌ" },
      { teks: "طَالِبُونَ" },
      { teks: "طَالِبَانِ" },
      { teks: "أَطْلُبُ" },
    ],
  },
  {
    subkategori: "Arab - Sharaf",
    teks: "Bentuk jamak muannats dari مُعَلِّمَةٌ (guru perempuan) adalah ...",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    pembahasan:
      "Jamak muannats salim dari مُعَلِّمَةٌ adalah مُعَلِّمَاتٌ (mu'allimāt) dengan akhiran -āt.",
    opsi: [
      { teks: "مُعَلِّمَاتٌ", benar: true },
      { teks: "مُعَلِّمُونَ" },
      { teks: "مُعَلِّمَانِ" },
      { teks: "مُعَلِّمِينَ" },
      { teks: "مُعَلِّمَةَانِ" },
    ],
  },
  {
    subkategori: "Arab - Sharaf",
    teks: "Makna perubahan pada kata كَتَبَ → يَكْتُبُ adalah perubahan dari bentuk ...",
    arahTeks: "RTL",
    tingkat: "SULIT",
    pembahasan:
      "كَتَبَ (kataba = menulis, lampau) berubah menjadi يَكْتُبُ (yaktubu = menulis, sekarang/mudhari'). Ini perubahan fi'il madhi ke fi'il mudhari'.",
    opsi: [
      { teks: "Isim ke fi'il" },
      { teks: "Fi'il madhi ke fi'il mudhari'", benar: true },
      { teks: "Tunggal ke jamak" },
      { teks: "Mudzakkar ke muannats" },
      { teks: "Marfu' ke majrur" },
    ],
  },
  {
    subkategori: "Arab - Sharaf",
    teks: "Kata عَلِيمٌ (maha mengetahui) berasal dari akar kata ...",
    arahTeks: "RTL",
    tingkat: "SEDANG",
    pembahasan:
      "عَلِيمٌ berasal dari akar ع-ل-م yang berkaitan dengan 'ilmu' (mengetahui).",
    opsi: [
      { teks: "ك-ت-ب" },
      { teks: "ع-ل-م", benar: true },
      { teks: "ق-ر-أ" },
      { teks: "د-ر-س" },
      { teks: "س-ل-م" },
    ],
  },
  {
    subkategori: "Arab - Sharaf",
    teks: "Bentuk fi'il amr (perintah) dari كَتَبَ untuk 'kamu (lk) tulis!' adalah ...",
    arahTeks: "RTL",
    tingkat: "SULIT",
    pembahasan:
      "Fi'il amr dari كَتَبَ (kataba) untuk orang kedua tunggal laki-laki adalah اُكْتُبْ (uktub!).",
    opsi: [
      { teks: "اُكْتُبْ", benar: true },
      { teks: "يَكْتُبْ" },
      { teks: "كَتَبَ" },
      { teks: "كَاتِبٌ" },
      { teks: "مَكْتُوبٌ" },
    ],
  },
  {
    subkategori: "Arab - Sharaf",
    teks: "Bentuk muannats (perempuan) dari كَبِيرٌ (besar) adalah ...",
    arahTeks: "RTL",
    tingkat: "MUDAH",
    pembahasan:
      "Bentuk muannats dari كَبِيرٌ adalah كَبِيرَةٌ (kabīratun) dengan tambahan ta' marbuta.",
    opsi: [
      { teks: "كَبِيرَةٌ", benar: true },
      { teks: "كَبَائِرُ" },
      { teks: "كُبْرَى" },
      { teks: "أَكْبَرُ" },
      { teks: "كَبِيرَاتٌ" },
    ],
  },
];
