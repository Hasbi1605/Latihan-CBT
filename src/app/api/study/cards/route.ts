import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getStudyCards } from "@/lib/study";

export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Tidak masuk." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const subtestId = searchParams.get("subtestId");
  if (!subtestId) {
    return NextResponse.json({ error: "subtestId wajib." }, { status: 400 });
  }

  const subkategori = searchParams.get("subkategori");
  const limitRaw = searchParams.get("limit");
  const limit = limitRaw ? Number(limitRaw) : 20;
  const shuffle = searchParams.get("shuffle") !== "0";

  if (!Number.isFinite(limit) || limit < 1) {
    return NextResponse.json({ error: "limit tidak valid." }, { status: 400 });
  }

  const { deck, cards } = await getStudyCards({
    subtestId,
    subkategori,
    limit,
    shuffle,
  });

  if (!deck) {
    return NextResponse.json({ error: "Deck tidak ditemukan." }, { status: 404 });
  }

  return NextResponse.json({ deck, cards });
}
