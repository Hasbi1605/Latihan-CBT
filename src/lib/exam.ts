import { prisma } from "@/lib/prisma";

const LABELS = ["A", "B", "C", "D", "E", "F"];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export class ExamError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

/** Memulai attempt baru: verifikasi token, pilih & acak soal, buat section + answer rows. */
export async function startAttempt(
  userId: string,
  packageId: string,
  token: string,
): Promise<string> {
  const pkg = await prisma.examPackage.findUnique({
    where: { id: packageId },
    include: { sections: { orderBy: { urutan: "asc" } } },
  });

  if (!pkg || !pkg.aktif) {
    throw new ExamError("Paket ujian tidak ditemukan atau tidak aktif.", 404);
  }
  if (pkg.token.trim().toUpperCase() !== token.trim().toUpperCase()) {
    throw new ExamError("Token ujian salah.", 403);
  }

  const attempt = await prisma.attempt.create({
    data: { userId, packageId: pkg.id, status: "BERLANGSUNG" },
  });

  for (const sec of pkg.sections) {
    const allQuestions = await prisma.question.findMany({
      where: { subtestId: sec.subtestId },
      include: { options: true },
    });

    const picked = (sec.acakSoal ? shuffle(allQuestions) : allQuestions).slice(
      0,
      sec.jumlahSoal,
    );

    const attemptSection = await prisma.attemptSection.create({
      data: {
        attemptId: attempt.id,
        subtestId: sec.subtestId,
        urutan: sec.urutan,
        durasiDetik: sec.durasiDetik,
        status: "BELUM",
      },
    });

    let urutan = 1;
    for (const q of picked) {
      const optionIds = q.options.map((o) => o.id);
      const order = sec.acakOpsi ? shuffle(optionIds) : optionIds;
      await prisma.attemptAnswer.create({
        data: {
          attemptSectionId: attemptSection.id,
          questionId: q.id,
          urutan: urutan++,
          optionOrderJson: JSON.stringify(order),
        },
      });
    }
  }

  return attempt.id;
}

/** Menghitung & menyimpan skor sebuah section. */
async function scoreSection(attemptSectionId: string) {
  const answers = await prisma.attemptAnswer.findMany({
    where: { attemptSectionId },
    include: { question: { include: { options: true } } },
  });

  let benar = 0;
  let dijawab = 0;
  for (const a of answers) {
    if (a.pilihanOptionId) {
      dijawab++;
      const chosen = a.question.options.find((o) => o.id === a.pilihanOptionId);
      if (chosen?.isCorrect) benar++;
    }
  }
  const total = answers.length;
  const kosong = total - dijawab;
  const salah = dijawab - benar;

  await prisma.attemptSection.update({
    where: { id: attemptSectionId },
    data: {
      status: "SELESAI",
      selesaiAt: new Date(),
      benar,
      salah,
      kosong,
      skor: benar,
    },
  });
}

async function finalizeAttempt(attemptId: string) {
  const sections = await prisma.attemptSection.findMany({
    where: { attemptId },
  });
  for (const s of sections) {
    if (s.status !== "SELESAI") await scoreSection(s.id);
  }
  const refreshed = await prisma.attemptSection.findMany({
    where: { attemptId },
  });
  const skorTotal = refreshed.reduce((acc, s) => acc + (s.skor ?? 0), 0);
  await prisma.attempt.update({
    where: { id: attemptId },
    data: { status: "SELESAI", selesaiAt: new Date(), skorTotal },
  });
}

async function loadAttemptOwned(attemptId: string, userId: string) {
  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
    include: {
      package: true,
      sections: {
        orderBy: { urutan: "asc" },
        include: { subtest: true },
      },
    },
  });
  if (!attempt) throw new ExamError("Ujian tidak ditemukan.", 404);
  if (attempt.userId !== userId) throw new ExamError("Akses ditolak.", 403);
  return attempt;
}

export type ActiveQuestion = {
  answerId: string;
  questionId: string;
  urutan: number;
  subkategori: string | null;
  teks: string;
  arahTeks: string;
  options: { id: string; label: string; teks: string }[];
  pilihanOptionId: string | null;
  ragu: boolean;
};

export type AttemptState = {
  attemptId: string;
  status: string;
  finished: boolean;
  packageNama: string;
  sections: {
    id: string;
    kode: string;
    nama: string;
    urutan: number;
    status: string;
    jumlah: number;
  }[];
  active: {
    sectionId: string;
    kode: string;
    nama: string;
    urutan: number;
    totalSections: number;
    durasiDetik: number;
    serverNowMs: number;
    deadlineMs: number;
    questions: ActiveQuestion[];
  } | null;
};

/**
 * Mengambil state ujian dengan penegakan waktu di sisi server:
 * - memulai section berikutnya (set mulaiAt) secara lazy,
 * - meng-auto-submit section yang waktunya sudah habis,
 * - menyelesaikan attempt bila semua section selesai.
 */
