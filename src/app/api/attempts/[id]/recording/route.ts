import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getSessionUser } from "@/lib/auth";
import { ExamError, saveRecording } from "@/lib/exam";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = new Set([
  "audio/webm",
  "audio/ogg",
  "audio/wav",
  "audio/x-wav",
  "audio/mpeg",
  "application/octet-stream", // beberapa browser kirim blob tanpa MIME spesifik
]);

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

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `Ukuran audio maksimal ${MAX_BYTES / (1024 * 1024)} MB.` },
      { status: 413 },
    );
  }

  const mime = file.type || "application/octet-stream";
  if (!ALLOWED_TYPES.has(mime)) {
    return NextResponse.json(
      { error: "Format audio tidak didukung. Gunakan WebM, OGG, atau WAV." },
      { status: 415 },
    );
  }

  const ext = mime.includes("ogg") ? "ogg" : mime.includes("wav") ? "wav" : "webm";
  const dir = path.join(process.cwd(), "uploads", id);
  await mkdir(dir, { recursive: true });
  const filename = `${answerId}.${ext}`;
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
