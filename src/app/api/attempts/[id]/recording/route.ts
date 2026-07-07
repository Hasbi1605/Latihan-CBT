import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getSessionUser } from "@/lib/auth";
import { ExamError, saveRecording } from "@/lib/exam";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Tidak masuk." }, { status: 401 });
  const { id } = await context.params;

  const form = await req.formData();
  const answerId = form.get("answerId")?.toString();
  const file = form.get("audio");
  if (!answerId || !(file instanceof Blob)) {
    return NextResponse.json({ error: "answerId dan audio wajib." }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "uploads", id);
  await mkdir(dir, { recursive: true });
  const filename = `${answerId}.webm`;
  const filepath = path.join(dir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);
  const audioUrl = `/api/uploads/${id}/${filename}`;

  try {
    await saveRecording(id, user.userId, answerId, audioUrl);
    return NextResponse.json({ ok: true, audioUrl });
  } catch (e) {
    if (e instanceof ExamError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    throw e;
  }
}
