import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";
import { SESSION_COOKIE, createSessionToken, sessionCookieOptions } from "@/lib/session";

export async function POST(req: Request) {
  let body: { nomorPeserta?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }

  const nomorPeserta = body.nomorPeserta?.trim();
  const password = body.password ?? "";

  if (!nomorPeserta || !password) {
    return NextResponse.json(
      { error: "Nomor peserta dan kata sandi wajib diisi." },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({ where: { nomorPeserta } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json(
      { error: "Nomor peserta atau kata sandi salah." },
      { status: 401 },
    );
  }

  const token = await createSessionToken({
    userId: user.id,
    role: user.role,
    nama: user.nama,
    nomorPeserta: user.nomorPeserta,
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({
    user: {
      nama: user.nama,
      nomorPeserta: user.nomorPeserta,
      role: user.role,
    },
  });
}
