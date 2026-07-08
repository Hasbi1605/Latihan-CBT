import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma";
import type { SeedQuestion } from "./data/types";
import {
  tpaQuestions,
  bahasaQuestions,
  keislamanQuestions,
  btqQuestions,
  BANK_STATS,
} from "./data/index";

/** Jumlah soal per subtes pada paket replika (acuan UM-PTKIN, diambil acak dari bank). */
const REPLIKA_COUNTS = { tpa: 30, bahasa: 40, keislaman: 30 } as const;
const prisma = new PrismaClient();
const LABELS = ["A", "B", "C", "D", "E", "F"];

async function insertSubtest(
  kode: string,
  nama: string,
  deskripsi: string,
  urutan: number,
  questions: SeedQuestion[],
) {
  const subtest = await prisma.subtest.create({
    data: { kode, nama, deskripsi, urutan },
  });

  for (const q of questions) {
    const tipe = q.tipe ?? "PG";
    await prisma.question.create({
      data: {
        subtestId: subtest.id,
        subkategori: q.subkategori,
        teks: q.teks,
        tipe,
        arahTeks: q.arahTeks ?? "LTR",
        gambarUrl: q.gambarUrl ?? null,
        tingkat: q.tingkat ?? "SEDANG",
        pembahasan: q.pembahasan,
        ...(tipe === "PG" && q.opsi
          ? {
              options: {
                create: q.opsi.map((o, i) => ({
                  label: LABELS[i],
                  teks: o.teks,
                  isCorrect: Boolean(o.benar),
                })),
              },
            }
          : {}),
      },
    });
  }
  return subtest;
}

