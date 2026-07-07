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

  const question = await prisma.question.update({
    where: { id },
    data: {
      subkategori: body.subkategori,
      teks: body.teks,
      tipe: body.tipe,
      arahTeks: body.arahTeks,
      tingkat: body.tingkat,
      pembahasan: body.pembahasan,
      gambarUrl: body.gambarUrl,
    },
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