export async function getAttemptState(
  attemptId: string,
  userId: string,
): Promise<AttemptState> {
  let attempt = await loadAttemptOwned(attemptId, userId);

  if (attempt.status !== "SELESAI") {
    // Loop untuk melewati section yang kedaluwarsa.
    // Batas iterasi = jumlah section + 1 (aman dari loop tak berujung).
    for (let guard = 0; guard <= attempt.sections.length; guard++) {
      const active = attempt.sections.find((s) => s.status !== "SELESAI");
      if (!active) {
        await finalizeAttempt(attempt.id);
        attempt = await loadAttemptOwned(attemptId, userId);
        break;
      }

      if (active.status === "BELUM" || !active.mulaiAt) {
        await prisma.attemptSection.update({
          where: { id: active.id },
          data: { status: "BERLANGSUNG", mulaiAt: new Date() },
        });
        attempt = await loadAttemptOwned(attemptId, userId);
        continue;
      }

      const deadline = active.mulaiAt.getTime() + active.durasiDetik * 1000;
      if (Date.now() >= deadline) {
        await scoreSection(active.id);
        attempt = await loadAttemptOwned(attemptId, userId);
        continue;
      }
      break; // section aktif masih berjalan
    }
  }

  const sectionsOverview = attempt.sections.map((s) => ({
    id: s.id,
    kode: s.subtest.kode,
    nama: s.subtest.nama,
    urutan: s.urutan,
    status: s.status,
    jumlah: 0,
  }));

  if (attempt.status === "SELESAI") {
    return {
      attemptId: attempt.id,
      status: attempt.status,
      finished: true,
      packageNama: attempt.package.nama,
      sections: sectionsOverview,
      active: null,
    };
  }

  const active = attempt.sections.find((s) => s.status !== "SELESAI");
  if (!active || !active.mulaiAt) {
    return {
      attemptId: attempt.id,
      status: attempt.status,
      finished: false,
      packageNama: attempt.package.nama,
      sections: sectionsOverview,
      active: null,
    };
  }

  const answers = await prisma.attemptAnswer.findMany({
    where: { attemptSectionId: active.id },
    orderBy: { urutan: "asc" },
    include: { question: { include: { options: true } } },
  });

  const questions: ActiveQuestion[] = answers.map((a) => {
    const order: string[] = JSON.parse(a.optionOrderJson);
    const byId = new Map(a.question.options.map((o) => [o.id, o]));
    const options = order
      .map((id, idx) => {
        const o = byId.get(id);
        if (!o) return null;
        return { id: o.id, label: LABELS[idx], teks: o.teks };
      })
      .filter((x): x is { id: string; label: string; teks: string } => x !== null);

    return {
      answerId: a.id,
      questionId: a.questionId,
      urutan: a.urutan,
      subkategori: a.question.subkategori,
      teks: a.question.teks,
      arahTeks: a.question.arahTeks,
      options,
      pilihanOptionId: a.pilihanOptionId,
      ragu: a.ragu,
    };
  });

  return {
    attemptId: attempt.id,
    status: attempt.status,
    finished: false,
    packageNama: attempt.package.nama,
    sections: sectionsOverview,
    active: {
      sectionId: active.id,
      kode: active.subtest.kode,
      nama: active.subtest.nama,
      urutan: active.urutan,
      totalSections: attempt.sections.length,
      durasiDetik: active.durasiDetik,
      serverNowMs: Date.now(),
      deadlineMs: active.mulaiAt.getTime() + active.durasiDetik * 1000,
      questions,
    },
  };
}

/** Menyimpan jawaban / tanda ragu (auto-save). Menolak jika section sudah selesai/kedaluwarsa. */
export async function saveAnswer(
  attemptId: string,
  userId: string,
  answerId: string,
  optionId: string | null,
  ragu: boolean | undefined,
): Promise<void> {
  const answer = await prisma.attemptAnswer.findUnique({
    where: { id: answerId },
    include: {
      attemptSection: { include: { attempt: true } },
      question: { include: { options: true } },
    },
  });
  if (!answer) throw new ExamError("Jawaban tidak ditemukan.", 404);
  const section = answer.attemptSection;
  if (section.attempt.id !== attemptId || section.attempt.userId !== userId) {
    throw new ExamError("Akses ditolak.", 403);
  }
  if (section.status === "SELESAI") {
    throw new ExamError("Subtes ini sudah selesai.", 409);
  }
  if (section.mulaiAt) {
    const deadline = section.mulaiAt.getTime() + section.durasiDetik * 1000;
    if (Date.now() >= deadline) {
      throw new ExamError("Waktu subtes ini telah habis.", 409);
    }
  }
  if (optionId !== null) {
    const valid = answer.question.options.some((o) => o.id === optionId);
    if (!valid) throw new ExamError("Opsi jawaban tidak valid.", 400);
  }

  await prisma.attemptAnswer.update({
    where: { id: answerId },
    data: {
      pilihanOptionId: optionId,
      ...(ragu === undefined ? {} : { ragu }),
    },
  });
}

