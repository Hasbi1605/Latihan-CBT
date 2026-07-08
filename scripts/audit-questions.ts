/**
 * Audit struktural bank soal seed (prisma/data/*.ts).
 * Jalankan: npm run audit:questions
 */
import { tpaQuestions } from "../prisma/data/tpa";
import { bahasaQuestions } from "../prisma/data/bahasa";
import { keislamanQuestions } from "../prisma/data/keislaman";
import { btqQuestions } from "../prisma/data/btq";

type SeedQ = {
  subkategori: string;
  teks: string;
  tipe?: "PG" | "REKAMAN";
  pembahasan: string;
  opsi?: Array<{ teks: string; benar?: boolean }>;
};

const BANKS: Array<{ kode: string; items: SeedQ[] }> = [
  { kode: "TPA", items: tpaQuestions },
  { kode: "BAHASA", items: bahasaQuestions },
  { kode: "KEISLAMAN", items: keislamanQuestions },
  { kode: "BTQ", items: btqQuestions },
];

const errors: string[] = [];
const warnings: string[] = [];

function auditQuestion(bank: string, index: number, q: SeedQ) {
  const id = `${bank}[${index + 1}] ${q.subkategori}`;
  const tipe = q.tipe ?? "PG";

  if (!q.teks?.trim()) errors.push(`${id}: teks kosong`);
  if (!q.pembahasan?.trim()) errors.push(`${id}: pembahasan kosong`);
  if (!q.subkategori?.trim()) warnings.push(`${id}: subkategori kosong`);

  if (tipe === "PG") {
    if (!q.opsi?.length) {
      errors.push(`${id}: soal PG tanpa opsi`);
      return;
    }
    const correct = q.opsi.filter((o) => o.benar);
    if (correct.length !== 1) {
      errors.push(`${id}: harus tepat 1 kunci, ditemukan ${correct.length}`);
    }
    const empty = q.opsi.filter((o) => !o.teks?.trim());
    if (empty.length) errors.push(`${id}: ${empty.length} opsi teks kosong`);
    const normalized = q.opsi.map((o) => o.teks.trim());
    if (new Set(normalized).size !== q.opsi.length) {
      warnings.push(`${id}: ada opsi duplikat`);
    }
    for (const o of q.opsi) {
      if (o.teks !== o.teks.trim()) {
        warnings.push(`${id}: opsi ada spasi berlebih → "${o.teks}"`);
      }
    }
  } else if (tipe === "REKAMAN" && q.opsi?.length) {
    warnings.push(`${id}: soal REKAMAN seharusnya tanpa opsi PG`);
  }
}

for (const { kode, items } of BANKS) {
  items.forEach((q, i) => auditQuestion(kode, i, q));
}

const btqNunBa = btqQuestions.find((q) => q.subkategori === "Tajwid - Nun Mati/Tanwin");
if (btqNunBa) {
  const key = btqNunBa.opsi?.find((o) => o.benar)?.teks;
  if (key !== "Iqlab") {
    errors.push(`BTQ Nun+Ba: kunci harus "Iqlab", ditemukan "${key ?? "(kosong)"}"`);
  }
}

const btqIdgham = btqQuestions.find((q) => q.subkategori === "Tajwid - Idgham");
if (btqIdgham) {
  if (!btqIdgham.teks.includes("bighunnah")) {
    errors.push("BTQ Idgham: pertanyaan harus merujuk idgham bighunnah");
  }
  const key = btqIdgham.opsi?.find((o) => o.benar)?.teks;
  if (key !== "4 huruf") {
    errors.push(`BTQ Idgham: kunci harus "4 huruf", ditemukan "${key ?? "(kosong)"}"`);
  }
}

const total = BANKS.reduce((n, b) => n + b.items.length, 0);
const pg = BANKS.reduce(
  (n, b) => n + b.items.filter((q) => (q.tipe ?? "PG") === "PG").length,
  0,
);

console.log("=== Audit Bank Soal ===\n");
console.log(`Total soal : ${total}`);
console.log(`PG         : ${pg}`);
console.log(`Rekaman    : ${total - pg}`);

if (warnings.length) {
  console.log(`\n⚠ Peringatan (${warnings.length}):`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}

if (errors.length) {
  console.log(`\n❌ Error (${errors.length}):`);
  errors.forEach((e) => console.log(`  - ${e}`));
  process.exit(1);
}

console.log("\n✅ Audit struktural & regresi faktual lulus.");
