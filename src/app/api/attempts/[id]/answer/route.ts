import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { ExamError, saveAnswer } from "@/lib/exam";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Tidak masuk." }, { status: 401 });
  const { id } = await context.params;

  let body: { answerId?: string; optionId?: string | null; ragu?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }
  if (!body.answerId) {
    return NextResponse.json({ error: "answerId wajib." }, { status: 400 });
  }

  try {
    await saveAnswer(
      id,
      user.userId,
      body.answerId,
      body.optionId ?? null,
      body.ragu,
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof ExamError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    throw e;
  }
}
