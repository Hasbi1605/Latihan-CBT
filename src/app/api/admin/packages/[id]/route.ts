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

  const pkg = await prisma.examPackage.update({
    where: { id },
    data: {
      nama: body.nama,
      mode: body.mode,
      token: body.token,
      deskripsi: body.deskripsi,
      aktif: body.aktif,
    },
  });
  return NextResponse.json({ package: pkg });
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  const { id } = await context.params;
  await prisma.examPackage.update({
    where: { id },
    data: { aktif: false },
  });
  return NextResponse.json({ ok: true });
}
