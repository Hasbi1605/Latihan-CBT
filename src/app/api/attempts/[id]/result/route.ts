import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { ExamError, getResult } from "@/lib/exam";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Tidak masuk." }, { status: 401 });
  const { id } = await context.params;
  try {
    const result = await getResult(id, user.userId);
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof ExamError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    throw e;
  }
}
