import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const { searchParams } = new URL(req.url);
  const subtestKode = searchParams.get("subtest");

  const questions = await prisma.question.findMany({
    where: subtestKode
      ? { subtest: { kode: subtestKode } }
      : undefined,
    include: {
      subtest: { select: { kode: true, nama: true } },
      options: { orderBy: { label: "asc" } },
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({
    exportedAt: new Date().toISOString(),
    questions: questions.map((q) => ({
      subtestKode: q.subtest.kode,
      subkategori: q.subkategori,
      teks: q.teks,
      tipe: q.tipe,
      arahTeks: q.arahTeks,
      tingkat: q.tingkat,
      pembahasan: q.pembahasan,
      gambarUrl: q.gambarUrl,
      opsi: q.options.map((o) => ({ teks: o.teks, benar: o.isCorrect })),
    })),
  });
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  const body = await req.json();
  const items = body.questions as Array<{
    subtestKode: string;
    subkategori?: string;
    teks: string;
    tipe?: string;
    arahTeks?: string;
    tingkat?: string;
    pembahasan?: string;
    gambarUrl?: string;
    opsi?: Array<{ teks: string; benar?: boolean }>;
  }>;

  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "Format tidak valid." }, { status: 400 });
  }

  const subtests = await prisma.subtest.findMany();
  const byKode = new Map(subtests.map((s) => [s.kode, s.id]));
  let imported = 0;

  for (const item of items) {
    const subtestId = byKode.get(item.subtestKode);
    if (!subtestId || !item.teks) continue;
    const tipe = item.tipe ?? "PG";
    await prisma.question.create({
      data: {
        subtestId,
        subkategori: item.subkategori,
        teks: item.teks,
        tipe,
        arahTeks: item.arahTeks ?? "LTR",
        tingkat: item.tingkat ?? "SEDANG",
        pembahasan: item.pembahasan,
        gambarUrl: item.gambarUrl,
        ...(tipe === "PG" && item.opsi
          ? {
              options: {
                create: item.opsi.map((o, i) => ({
                  label: String.fromCharCode(65 + i),
                  teks: o.teks,
                  isCorrect: Boolean(o.benar),
                })),
              },
            }
          : {}),
      },
    });
    imported++;
  }

  return NextResponse.json({ imported, total: items.length });
}
