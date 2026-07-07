import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { ExamError, startAttempt, listAttempts } from "@/lib/exam";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Tidak masuk." }, { status: 401 });
  const attempts = await listAttempts(user.userId);
  return NextResponse.json({ attempts });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Tidak masuk." }, { status: 401 });

  let body: { packageId?: string; token?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }
  if (!body.packageId || !body.token) {
    return NextResponse.json(
      { error: "Paket dan token wajib diisi." },
      { status: 400 },
    );
  }

  try {
    const attemptId = await startAttempt(user.userId, body.packageId, body.token);
    return NextResponse.json({ attemptId });
  } catch (e) {
    if (e instanceof ExamError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    throw e;
  }
}
