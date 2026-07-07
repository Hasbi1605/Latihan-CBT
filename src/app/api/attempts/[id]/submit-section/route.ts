import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { ExamError, submitSection } from "@/lib/exam";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Tidak masuk." }, { status: 401 });
  const { id } = await context.params;

  let body: { sectionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }
  if (!body.sectionId) {
    return NextResponse.json({ error: "sectionId wajib." }, { status: 400 });
  }

  try {
    await submitSection(id, user.userId, body.sectionId);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof ExamError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    throw e;
  }
}
