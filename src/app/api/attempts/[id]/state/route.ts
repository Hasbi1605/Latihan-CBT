import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { ExamError, getAttemptState } from "@/lib/exam";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Tidak masuk." }, { status: 401 });
  const { id } = await context.params;
  try {
    const state = await getAttemptState(id, user.userId);
    return NextResponse.json(state);
  } catch (e) {
    if (e instanceof ExamError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    throw e;
  }
}