/** Menyelesaikan section aktif lebih awal (tombol Selesai), lalu skor & lanjut. */
export async function submitSection(
  attemptId: string,
  userId: string,
  sectionId: string,
): Promise<void> {
  const section = await prisma.attemptSection.findUnique({
    where: { id: sectionId },
    include: { attempt: true },
  });
  if (!section) throw new ExamError("Subtes tidak ditemukan.", 404);
  if (section.attempt.id !== attemptId || section.attempt.userId !== userId) {
    throw new ExamError("Akses ditolak.", 403);
  }
  if (section.status !== "SELESAI") {
    await scoreSection(sectionId);
  }
  // Cek apakah semua section selesai → finalisasi attempt.
  const remaining = await prisma.attemptSection.count({
    where: { attemptId, status: { not: "SELESAI" } },
  });
  if (remaining === 0) {
    await finalizeAttempt(attemptId);
  }
}

export async function getResult(attemptId: string, userId: string) {
  const attempt = await loadAttemptOwned(attemptId, userId);
  if (attempt.status !== "SELESAI") {
    await finalizeAttempt(attemptId);
  }
  const fresh = await loadAttemptOwned(attemptId, userId);

  const sections = await Promise.all(
    fresh.sections.map(async (s) => {
      const total = await prisma.attemptAnswer.count({
        where: { attemptSectionId: s.id },
      });
      return {
        kode: s.subtest.kode,
        nama: s.subtest.nama,
        urutan: s.urutan,
        benar: s.benar ?? 0,
        salah: s.salah ?? 0,
        kosong: s.kosong ?? 0,
        total,
        nilai: total > 0 ? Math.round(((s.benar ?? 0) / total) * 100) : 0,
      };
    }),
  );

  const totalSoal = sections.reduce((a, s) => a + s.total, 0);
  const totalBenar = sections.reduce((a, s) => a + s.benar, 0);

  return {
    attemptId: fresh.id,
    packageNama: fresh.package.nama,
    mulaiAt: fresh.mulaiAt,
    selesaiAt: fresh.selesaiAt,
    sections: sections.sort((a, b) => a.urutan - b.urutan),
    totalSoal,
    totalBenar,
    nilaiTotal: totalSoal > 0 ? Math.round((totalBenar / totalSoal) * 100) : 0,
  };
}

export async function getReview(attemptId: string, userId: string) {
  const attempt = await loadAttemptOwned(attemptId, userId);

  const sections = await Promise.all(
    attempt.sections.map(async (s) => {
      const answers = await prisma.attemptAnswer.findMany({
        where: { attemptSectionId: s.id },
        orderBy: { urutan: "asc" },
        include: { question: { include: { options: true } } },
      });

      const soal = answers.map((a) => {
        const order: string[] = JSON.parse(a.optionOrderJson);
        const byId = new Map(a.question.options.map((o) => [o.id, o]));
        const options = order
          .map((id, idx) => {
            const o = byId.get(id);
            if (!o) return null;
            return {
              id: o.id,
              label: LABELS[idx],
              teks: o.teks,
              benar: o.isCorrect,
              dipilih: a.pilihanOptionId === o.id,
            };
          })
          .filter((x) => x !== null);
        const benar = a.question.options.find((o) => o.isCorrect);
        const dijawabBenar = Boolean(
          a.pilihanOptionId && benar?.id === a.pilihanOptionId,
        );
        return {
          urutan: a.urutan,
          subkategori: a.question.subkategori,
          teks: a.question.teks,
          arahTeks: a.question.arahTeks,
          pembahasan: a.question.pembahasan,
          dijawab: Boolean(a.pilihanOptionId),
          dijawabBenar,
          options,
        };
      });

      return {
        kode: s.subtest.kode,
        nama: s.subtest.nama,
        urutan: s.urutan,
        soal,
      };
    }),
  );

  return {
    attemptId: attempt.id,
    packageNama: attempt.package.nama,
    sections: sections.sort((a, b) => a.urutan - b.urutan),
  };
}

export async function listAttempts(userId: string) {
  const attempts = await prisma.attempt.findMany({
    where: { userId },
    orderBy: { mulaiAt: "desc" },
    include: { package: true },
  });
  return attempts.map((a) => ({
    id: a.id,
    packageNama: a.package.nama,
    status: a.status,
    mulaiAt: a.mulaiAt,
    selesaiAt: a.selesaiAt,
    skorTotal: a.skorTotal,
  }));
}
