import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { ExamError, getReview } from "@/lib/exam";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Tidak masuk." }, { status: 401 });
  const { id } = await context.params;
  try {
    const review = await getReview(id, user.userId);
    return NextResponse.json(review);
  } catch (e) {
    if (e instanceof ExamError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    throw e;
  }
}
