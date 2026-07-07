import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const subtests = await prisma.subtest.findMany({ orderBy: { urutan: "asc" } });
  const questions = await prisma.question.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      subtest: { select: { kode: true, nama: true } },
      options: true,
      _count: { select: { options: true } },
    },
  });

  return NextResponse.json({
    subtests,
    questions: questions.map((q) => ({
      id: q.id,
      subtestKode: q.subtest.kode,
      subtestNama: q.subtest.nama,
      subkategori: q.subkategori,
      teks: q.teks,
      tipe: q.tipe,
      arahTeks: q.arahTeks,
      tingkat: q.tingkat,
      pembahasan: q.pembahasan,
      gambarUrl: q.gambarUrl,
      optionCount: q.options.length,
    })),
  });
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const body = await req.json();
  const {
    subtestId,
    subkategori,
    teks,
    tipe = "PG",
    arahTeks = "LTR",
    tingkat = "SEDANG",
    pembahasan,
    gambarUrl,
    opsi = [],
  } = body;

  if (!subtestId || !teks) {
    return NextResponse.json({ error: "subtestId dan teks wajib." }, { status: 400 });
  }

  const question = await prisma.question.create({
    data: {
      subtestId,
      subkategori,
      teks,
      tipe,
      arahTeks,
      tingkat,
      pembahasan,
      gambarUrl,
      ...(tipe === "PG" && Array.isArray(opsi)
        ? {
            options: {
              create: opsi.map(
                (o: { teks: string; benar?: boolean }, i: number) => ({
                  label: String.fromCharCode(65 + i),
                  teks: o.teks,
                  isCorrect: Boolean(o.benar),
                }),
              ),
            },
          }
        : {}),
    },
  });

  return NextResponse.json({ question }, { status: 201 });
}
