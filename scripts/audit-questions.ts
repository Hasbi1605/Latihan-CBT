/**
 * Audit struktural bank soal seed (prisma/data/*.ts).
 * Jalankan: npm run audit:questions
 */
import {
  tpaQuestions,
  bahasaQuestions,
  keislamanQuestions,
  btqQuestions,
  BANK_STATS,
} from "../prisma/data/index";

type SeedQ = {
  subkategori: string;
  teks: string;
  tipe?: "PG" | "REKAMAN";
  gambarUrl?: string;
  pembahasan: string;
  opsi?: Array<{ teks: string; benar?: boolean }>;
};

const BANKS: Array<{ kode: string; items: SeedQ[]; min: number }> = [
  { kode: "TPA", items: tpaQuestions, min: 90 },
  { kode: "BAHASA", items: bahasaQuestions, min: 90 },
  { kode: "KEISLAMAN", items: keislamanQuestions, min: 90 },
  { kode: "BTQ", items: btqQuestions, min: 10 },
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

for (const { kode, items, min } of BANKS) {
  if (items.length < min) {
    errors.push(`${kode}: minimal ${min} soal, ditemukan ${items.length}`);
  }
  items.forEach((q, i) => auditQuestion(kode, i, q));
}

const figural = tpaQuestions.filter((q) => q.subkategori?.includes("Figural"));
if (figural.length < 5) {
  errors.push(`TPA figural: minimal 5 soal, ditemukan ${figural.length}`);
}
for (const q of figural) {
  if (!q.gambarUrl?.startsWith("/images/tpa/figural/")) {
    errors.push(`TPA figural tanpa gambarUrl valid: ${q.subkategori}`);
  }
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

const total = BANK_STATS.total;
const pg = BANKS.reduce(
  (n, b) => n + b.items.filter((q) => (q.tipe ?? "PG") === "PG").length,
  0,
);

console.log("=== Audit Bank Soal ===\n");
console.log(`Total soal : ${total}`);
console.log(`TPA        : ${BANK_STATS.tpa} (figural ${figural.length})`);
console.log(`BAHASA     : ${BANK_STATS.bahasa}`);
console.log(`KEISLAMAN  : ${BANK_STATS.keislaman}`);
console.log(`BTQ        : ${BANK_STATS.btq}`);
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