async function main() {
  console.log("Menghapus data lama...");
  await prisma.attemptRecording.deleteMany();
  await prisma.attemptAnswer.deleteMany();
  await prisma.attemptSection.deleteMany();
  await prisma.attempt.deleteMany();
  await prisma.examPackageSection.deleteMany();
  await prisma.examPackage.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.subtest.deleteMany();
  await prisma.user.deleteMany();

  const tpa = await insertSubtest(
    "TPA",
    "Tes Potensi Akademik",
    "Penalaran verbal, logika, dan kuantitatif.",
    1,
    tpaQuestions,
  );
  const bahasa = await insertSubtest(
    "BAHASA",
    "Kebahasaan",
    "Bahasa Indonesia, Bahasa Inggris, dan Bahasa Arab.",
    2,
    bahasaQuestions,
  );
  const keislaman = await insertSubtest(
    "KEISLAMAN",
    "Keislaman",
    "Al-Qur'an & Hadis, Fikih, Akidah-Akhlak, dan SKI.",
    3,
    keislamanQuestions,
  );
  await insertSubtest(
    "BTQ",
    "Baca Tulis Al-Qur'an",
    "Teori tajwid + praktik bacaan (rekaman audio).",
    4,
    btqQuestions,
  );

  const pgBtq = btqQuestions.filter((q) => q.tipe === "PG").length;
  const rekBtq = btqQuestions.filter((q) => q.tipe === "REKAMAN").length;

  await prisma.examPackage.create({
    data: {
      nama: "Simulasi SPMB Mandiri UIN Siber Cirebon 2026",
      mode: "REPLIKA_2026",
      token: "UINSSC2026",
      deskripsi:
        "Replika resmi 2026: TPA, Kebahasaan, Keislaman (3 subtes). Tanpa BTQ terpisah.",
      aktif: true,
      sections: {
        create: [
          {
            subtestId: tpa.id,
            urutan: 1,
            jumlahSoal: REPLIKA_COUNTS.tpa,
            durasiDetik: 30 * 60,
            acakSoal: true,
            acakOpsi: true,
          },
          {
            subtestId: bahasa.id,
            urutan: 2,
            jumlahSoal: REPLIKA_COUNTS.bahasa,
            durasiDetik: 40 * 60,
            acakSoal: true,
            acakOpsi: true,
          },
          {
            subtestId: keislaman.id,
            urutan: 3,
            jumlahSoal: REPLIKA_COUNTS.keislaman,
            durasiDetik: 30 * 60,
            acakSoal: true,
            acakOpsi: true,
          },
        ],
      },
    },
  });

  const btqSub = await prisma.subtest.findUnique({ where: { kode: "BTQ" } });
  if (btqSub) {
    await prisma.examPackage.create({
      data: {
        nama: "Latihan Intensif (Bank Penuh)",
        mode: "LATIHAN_INTENSIF",
        token: "INTENSIF",
        deskripsi:
          "Latihan panjang: 50 soal per subtes inti, diacak dari bank lengkap (~100+ per subtes).",
        aktif: true,
        sections: {
          create: [
            {
              subtestId: tpa.id,
              urutan: 1,
              jumlahSoal: 50,
              durasiDetik: 50 * 60,
              acakSoal: true,
              acakOpsi: true,
            },
            {
              subtestId: bahasa.id,
              urutan: 2,
              jumlahSoal: 50,
              durasiDetik: 55 * 60,
              acakSoal: true,
              acakOpsi: true,
            },
            {
              subtestId: keislaman.id,
              urutan: 3,
              jumlahSoal: 50,
              durasiDetik: 50 * 60,
              acakSoal: true,
              acakOpsi: true,
            },
          ],
        },
      },
    });

    await prisma.examPackage.create({
      data: {
        nama: "Latihan Lengkap + BTQ (Opsional)",
        mode: "LATIHAN_LENGKAP",
        token: "LATIHANBTQ",
        deskripsi:
          "Mode latihan lengkap: 3 subtes inti + subtes BTQ (teori + rekaman bacaan).",
        aktif: true,
        sections: {
          create: [
            {
              subtestId: tpa.id,
              urutan: 1,
              jumlahSoal: 10,
              durasiDetik: 15 * 60,
              acakSoal: true,
              acakOpsi: true,
            },
            {
              subtestId: bahasa.id,
              urutan: 2,
              jumlahSoal: 10,
              durasiDetik: 15 * 60,
              acakSoal: true,
              acakOpsi: true,
            },
            {
              subtestId: keislaman.id,
              urutan: 3,
              jumlahSoal: 10,
              durasiDetik: 15 * 60,
              acakSoal: true,
              acakOpsi: true,
            },
            {
              subtestId: btqSub.id,
              urutan: 4,
              jumlahSoal: btqQuestions.length,
              durasiDetik: 20 * 60,
              acakSoal: false,
              acakOpsi: false,
            },
          ],
        },
      },
    });
  }

  await prisma.user.create({
    data: {
      nama: "Peserta Demo",
      nomorPeserta: "1234567890",
      passwordHash: await bcrypt.hash("password", 10),
      role: "PESERTA",
    },
  });
  await prisma.user.create({
    data: {
      nama: "Administrator",
      nomorPeserta: "admin",
      passwordHash: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
  });

  console.log("\nSeed selesai ✔");
  console.log(
    `Bank soal: TPA ${BANK_STATS.tpa}, BAHASA ${BANK_STATS.bahasa}, KEISLAMAN ${BANK_STATS.keislaman}, BTQ ${pgBtq} PG + ${rekBtq} rekaman (total ${BANK_STATS.total})`,
  );
  console.log(`Paket REPLIKA_2026: ${REPLIKA_COUNTS.tpa}+${REPLIKA_COUNTS.bahasa}+${REPLIKA_COUNTS.keislaman} soal — token UINSSC2026`);
  console.log("Paket LATIHAN_INTENSIF: 50+50+50 soal — token INTENSIF");
  console.log("Paket LATIHAN_LENGKAP token: LATIHANBTQ");
  console.log("Login peserta: 1234567890 / password");
  console.log("Login admin: admin / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
