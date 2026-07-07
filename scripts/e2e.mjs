#!/usr/bin/env node
/**
 * E2E API test — jalankan setelah server jalan:
 *   npm run build && npm run start
 *   BASE=http://localhost:3000 npm run test:e2e
 */
import { PrismaClient } from "../src/generated/prisma/index.js";

const BASE = process.env.BASE || "http://localhost:3000";
const prisma = new PrismaClient();

let cookie = "";

async function req(path, opts = {}) {
  const headers = { ...(opts.headers || {}) };
  if (cookie) headers.Cookie = cookie;
  if (opts.body && typeof opts.body === "object" && !(opts.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(opts.body);
  }
  const res = await fetch(`${BASE}${path}`, { ...opts, headers });
  const set = res.headers.getSetCookie?.() || [];
  for (const c of set) {
    const part = c.split(";")[0];
    if (part.startsWith("cbt_session=")) cookie = part;
  }
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }
  return { res, json };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function correctOptionId(questionId) {
  const opt = await prisma.option.findFirst({
    where: { questionId, isCorrect: true },
  });
  return opt?.id ?? null;
}

async function login(nomor, password) {
  const { res, json } = await req("/api/auth/login", {
    method: "POST",
    body: { nomorPeserta: nomor, password },
  });
  assert(res.ok, `Login gagal: ${JSON.stringify(json)}`);
  return json;
}

async function finishAttempt(attemptId, { uploadRecordings = false } = {}) {
  for (let guard = 0; guard < 15; guard++) {
    const { json: state } = await req(`/api/attempts/${attemptId}/state`);
    if (state.finished || !state.active) break;

    for (const q of state.active.questions) {
      if (q.tipe === "REKAMAN") {
        if (!uploadRecordings) continue;
        const blob = new Blob([new Uint8Array([0x1a, 0x45, 0xdf, 0xa3])], {
          type: "audio/webm",
        });
        const form = new FormData();
        form.append("answerId", q.answerId);
        form.append("audio", blob, "test.webm");
        const up = await req(`/api/attempts/${attemptId}/recording`, {
          method: "POST",
          body: form,
        });
        assert(up.res.ok, `Upload rekaman gagal: ${JSON.stringify(up.json)}`);
      } else {
        const optId = await correctOptionId(q.questionId);
        assert(optId, `Kunci soal ${q.questionId} tidak ditemukan`);
        await req(`/api/attempts/${attemptId}/answer`, {
          method: "POST",
          body: { answerId: q.answerId, optionId: optId },
        });
      }
    }

    await req(`/api/attempts/${attemptId}/submit-section`, {
      method: "POST",
      body: { sectionId: state.active.sectionId },
    });
  }
}

async function runReplikaExam() {
  console.log("=== Test paket REPLIKA_2026 ===");
  cookie = "";
  await login("1234567890", "password");

  const pkgs = await req("/api/packages");
  assert(pkgs.res.ok, "GET packages gagal");
  const replika = pkgs.json.packages.find((p) => p.mode === "REPLIKA_2026");
  assert(replika, "Paket REPLIKA tidak ditemukan");

  const start = await req("/api/attempts", {
    method: "POST",
    body: { packageId: replika.id, token: "UINSSC2026" },
  });
  assert(start.res.ok, `Start attempt gagal: ${JSON.stringify(start.json)}`);
  const attemptId = start.json.attemptId;

  await finishAttempt(attemptId);

  const { json: result } = await req(`/api/attempts/${attemptId}/result`);
  assert(
    result.totalBenar === result.totalSoal,
    `Skor PG harus 100%: ${result.totalBenar}/${result.totalSoal}`,
  );
  console.log(
    `✔ REPLIKA selesai — nilai ${result.nilaiTotal}% (${result.totalBenar}/${result.totalSoal})`,
  );
}

async function runBtqPackage() {
  console.log("=== Test paket LATIHAN_LENGKAP + BTQ ===");
  cookie = "";
  await login("1234567890", "password");

  const pkgs = await req("/api/packages");
  const lengkap = pkgs.json.packages.find((p) => p.mode === "LATIHAN_LENGKAP");
  assert(lengkap, "Paket LATIHAN_LENGKAP tidak ditemukan");

  const start = await req("/api/attempts", {
    method: "POST",
    body: { packageId: lengkap.id, token: "LATIHANBTQ" },
  });
  assert(start.res.ok, `Start BTQ gagal: ${JSON.stringify(start.json)}`);
  const attemptId = start.json.attemptId;

  await finishAttempt(attemptId, { uploadRecordings: true });

  const { json: result } = await req(`/api/attempts/${attemptId}/result`);
  assert(result.btqRecordings?.length > 0, "Harus ada rekaman BTQ");
  assert(
    result.nilaiTotal === 100,
    `Skor PG paket BTQ harus 100%: ${result.totalBenar}/${result.totalSoal} = ${result.nilaiTotal}%`,
  );
  console.log(
    `✔ LATIHAN+BTQ selesai — ${result.btqRecordings.length} rekaman, nilai PG ${result.nilaiTotal}% (${result.totalBenar}/${result.totalSoal})`,
  );
}

async function runAdmin() {
  console.log("=== Test admin API ===");
  cookie = "";
  await login("admin", "admin123");

  const analytics = await req("/api/admin/analytics");
  assert(analytics.res.ok, "Analytics admin gagal");

  const recordings = await req("/api/admin/recordings");
  assert(recordings.res.ok, "Recordings admin gagal");

  if (recordings.json.recordings?.length > 0) {
    const r = recordings.json.recordings[0];
    const grade = await req("/api/admin/recordings", {
      method: "PATCH",
      body: {
        id: r.id,
        rubrikKelancaran: 4,
        rubrikTajwid: 4,
        rubrikMakhraj: 4,
        catatanPenguji: "E2E test",
      },
    });
    assert(grade.res.ok, "Penilaian BTQ gagal");
    console.log("✔ Admin penilaian BTQ OK");
  }

  console.log(`✔ Admin analytics — ${analytics.json.summary?.totalQuestions} soal`);
}

async function main() {
  console.log(`E2E → ${BASE}\n`);
  await runReplikaExam();
  await runBtqPackage();
  await runAdmin();
  console.log("\n✅ Semua tes E2E lulus.");
}

main()
  .catch((e) => {
    console.error("\n❌ E2E gagal:", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
