import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Tidak masuk." }, { status: 401 });

  const packages = await prisma.examPackage.findMany({
    where: { aktif: true },
    orderBy: { createdAt: "desc" },
    include: {
      sections: {
        orderBy: { urutan: "asc" },
        include: { subtest: true },
      },
    },
  });

  const data = packages.map((p) => {
    const totalSoal = p.sections.reduce((a, s) => a + s.jumlahSoal, 0);
    const totalDetik = p.sections.reduce((a, s) => a + s.durasiDetik, 0);
    return {
      id: p.id,
      nama: p.nama,
      mode: p.mode,
      deskripsi: p.deskripsi,
      totalSoal,
      totalMenit: Math.round(totalDetik / 60),
      sections: p.sections.map((s) => ({
        kode: s.subtest.kode,
        nama: s.subtest.nama,
        jumlahSoal: s.jumlahSoal,
        menit: Math.round(s.durasiDetik / 60),
      })),
    };
  });

  return NextResponse.json({ packages: data });
}
