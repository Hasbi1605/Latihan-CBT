import { prisma } from "@/lib/prisma";

export async function getAdminAnalytics() {
  const [totalUsers, totalAttempts, completedAttempts, totalQuestions, packages] =
    await Promise.all([
      prisma.user.count({ where: { role: "PESERTA" } }),
      prisma.attempt.count(),
      prisma.attempt.count({ where: { status: "SELESAI" } }),
      prisma.question.count(),
      prisma.examPackage.count({ where: { aktif: true } }),
    ]);

  const recentAttempts = await prisma.attempt.findMany({
    where: { status: "SELESAI" },
    orderBy: { selesaiAt: "desc" },
    take: 10,
    include: {
      user: { select: { nama: true, nomorPeserta: true } },
      package: { select: { nama: true } },
    },
  });

  const sections = await prisma.attemptSection.findMany({
    where: { status: "SELESAI", benar: { not: null } },
    include: { subtest: { select: { kode: true, nama: true } } },
  });

  const subtestStats = new Map<
    string,
    { kode: string; nama: string; benar: number; total: number }
  >();
  for (const s of sections) {
    const key = s.subtest.kode;
    const cur = subtestStats.get(key) ?? {
      kode: s.subtest.kode,
      nama: s.subtest.nama,
      benar: 0,
      total: 0,
    };
    cur.benar += s.benar ?? 0;
    cur.total += (s.benar ?? 0) + (s.salah ?? 0) + (s.kosong ?? 0);
    subtestStats.set(key, cur);
  }

  const pendingRecordings = await prisma.attemptRecording.count({
    where: { audioUrl: { not: null }, nilaiManual: null },
  });

  const answersSample = await prisma.attemptAnswer.findMany({
    where: { pilihanOptionId: { not: null } },
    include: {
      question: { select: { subkategori: true, id: true } },
    },
    take: 800,
  });

  const questionIds = [...new Set(answersSample.map((a) => a.questionId))];
  const correctOptions = await prisma.option.findMany({
    where: { questionId: { in: questionIds }, isCorrect: true },
    select: { id: true, questionId: true },
  });
  const correctByQ = new Map(correctOptions.map((o) => [o.questionId, o.id]));

  const subkatMap = new Map<string, { benar: number; total: number }>();
  for (const a of answersSample) {
    const sk = a.question.subkategori ?? "Lainnya";
    const cur = subkatMap.get(sk) ?? { benar: 0, total: 0 };
    cur.total++;
    if (a.pilihanOptionId === correctByQ.get(a.questionId)) cur.benar++;
    subkatMap.set(sk, cur);
  }

  const weakSubkategori = [...subkatMap.entries()]
    .map(([subkategori, v]) => ({
      subkategori,
      rataRata: v.total > 0 ? Math.round((v.benar / v.total) * 100) : 0,
      total: v.total,
    }))
    .filter((x) => x.total >= 3)
    .sort((a, b) => a.rataRata - b.rataRata)
    .slice(0, 8);

  return {
    summary: {
      totalUsers,
      totalAttempts,
      completedAttempts,
      totalQuestions,
      activePackages: packages,
      pendingRecordings,
    },
    subtestPerformance: [...subtestStats.values()].map((s) => ({
      ...s,
      rataRata: s.total > 0 ? Math.round((s.benar / s.total) * 100) : 0,
    })),
    weakSubkategori,
    recentAttempts: recentAttempts.map((a) => ({
      id: a.id,
      nama: a.user.nama,
      nomorPeserta: a.user.nomorPeserta,
      packageNama: a.package.nama,
      skorTotal: a.skorTotal,
      selesaiAt: a.selesaiAt,
    })),
  };
}
