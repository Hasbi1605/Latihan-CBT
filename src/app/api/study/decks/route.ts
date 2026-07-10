import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { listStudyDecks } from "@/lib/study";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Tidak masuk." }, { status: 401 });
  }

  const decks = await listStudyDecks();
  return NextResponse.json({ decks });
}
