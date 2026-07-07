import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  const { id } = await context.params;
  const body = await req.json();

  const question = await prisma.$transaction(async (tx) => {
    const updated = await tx.question.update({
      where: { id },
      data: {
        subtestId: body.subtestId,
        subkategori: body.subkategori,
        teks: body.teks,
        tipe: body.tipe,
        arahTeks: body.arahTeks,
        tingkat: body.tingkat,
        pembahasan: body.pembahasan,
        gambarUrl: body.gambarUrl,
      },
    });

    if (body.tipe === "PG" && Array.isArray(body.opsi)) {
      await tx.option.deleteMany({ where: { questionId: id } });
      const opsi = body.opsi.filter((o: { teks: string }) => o.teks?.trim());
      if (opsi.length > 0) {
        await tx.option.createMany({
          data: opsi.map((o: { teks: string; benar?: boolean }, i: number) => ({
            questionId: id,
            label: String.fromCharCode(65 + i),
            teks: o.teks,
            isCorrect: Boolean(o.benar),
          })),
        });
      }
    } else if (body.tipe === "REKAMAN") {
      await tx.option.deleteMany({ where: { questionId: id } });
    }

    return updated;
  });

  return NextResponse.json({ question });
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  const { id } = await context.params;
  await prisma.question.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
