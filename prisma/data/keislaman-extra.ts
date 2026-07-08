import type { SeedQuestion } from "./types";

// Keislaman tambahan: Al-Qur'an & Hadis, Fikih, Akidah-Akhlak, dan SKI.
// Mengacu Literasi Ajaran Islam UM-PTKIN; materi Ahlus Sunnah wal Jamaah.
export const keislamanExtraQuestions: SeedQuestion[] = [
  // ====================== AL-QUR'AN & HADIS (18) ======================
  {
    subkategori: "Quran-Hadis",
    teks: "Surah terpendek dalam Al-Qur'an menurut jumlah ayat adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Surah Al-Kawthar terdiri atas 3 ayat dan merupakan surah terpendek dalam mushaf Al-Qur'an.",
    opsi: [
      { teks: "Al-Ikhlas" },
      { teks: "An-Nas" },
      { teks: "Al-Kawthar", benar: true },
      { teks: "Al-'Asr" },
      { teks: "Al-Fil" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Secara bahasa, kata 'Al-Qur'an' berarti ...",
    tingkat: "MUDAH",
    pembahasan:
      "Al-Qur'an berasal dari kata qara'a yang berarti 'membaca'; sehingga Al-Qur'an berarti bacaan.",
    opsi: [
      { teks: "Kitab" },
      { teks: "Wahyu" },
      { teks: "Bacaan", benar: true },
      { teks: "Hukum" },
      { teks: "Kisah" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Surah yang dijuluki Ummul Kitab (induk kitab) adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Al-Fatihah disebut Ummul Kitab karena memuat inti pokok ajaran Al-Qur'an dan dibaca dalam setiap rakaat salat.",
    opsi: [
      { teks: "Al-Baqarah" },
      { teks: "Al-Fatihah", benar: true },
      { teks: "Yasin" },
      { teks: "Al-Mulk" },
      { teks: "Al-Ikhlas" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Surah yang memuat basmalah di tengah-tengah (bukan di awal) adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Surah An-Naml ayat 30 memuat basmalah di tengah surah, selain basmalah di awal surah-surah lain.",
    opsi: [
      { teks: "At-Taubah" },
      { teks: "An-Naml", benar: true },
      { teks: "Ar-Rahman" },
      { teks: "Al-Ahzab" },
      { teks: "Al-Hujurat" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Hadis yang sanad dan matannya diketahui palsu lalu disusun sengaja disebut hadis ...",
    tingkat: "SEDANG",
    pembahasan:
      "Hadis maudhu' adalah hadis yang dibuat-buat; hukumnya haram diriwayatkan kecuali dengan penjelasan kepalsuannya.",
    opsi: [
      { teks: "Maqbul" },
      { teks: "Maudhu'", benar: true },
      { teks: "Hasan" },
      { teks: "Sahih" },
      { teks: "Marfu'" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Hadis yang sanadnya bersambung sampai kepada Nabi Muhammad SAW disebut hadis ...",
    tingkat: "SEDANG",
    pembahasan:
      "Hadis marfu' ialah hadis yang diriwayatkan langsung dari Nabi, baik berupa perkataan, perbuatan, maupun persetujuan beliau.",
    opsi: [
      { teks: "Mauquf" },
      { teks: "Maqtu'" },
      { teks: "Marfu'", benar: true },
      { teks: "Mursal" },
      { teks: "Mudraj" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Juz ke-30 dalam Al-Qur'an yang banyak surah pendeknya populer dihafalkan anak-anak disebut ...",
    tingkat: "MUDAH",
    pembahasan:
      "Juz ke-30 disebut Juz 'Amma karena surah pertamanya adalah QS Al-'Alaq yang dimulai dengan kata 'Iqra'.",
    opsi: [
      { teks: "Juz Tabarak" },
      { teks: "Juz 'Amma", benar: true },
      { teks: "Juz Qad Sami'" },
      { teks: "Juz Wa Man Yatawalla" },
      { teks: "Juz Alif Lam Mim" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Ketetapan Nabi yang ditunjukkan dengan diamnya beliau terhadap perbuatan sahabat termasuk jenis hadis ...",
    tingkat: "SEDANG",
    pembahasan:
      "Hadis taqriri adalah persetujuan Nabi yang ditunjukkan dengan mengizinkan atau tidak mencela perbuatan sahabat.",
    opsi: [
      { teks: "Qauli" },
      { teks: "Fi'li" },
      { teks: "Taqriri", benar: true },
      { teks: "Qudsi" },
      { teks: "Mauquf" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Kitab hadis yang disusun oleh Imam Bukhari dan menjadi rujukan utama umat Islam adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Shahih Bukhari karya Imam Muhammad bin Ismail al-Bukhari termasuk kitab hadis paling otentik setelah Al-Qur'an.",
    opsi: [
      { teks: "Shahih Muslim" },
      { teks: "Shahih Bukhari", benar: true },
      { teks: "Sunan Abu Dawud" },
      { teks: "Sunan At-Tirmidzi" },
      { teks: "Muwatta' Malik" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Hadis yang lafalnya dari Nabi tetapi maknanya dari Allah disebut ...",
    tingkat: "SEDANG",
    pembahasan:
      "Hadis qudsi adalah sabda Nabi yang maknanya dari Allah; berbeda dari Al-Qur'an karena bukan diturunkan secara mutawatir dan boleh diriwayatkan dengan makna.",
    opsi: [
      { teks: "Hadis mauquf" },
      { teks: "Hadis qudsi", benar: true },
      { teks: "Hadis mursal" },
      { teks: "Hadis maudhu'" },
      { teks: "Hadis maqtu'" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Surah yang dijuluki 'Qalbul Qur'an' (hati Al-Qur'an) adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Surah Yasin dinamai hati Al-Qur'an karena memuat pokok-pokok inti pesan Al-Qur'an tentang kekuasaan Allah dan hari akhir.",
    opsi: [
      { teks: "Al-Mulk" },
      { teks: "Ar-Rahman" },
      { teks: "Yasin", benar: true },
      { teks: "Al-Waqi'ah" },
      { teks: "Al-Kahfi" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Ayat-ayat Al-Qur'an yang berisi hukum-hukum fikih secara khusus disebut ...",
    tingkat: "SULIT",
    pembahasan:
      "Ayat al-ahkam adalah ayat-ayat yang mengandung ketentuan hukum syara' secara langsung, misalnya tentang salat, puasa, dan muamalah.",
    opsi: [
      { teks: "Ayat bayaniyah" },
      { teks: "Ayat al-ahkam", benar: true },
      { teks: "Ayat mutashabihat" },
      { teks: "Ayat qisasiyah" },
      { teks: "Ayat muhkamat saja" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Penyusunan Al-Qur'an menjadi satu mushaf (kompilasi) pertama kali dilakukan pada masa ...",
    tingkat: "SEDANG",
    pembahasan:
      "Pada masa khalifah Abu Bakar Ash-Shiddiq, atas dorongan Umar, Al-Qur'an dikumpulkan menjadi satu mushaf setelah banyak hafidz syahid.",
    opsi: [
      { teks: "Nabi Muhammad SAW" },
      { teks: "Abu Bakar Ash-Shiddiq", benar: true },
      { teks: "Umar bin Khattab" },
      { teks: "Usman bin Affan" },
      { teks: "Ali bin Abi Thalib" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Surah yang diturunkan sebelum hijrah dan umumnya membahas akidah serta kisah umat terdahulu termasuk golongan surah ...",
    tingkat: "SULIT",
    pembahasan:
      "Surah Makkiyah diturunkan di Mekah sebelum hijrah; ciri khasnya membahas tauhid, hari akhir, dan kisah nabi-nabi terdahulu.",
    opsi: [
      { teks: "Madaniyah" },
      { teks: "Makkiyah", benar: true },
      { teks: "Qunutiyah" },
      { teks: "Makkiyah-Madaniyah" },
      { teks: "Nasikhah semua" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Jumlah surah dalam Al-Qur'an yang diawali dengan huruf muqaththa'ah (huruf terputus) adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Ada 29 surah yang dimulai dengan huruf muqaththa'ah, seperti Alif Lam Mim, Ya Sin, dan Ha Mim.",
    opsi: [
      { teks: "14" },
      { teks: "19" },
      { teks: "29", benar: true },
      { teks: "30" },
      { teks: "114" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Pemeliharaan Al-Qur'an dari perubahan dan penyimpangan hingga kini disebut dalam ilmu Al-Qur'an sebagai ...",
    tingkat: "SEDANG",
    pembahasan:
      "Al-Qur'an dijaga keotentikannya melalui transmisi mutawatir, baik secara lisan (hafalan) maupun tulisan (mushaf).",
    opsi: [
      { teks: "I'jaz" },
      { teks: "Tawatur", benar: true },
      { teks: "Asbabun nuzul" },
      { teks: "Naskh" },
      { teks: "Qira'at syadz" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Hadis yang diriwayatkan dari sahabat dan berhenti pada tingkat sahabat (bukan sampai Nabi) disebut hadis ...",
    tingkat: "SEDANG",
    pembahasan:
      "Hadis mauquf ialah hadis yang lafalnya dari sahabat, bukan langsung dari Nabi Muhammad SAW.",
    opsi: [
      { teks: "Marfu'" },
      { teks: "Mauquf", benar: true },
      { teks: "Mursal" },
      { teks: "Qudsi" },
      { teks: "Sahih lafzhiyah" },
    ],
  },
  {
    subkategori: "Quran-Hadis",
    teks: "Standarisasi mushaf Al-Qur'an (penyalinan resmi ke seluruh wilayah Islam) dilakukan pada masa khalifah ...",
    tingkat: "SULIT",
    pembahasan:
      "Khalifah Usman bin Affan menstandarkan mushaf Al-Qur'an dan menyebarkannya ke berbagai daerah untuk mencegah perbedaan bacaan.",
    opsi: [
      { teks: "Abu Bakar Ash-Shiddiq" },
      { teks: "Umar bin Khattab" },
      { teks: "Usman bin Affan", benar: true },
      { teks: "Ali bin Abi Thalib" },
      { teks: "Muawiyah bin Abi Sufyan" },
    ],
  },

  // ====================== FIKIH (22) ======================
  {
    subkategori: "Fikih",
    teks: "Salat Jumat pada hari Jumat menggantikan salat ...",
    tingkat: "MUDAH",
    pembahasan:
      "Salat Jumat wajib bagi laki-laki muslim dan menggantikan salat fardu Zuhur pada hari Jumat.",
    opsi: [
      { teks: "Subuh" },
      { teks: "Zuhur", benar: true },
      { teks: "Asar" },
      { teks: "Magrib" },
      { teks: "Isya" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Rukun salat yang pertama adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Rukun salat ada 13; yang pertama adalah niat (niyyah) di dalam hati pada waktu salat dimulai.",
    opsi: [
      { teks: "Takbiratul ihram" },
      { teks: "Niat", benar: true },
      { teks: "Berdiri tegak" },
      { teks: "Membaca Al-Fatihah" },
      { teks: "Rukuk" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Bersuci dengan tanah suci apabila tidak memperoleh air untuk wudu atau ghusl disebut ...",
    tingkat: "MUDAH",
    pembahasan:
      "Tayamum adalah bersuci dengan debu/tanah suci yang ditepuk ke wajah dan tangan, apabila air tidak tersedia atau penggunaannya membahayakan.",
    opsi: [
      { teks: "Istinja" },
      { teks: "Tayamum", benar: true },
      { teks: "Wudu" },
      { teks: "Ghusl" },
      { teks: "Istibra" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Hadas yang membatalkan wudu dan mensyaratkan ghusl agar boleh salat disebut hadas ...",
    tingkat: "SEDANG",
    pembahasan:
      "Hadas besar (janabah, haid, nifas) mensyaratkan ghusl; hadas kecil mensyaratkan wudu.",
    opsi: [
      { teks: "Kecil" },
      { teks: "Besar", benar: true },
      { teks: "Ringan" },
      { teks: "Sementara" },
      { teks: "Najis" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Salah satu syarat sahnya puasa Ramadan adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Syarat sah puasa antara lain: beragama Islam, balig, berakal, mampu, dan niat di malam hari sebelum fajar.",
    opsi: [
      { teks: "Niat di malam hari sebelum fajar", benar: true },
      { teks: "Niat setelah magrib" },
      { teks: "Berpuasa tanpa niat" },
      { teks: "Niat setelah dzuhur" },
      { teks: "Niat saja tanpa menahan makan" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Makan sahur sebelum imsak pada bulan Ramadan hukumnya ...",
    tingkat: "MUDAH",
    pembahasan:
      "Sahur sangat dianjurkan (sunnah muakkad) dan dinilai penuh berkah menurut sabda Nabi SAW.",
    opsi: [
      { teks: "Wajib" },
      { teks: "Sunnah", benar: true },
      { teks: "Makruh" },
      { teks: "Mubah" },
      { teks: "Haram" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Orang tua lanjut usia yang tidak sanggup berpuasa Ramadan dan tidak dapat menunaikannya kemudian, wajib menggantinya dengan ...",
    tingkat: "SULIT",
    pembahasan:
      "Bagi yang tidak sanggup puasa dan tidak berharap bisa qadha, wajib membayar fidyah: memberi makan satu orang miskin untuk setiap hari yang ditinggalkan.",
    opsi: [
      { teks: "Kaffarah membebaskan budak" },
      { teks: "Fidyah memberi makan orang miskin", benar: true },
      { teks: "Puasa 60 hari berturut-turut" },
      { teks: "Tidak ada kewajiban apa pun" },
      { teks: "Zakat fitrah saja" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Kaffarah sengaja merusak puasa Ramadan dengan hubungan suami istri (jimak) di waktu siang adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Kaffarah jimak di siang Ramadan: membebaskan hamba sahaya, jika tidak mampu puasa 2 bulan berturut-turut, jika tidak mampu memberi makan 60 orang miskin.",
    opsi: [
      { teks: "Puasa 3 hari saja" },
      { teks: "Fidyah 1 sha' beras" },
      { teks: "Puasa 60 hari berturut-turut (ataan bertingkat)", benar: true },
      { teks: "Wudu ulang" },
      { teks: "Tidak ada kaffarah" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Nisab emas untuk wajibnya zakat mal menurut ketetapan umum di Indonesia adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Nisab emas adalah 85 gram; jika harta mencapai nisab dan haul (satu tahun), wajib dikeluarkan zakat 2,5%.",
    opsi: [
      { teks: "50 gram" },
      { teks: "75 gram" },
      { teks: "85 gram", benar: true },
      { teks: "100 gram" },
      { teks: "200 gram" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Zakat fitrah wajib dikeluarkan pada ...",
    tingkat: "SEDANG",
    pembahasan:
      "Waktu wajib zakat fitrah mulai terbit fajar pada hari Idul Fitri hingga sebelum salat Id; lebih utama sebelum salat Id.",
    opsi: [
      { teks: "Awal bulan Ramadan" },
      { teks: "Pertengahan Ramadan" },
      { teks: "Sebelum salat Idul Fitri", benar: true },
      { teks: "Setelah salat Idul Fitri saja" },
      { teks: "10 hari setelah Idul Fitri" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Salah satu golongan penerima zakat yang disebut dalam QS At-Taubah ayat 60 adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Delapan golongan asnaf zakat: fakir, miskin, amil zakat, muallaf, riqab, gharim, fisabilillah, dan ibnu sabil.",
    opsi: [
      { teks: "Orang kaya" },
      { teks: "Fakir dan miskin", benar: true },
      { teks: "Semua muslim" },
      { teks: "Hanya kerabat zakat sendiri" },
      { teks: "Non-muslim semua" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Menurut pendapat jumhur ulama, janin dianggap hidup (bernafas/bernyawa) setelah usia kandungan mencapai ...",
    tingkat: "SULIT",
    pembahasan:
      "Janin dianggap bernyawa setelah usia ± 120 hari (4 bulan) sejak pembuahan, berdasarkan hadis tentang penciptaan ruh; sebelum itu berbeda hukumnya.",
    opsi: [
      { teks: "40 hari" },
      { teks: "80 hari" },
      { teks: "120 hari (4 bulan)", benar: true },
      { teks: "6 bulan" },
      { teks: "9 bulan" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Hukum menggugurkan kandungan setelah janin bernyawa tanpa alasan syar'i yang dibenarkan menurut jumhur adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Setelah janin bernyawa, pengguguran kandungan haram kecuali ada uzur syar'i yang dibenarkan, misalnya ancaman nyawa ibu yang tidak dapat dihindari.",
    opsi: [
      { teks: "Halal kapan saja" },
      { teks: "Mubah" },
      { teks: "Haram kecuali ada uzur syar'i", benar: true },
      { teks: "Wajib" },
      { teks: "Makruh tanpa hukuman" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Transaksi jual beli yang mengandung ketidakjelasan pokok akad sehingga menimbulkan sengketa disebut mengandung ...",
    tingkat: "SEDANG",
    pembahasan:
      "Gharar adalah ketidakjelasan atau penipuan dalam akad yang dapat menimbulkan kerugian; transaksi semacam itu dilarang.",
    opsi: [
      { teks: "Riba" },
      { teks: "Gharar", benar: true },
      { teks: "Shuf'ah" },
      { teks: "Khiyar" },
      { teks: "Wakalah" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Riba yang terjadi karena penundaan pelunasan atau pertukaran barang sejenis yang tidak serentak disebut riba ...",
    tingkat: "SEDANG",
    pembahasan:
      "Riba nasi'ah terjadi karena penundaan (nas') dalam pertukaran atau pelunasan; contoh klasik: pinjaman uang dengan tambahan bunga.",
    opsi: [
      { teks: "Fadhl" },
      { teks: "Nasi'ah", benar: true },
      { teks: "Jahiliyah saja" },
      { teks: "Bai' al-'inah" },
      { teks: "Qardh hasan" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Dalam jual beli, mengetahui sifat dan kondisi barang yang diperdagangkan pada saat akad disebut syarat ...",
    tingkat: "SULIT",
    pembahasan:
      "Syarat 'alim bil ma'qud 'alaih (ad-dahr) menuntut penjual dan pembeli mengetahui barang yang diperjualbelikan agar akad sah dan adil.",
    opsi: [
      { teks: "Gharar" },
      { teks: "Ad-dahr (terang/terinci)", benar: true },
      { teks: "Rukun" },
      { teks: "Khiyar syarat" },
      { teks: "Iqalah" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Mahar (maskawin) dalam akad nikah menurut hukum Islam adalah hak ...",
    tingkat: "MUDAH",
    pembahasan:
      "Mahar adalah hak mutlak perempuan yang menjadi pasangan; wajib diberikan dan menjadi miliknya, bukan milik wali.",
    opsi: [
      { teks: "Wali perempuan" },
      { teks: "Perempuan (istri)", benar: true },
      { teks: "Keluarga pria" },
      { teks: "Masjid setempat" },
      { teks: "Pemerintah" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Talak satu kali (satu talak raj'i) dalam keadaan suami belum pernah bercerai dengan istri tersebut, hukum rujuknya ...",
    tingkat: "SEDANG",
    pembahasan:
      "Talak raj'i pertama dan kedua masih dalam masa iddah; suami berhak merujuk tanpa akad nikah baru selama masa iddah berlangsung.",
    opsi: [
      { teks: "Tidak boleh rujuk sama sekali" },
      { teks: "Boleh rujuk dalam masa iddah", benar: true },
      { teks: "Wajib nikah baru dengan mahar baru" },
      { teks: "Hanya boleh setelah 3 bulan" },
      { teks: "Hanya dengan izin pengadilan" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Salah satu rukun nikah menurut jumhur ulama adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Rukun nikah: calon suami, calon istri, wali, dan dua saksi yang adil; disertai ijab kabul serta mahar.",
    opsi: [
      { teks: "Wali perempuan", benar: true },
      { teks: "Mahar saja tanpa saksi" },
      { teks: "Cincin tunangan" },
      { teks: "Undangan pernikahan" },
      { teks: "Foto prewed" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Hukum berdagang barang haram (misalnya khamr) menurut syariat Islam adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Menjual dan membeli barang haram hukumnya haram, karena memudahkan perbuatan terlarang.",
    opsi: [
      { teks: "Halal" },
      { teks: "Mubah" },
      { teks: "Haram", benar: true },
      { teks: "Makruh" },
      { teks: "Wajib" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Utang yang jatuh tempo dan belum dibayar, menurut banyak ulama, diperhitungkan dalam menentukan kewajiban ...",
    tingkat: "SULIT",
    pembahasan:
      "Utang yang sudah jatuh tempo dikurangkan dari harta sebelum menghitung nisab zakat mal, karena harta itu sebenarnya bukan milik sepenuhnya.",
    opsi: [
      { teks: "Zakat mal", benar: true },
      { teks: "Zakat fitrah saja" },
      { teks: "Kaffarah puasa" },
      { teks: "Mahar" },
      { teks: "Fidyah haji" },
    ],
  },
  {
    subkategori: "Fikih",
    teks: "Memasukkan sesuatu ke dalam lubang hidung yang sampai ke rongga dalam (jiwah) saat puasa, menurut jumhur, ...",
    tingkat: "SULIT",
    pembahasan:
      "Memasukkan benda ke lubang hidung yang mencapai rongga dalam dianggap membatalkan puasa, sebagaiman memasukkan makanan ke mulut.",
    opsi: [
      { teks: "Membatalkan puasa", benar: true },
      { teks: "Tidak membatalkan puasa" },
      { teks: "Hanya makruh" },
      { teks: "Wajib kaffarah kecil" },
      { teks: "Menggugurkan puasa tanpa qadha" },
    ],
  },

  // ====================== AKIDAH-AKHLAK (15) ======================
  {
    subkategori: "Akidah-Akhlak",
    teks: "Syirik yang mengeluarkan pelakunya dari Islam disebut syirik ...",
    tingkat: "MUDAH",
    pembahasan:
      "Syirik besar (syirik akbar) membatalkan tauhid dan mengeluarkan dari Islam; syirik kecil tidak mengeluarkan tetapi tetap dosa besar.",
    opsi: [
      { teks: "Kecil" },
      { teks: "Besar", benar: true },
      { teks: "Khafi saja" },
      { teks: "Makruh" },
      { teks: "Halal" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Jumlah sifat wajib bagi Allah yang diajarkan dalam ilmu kalam standar madrasah adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Allah memiliki 20 sifat wajib: 5 nafsiyah (wujud, qidam, baqa, mukhalafatulil hawadits, qiyamuhu binafsihi) dan 15 salbiyah/ma'ani.",
    opsi: [
      { teks: "10" },
      { teks: "15" },
      { teks: "20", benar: true },
      { teks: "25" },
      { teks: "99" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Malaikat yang bertugas menanyai mayat di dalam kubur tentang keimanannya adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Malaikat Munkar dan Nakir menanyai mayat di alam barzakh tentang rububiyah Allah, kenabian, dan agama yang dianut.",
    opsi: [
      { teks: "Raqib dan Atid" },
      { teks: "Munkar dan Nakir", benar: true },
      { teks: "Malik dan Ridwan" },
      { teks: "Harut dan Marut" },
      { teks: "Jibril dan Mikail" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Kehendak dan ketetapan Allah yang telah ditentukan sebelum terjadinya sesuatu disebut ...",
    tingkat: "SULIT",
    pembahasan:
      "Qadar adalah ketetapan Allah sejak azali; qada' adalah terlaksananya ketetapan itu. Keduanya merupakan rukun iman.",
    opsi: [
      { teks: "Qada' saja" },
      { teks: "Qadar", benar: true },
      { teks: "Ijtihad" },
      { teks: "Istikharah" },
      { teks: "Tawakkul saja" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Pandangan Ahlus Sunnah wal Jamaah tentang sifat-sifat Allah adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Ahlus Sunnah menetapkan sifat-sifat Allah sebagaimana datang dalam Al-Qur'an dan hadis tanpa menyerupakan dengan makhluk (bila kaifa) dan tanpa menafikannya (ta'til).",
    opsi: [
      { teks: "Menafikan semua sifat" },
      { teks: "Menetapkan tanpa menyerupakan dan tanpa menafikan", benar: true },
      { teks: "Menyerupakan dengan manusia" },
      { teks: "Menganggap sifat Allah ciptaan manusia" },
      { teks: "Menganggap sifat hanya simbolis" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Perbuatan baik yang dilakukan untuk pamer dan mencari pujian orang disebut ...",
    tingkat: "MUDAH",
    pembahasan:
      "Riya' adalah memperlihatkan ibadah atau kebaikan agar dipuji; termasuk akhlak tercela yang dapat menghilangkan ikhlas.",
    opsi: [
      { teks: "Ikhlas" },
      { teks: "Riya'", benar: true },
      { teks: "Tawaduk" },
      { teks: "Sabar" },
      { teks: "Syukur" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Sabar dalam Islam terbagi menjadi tiga jenis, yaitu sabar terhadap ...",
    tingkat: "SEDANG",
    pembahasan:
      "Tiga sabar: sabar dalam menjalankan ketaatan, sabar meninggalkan larangan, dan sabar atas musibah/cobaan.",
    opsi: [
      { teks: "Ketaatan, larangan, dan musibah", benar: true },
      { teks: "Makan, minum, dan tidur" },
      { teks: "Orang tua, guru, dan teman" },
      { teks: "Subuh, dzuhur, dan isya" },
      { teks: "Harta, anak, dan istri saja" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Peristiwa luar biasa yang terjadi pada nabi sebagai bukti kenabian disebut ...",
    tingkat: "SEDANG",
    pembahasan:
      "Mukjizat adalah peristiwa luar biasa yang terjadi pada nabi atas izin Allah sebagai bukti kebenaran kerasulannya.",
    opsi: [
      { teks: "Karamah" },
      { teks: "Irhas" },
      { teks: "Mukjizat", benar: true },
      { teks: "Ma'unah" },
      { teks: "Istidraj" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Peristiwa luar biasa yang terjadi pada orang saleh (bukan nabi) disebut ...",
    tingkat: "SULIT",
    pembahasan:
      "Karamah adalah karomah/kemuliaan yang Allah anugerahkan kepada wali-Nya; berbeda dari mukjizat yang khusus untuk nabi.",
    opsi: [
      { teks: "Mukjizat" },
      { teks: "Karamah", benar: true },
      { teks: "Sihir" },
      { teks: "Kedzibaan" },
      { teks: "Bid'ah" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Tanda-tanda kenabian yang muncul sebelum Nabi diutus secara resmi disebut ...",
    tingkat: "SEDANG",
    pembahasan:
      "Irhas adalah tanda kenabian yang muncul sebelum diangkat menjadi rasul, seperti terbelahnya dada Nabi kecil oleh malaikat.",
    opsi: [
      { teks: "Mukjizat" },
      { teks: "Irhas", benar: true },
      { teks: "Karamah" },
      { teks: "Isra' Mikraj" },
      { teks: "Fathu Makkah" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Menurut Ahlus Sunnah, iman seorang mukmin dapat ...",
    tingkat: "SEDANG",
    pembahasan:
      "Iman menurut Ahlus Sunnah dapat bertambah dengan ketaatan dan berkurang dengan maksiat; bukan sesuatu yang tetap tanpa perubahan.",
    opsi: [
      { teks: "Bertambah dan berkurang", benar: true },
      { teks: "Hanya tetap tanpa perubahan" },
      { teks: "Hanya berkurang" },
      { teks: "Hanya bertambah" },
      { teks: "Bergantung pada mazhab saja" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Bertakwa berarti ...",
    tingkat: "MUDAH",
    pembahasan:
      "Takwa adalah melaksanakan perintah Allah dan menjauhi larangan-Nya; orang bertakwa disebut muttaqin.",
    opsi: [
      { teks: "Mengetahui hukum fikih saja" },
      { teks: "Melaksanakan perintah dan menjauhi larangan Allah", benar: true },
      { teks: "Hanya banyak beribadah tanpa menjauhi larangan" },
      { teks: "Meniru orang lain" },
      { teks: "Menghindari semua interaksi sosial" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Sikap rendah hati dan tidak merasa lebih baik dari orang lain dalam Islam disebut ...",
    tingkat: "MUDAH",
    pembahasan:
      "Tawaduk adalah rendah hati; lawan akhlak tercelanya adalah takabur (angkuh).",
    opsi: [
      { teks: "Takabur" },
      { teks: "Tawaduk", benar: true },
      { teks: "Hasad" },
      { teks: "Ghibah" },
      { teks: "Bakhil" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Menurut hadis, neraka Jahannam memiliki pintu-pintu yang berjumlah ...",
    tingkat: "SULIT",
    pembahasan:
      "Hadis shahih menyebutkan Jahannam memiliki tujuh pintu; masing-masing untuk golongan pelaku dosa besar tertentu.",
    opsi: [
      { teks: "Tiga" },
      { teks: "Lima" },
      { teks: "Tujuh", benar: true },
      { teks: "Delapan" },
      { teks: "Sembilan" },
    ],
  },
  {
    subkategori: "Akidah-Akhlak",
    teks: "Memberi nasihat dengan ikhlas kepada sesama muslim dalam urusan agama termasuk akhlak ...",
    tingkat: "SEDANG",
    pembahasan:
      "An-nasihah (nasihat) kepada Allah, rasul, pemimpin, dan seluruh kaum muslimin termasuk akhlak terpuji yang dianjurkan Nabi.",
    opsi: [
      { teks: "Ghibah" },
      { teks: "Namimah" },
      { teks: "An-nasihah", benar: true },
      { teks: "Riya'" },
      { teks: "Ujub" },
    ],
  },

  // ====================== SKI (15) ======================
  {
    subkategori: "SKI",
    teks: "Peristiwa Isra' Mikraj bermula dari Masjidil Haram (Mekah) ke ...",
    tingkat: "MUDAH",
    pembahasan:
      "Isra' adalah perjalanan Nabi dari Masjidil Haram ke Masjidil Aqsa (Baitul Maqdis); Mikraj adalah kenaikan ke langit.",
    opsi: [
      { teks: "Masjid Nabawi" },
      { teks: "Masjidil Aqsa", benar: true },
      { teks: "Masjid Quba" },
      { teks: "Masjid Qiblatain" },
      { teks: "Masjid Demak" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Perjanjian antara kaum muslimin dan Quraisy pada tahun 6 H yang membuka jalan dakwah disebut Perjanjian ...",
    tingkat: "SEDANG",
    pembahasan:
      "Perjanjian Hudaibiyah (6 H) mengakhiri konflik sementara dan menjadi tonggak penting penyebaran Islam.",
    opsi: [
      { teks: "Aqabah" },
      { teks: "Hudaibiyah", benar: true },
      { teks: "Misyal" },
      { teks: "Wathiqiyah" },
      { teks: "Fashar" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Pembukaan (penaklukan) kota Mekah oleh Nabi Muhammad SAW terjadi pada tahun ...",
    tingkat: "SEDANG",
    pembahasan:
      "Fathu Makkah terjadi pada 20 Ramadan tahun 8 H; kaum muslimin memasuki Mekah hampir tanpa pertumpahan darah besar.",
    opsi: [
      { teks: "2 H" },
      { teks: "5 H" },
      { teks: "8 H", benar: true },
      { teks: "10 H" },
      { teks: "11 H" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Perang yang terjadi pada tahun 3 H di mana kaum muslimin mengalami banyak syuhada termasuk Hamzah RA adalah Perang ...",
    tingkat: "SEDANG",
    pembahasan:
      "Perang Uhud (3 H) terjadi di bukit Uhud; para syuhada termasuk Hamzah bin Abdul Muthalib yang dijuluki Asadullah.",
    opsi: [
      { teks: "Badar" },
      { teks: "Uhud", benar: true },
      { teks: "Khandaq" },
      { teks: "Tabuk" },
      { teks: "Hunain" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Khalifah yang memimpin penyusunan mushaf Al-Qur'an standar dan ekspedisi ke berbagai wilayah adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Usman bin Affan menstandarkan mushaf dan mengirim salinannya ke pusat-pusat Islam; beliau juga dikenal sebagai Dzun Nurain.",
    opsi: [
      { teks: "Abu Bakar" },
      { teks: "Umar bin Khattab" },
      { teks: "Usman bin Affan", benar: true },
      { teks: "Ali bin Abi Thalib" },
      { teks: "Muawiyah" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Kerajaan Islam pertama di Jawa yang berdiri pada abad ke-15 adalah Kerajaan ...",
    tingkat: "SEDANG",
    pembahasan:
      "Kerajaan Demak (± 1478–1548) dianggap kerajaan Islam pertama di Jawa yang berperan besar dalam penyebaran Islam.",
    opsi: [
      { teks: "Majapahit" },
      { teks: "Demak", benar: true },
      { teks: "Mataram" },
      { teks: "Kediri" },
      { teks: "Singasari" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Wali Songo berjumlah ... orang ulama penyebar Islam di Nusantara.",
    tingkat: "MUDAH",
    pembahasan:
      "Wali Songo adalah sembilan wali yang berperan menyebar Islam di Jawa melalui dakwah, pendidikan, dan akulturasi budaya.",
    opsi: [
      { teks: "Tujuh" },
      { teks: "Delapan" },
      { teks: "Sembilan", benar: true },
      { teks: "Sepuluh" },
      { teks: "Dua belas" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Sunan Kalijaga dikenal dalam sejarah penyebaran Islam di Jawa karena pendekatan dakwahnya yang ...",
    tingkat: "SEDANG",
    pembahasan:
      "Sunan Kalijaga menggunakan pendekatan akulturasi, menyesuaikan dakwah dengan budaya lokal agar diterima masyarakat.",
    opsi: [
      { teks: "Bersifat kekerasan" },
      { teks: "Akulturasi dan toleran", benar: true },
      { teks: "Menolak semua budaya lokal" },
      { teks: "Hanya melalui perdagangan rempah" },
      { teks: "Hanya kepada kalangan bangsawan" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Kerajaan Islam yang berpusat di Aceh dan menjadi pusat perdagangan serta penyebaran Islam di Sumatera adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Kesultanan Aceh Darussalam (± abad ke-16) menjadi kekuatan maritim dan pusat studi Islam di Sumatera.",
    opsi: [
      { teks: "Samudera Pasai" },
      { teks: "Aceh Darussalam", benar: true },
      { teks: "Riau-Lingga" },
      { teks: "Banjar" },
      { teks: "Ternate" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Sultan yang menaklukkan Konstantinopel pada tahun 1453 M dan mengakhiri Kekaisaran Romawi Timur adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Sultan Muhammad Al-Fatih (Mehmed II) merebut Konstantinopel pada 29 Mei 1453, peristiwa bersejarah dalam sejarah Islam.",
    opsi: [
      { teks: "Salahuddin Al-Ayyubi" },
      { teks: "Suleiman Al-Qanuni" },
      { teks: "Muhammad Al-Fatih", benar: true },
      { teks: "Harun Ar-Rasyid" },
      { teks: "Utsman bin Affan" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Organisasi Islam modern di Indonesia yang didirikan oleh KH Ahmad Dahlan pada tahun 1912 adalah ...",
    tingkat: "MUDAH",
    pembahasan:
      "Muhammadiyah didirikan di Yogyakarta pada 18 November 1912 oleh KH Ahmad Dahlan untuk memurnikan ajaran Islam dan meningkatkan pendidikan.",
    opsi: [
      { teks: "Nahdlatul Ulama" },
      { teks: "Muhammadiyah", benar: true },
      { teks: "Persis" },
      { teks: "Al-Irsyad" },
      { teks: "Jam'iyatul Khair" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Pemberontakan yang dipimpin Pangeran Diponegoro melawan kolonial Belanda pada 1825–1830 dikenal sebagai ...",
    tingkat: "SEDANG",
    pembahasan:
      "Perang Diponegoro (Jawa War) adalah perang besar melawan penjajahan Belanda; Diponegoro menggunakan simbolisme jihad fi sabilillah.",
    opsi: [
      { teks: "Perang Banten" },
      { teks: "Perang Diponegoro", benar: true },
      { teks: "Perang Aceh" },
      { teks: "Perang Padri" },
      { teks: "Perang Banjar" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Kerajaan Islam di Sulawesi Selatan yang dipimpin Sultan Hasanuddin dan dikenal melawan VOC adalah ...",
    tingkat: "SULIT",
    pembahasan:
      "Sultan Hasanuddin (Ayam Jantan dari Timur) memimpin Kesultanan Gowa-Tallo dan melancarkan perlawanan terhadap ekspansi VOC.",
    opsi: [
      { teks: "Bone" },
      { teks: "Gowa-Tallo", benar: true },
      { teks: "Wajo" },
      { teks: "Makassar kecil" },
      { teks: "Buton" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Masjid yang menjadi kiblat pertama umat Islam sebelum diarahkan ke Ka'bah adalah ...",
    tingkat: "SEDANG",
    pembahasan:
      "Sebelum perintah mengarahkan kiblat ke Ka'bah (2 H), umat Islam salat menghadap Masjidil Aqsa di Baitul Maqdis.",
    opsi: [
      { teks: "Masjid Nabawi" },
      { teks: "Masjidil Aqsa", benar: true },
      { teks: "Masjid Quba" },
      { teks: "Masjid Qiblatain" },
      { teks: "Masjid Demak" },
    ],
  },
  {
    subkategori: "SKI",
    teks: "Penyebaran Islam di Nusantara pada awalnya banyak melalui jalur ...",
    tingkat: "MUDAH",
    pembahasan:
      "Islam masuk Nusantara melalui perdagangan, perkawinan, pendidikan, dan dakwah para pedagang serta ulama, bukan melalui penaklukan bersenjata.",
    opsi: [
      { teks: "Perdagangan dan dakwah", benar: true },
      { teks: "Invasi militer besar-besaran" },
      { teks: "Paksaan oleh penjajah Eropa" },
      { teks: "Migrasi massal dari Afrika" },
      { teks: "Hanya melalui kerajaan Hindu" },
    ],
  },
];
