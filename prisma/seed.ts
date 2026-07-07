import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma";
import type { SeedQuestion } from "./data/types";
import { tpaQuestions } from "./data/tpa";
import { bahasaQuestions } from "./data/bahasa";
import { keislamanQuestions } from "./data/keislaman";

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
    await prisma.question.create({
      data: {
        subtestId: subtest.id,
        subkategori: q.subkategori,
        teks: q.teks,
        arahTeks: q.arahTeks ?? "LTR",
        tingkat: q.tingkat ?? "SEDANG",
        pembahasan: q.pembahasan,
        options: {
          create: q.opsi.map((o, i) => ({
            label: LABELS[i],
            teks: o.teks,
            isCorrect: Boolean(o.benar),
          })),
        },
      },
    });
  }

  return subtest;
}

async function main() {
  console.log("Menghapus data lama (seed idempotent)...");
  await prisma.attemptAnswer.deleteMany();
  await prisma.attemptSection.deleteMany();
  await prisma.attempt.deleteMany();
  await prisma.examPackageSection.deleteMany();
  await prisma.examPackage.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.subtest.deleteMany();
  await prisma.user.deleteMany();

  console.log("Membuat subtes & soal...");
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

  console.log(
    `Jumlah soal — TPA: ${tpaQuestions.length}, Kebahasaan: ${bahasaQuestions.length}, Keislaman: ${keislamanQuestions.length}`,
  );

  console.log("Membuat paket ujian simulasi...");
  const paket = await prisma.examPackage.create({
    data: {
      nama: "Simulasi SPMB Mandiri UIN Siber Cirebon 2026",
      mode: "REPLIKA_2026",
      token: "UINSSC2026",
      deskripsi:
        "Simulasi 3 subtes berurutan (TPA, Kebahasaan, Keislaman) dengan timer per-subtes, meniru struktur resmi SPMB Mandiri 2026. Jumlah soal & durasi bersifat estimasi dan dapat disesuaikan.",
      aktif: true,
      sections: {
        create: [
          {
            subtestId: tpa.id,
            urutan: 1,
            jumlahSoal: tpaQuestions.length,
            durasiDetik: 30 * 60,
            acakSoal: true,
            acakOpsi: true,
          },
          {
            subtestId: bahasa.id,
            urutan: 2,
            jumlahSoal: bahasaQuestions.length,
            durasiDetik: 40 * 60,
            acakSoal: true,
            acakOpsi: true,
          },
          {
            subtestId: keislaman.id,
            urutan: 3,
            jumlahSoal: keislamanQuestions.length,
            durasiDetik: 30 * 60,
            acakSoal: true,
            acakOpsi: true,
          },
        ],
      },
    },
  });

  console.log("Membuat akun demo...");
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
  console.log(`Paket: ${paket.nama}`);
  console.log("Token ujian   : UINSSC2026");
  console.log("Login peserta : 1234567890 / password");
  console.log("Login admin   : admin / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
