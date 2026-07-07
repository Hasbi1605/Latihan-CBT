import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const recordings = await prisma.attemptRecording.findMany({
    where: { audioUrl: { not: null } },
    orderBy: { createdAt: "desc" },
    include: {
      question: { select: { teks: true, subkategori: true } },
      attemptSection: {
        include: {
          attempt: {
            include: {
              user: { select: { nama: true, nomorPeserta: true } },
              package: { select: { nama: true } },
            },
          },
        },
      },
    },
  });

  return NextResponse.json({
    recordings: recordings.map((r) => ({
      id: r.id,
      audioUrl: r.audioUrl,
      nilaiManual: r.nilaiManual,
      rubrikKelancaran: r.rubrikKelancaran,
      rubrikTajwid: r.rubrikTajwid,
      rubrikMakhraj: r.rubrikMakhraj,
      catatanPenguji: r.catatanPenguji,
      peserta: r.attemptSection.attempt.user.nama,
      nomorPeserta: r.attemptSection.attempt.user.nomorPeserta,
      packageNama: r.attemptSection.attempt.package.nama,
      attemptId: r.attemptSection.attemptId,
      subkategori: r.question.subkategori,
      teks: r.question.teks,
      dinilai: r.nilaiManual !== null,
    })),
  });
}

export async function PATCH(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  const body = await req.json();
  const { id, rubrikKelancaran, rubrikTajwid, rubrikMakhraj, catatanPenguji } = body;
  if (!id) return NextResponse.json({ error: "id wajib." }, { status: 400 });

  const k = Number(rubrikKelancaran) || 0;
  const t = Number(rubrikTajwid) || 0;
  const m = Number(rubrikMakhraj) || 0;
  const nilaiManual = Math.round(((k + t + m) / 15) * 100);

  const rec = await prisma.attemptRecording.update({
    where: { id },
    data: {
      rubrikKelancaran: k,
      rubrikTajwid: t,
      rubrikMakhraj: m,
      nilaiManual,
      catatanPenguji,
    },
  });
  return NextResponse.json({ recording: rec });
}
