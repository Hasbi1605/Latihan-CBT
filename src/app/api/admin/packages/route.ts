import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;

  const packages = await prisma.examPackage.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      sections: {
        orderBy: { urutan: "asc" },
        include: { subtest: { select: { kode: true, nama: true } } },
      },
      _count: { select: { attempts: true } },
    },
  });
  const subtests = await prisma.subtest.findMany({ orderBy: { urutan: "asc" } });
  return NextResponse.json({ packages, subtests });
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  const body = await req.json();
  const { nama, mode, token, deskripsi, aktif = true, sections } = body;
  if (!nama || !token || !Array.isArray(sections) || sections.length === 0) {
    return NextResponse.json({ error: "Data paket tidak lengkap." }, { status: 400 });
  }

  const pkg = await prisma.examPackage.create({
    data: {
      nama,
      mode: mode ?? "REPLIKA_2026",
      token,
      deskripsi,
      aktif,
      sections: {
        create: sections.map(
          (
            s: {
              subtestId: string;
              urutan: number;
              jumlahSoal: number;
              durasiDetik: number;
              acakSoal?: boolean;
              acakOpsi?: boolean;
            },
            i: number,
          ) => ({
            subtestId: s.subtestId,
            urutan: s.urutan ?? i + 1,
            jumlahSoal: s.jumlahSoal,
            durasiDetik: s.durasiDetik,
            acakSoal: s.acakSoal ?? true,
            acakOpsi: s.acakOpsi ?? true,
          }),
        ),
      },
    },
  });
  return NextResponse.json({ package: pkg }, { status: 201 });
}
