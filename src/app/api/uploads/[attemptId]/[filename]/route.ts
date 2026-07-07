import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  context: { params: Promise<{ attemptId: string; filename: string }> },
) {
  const user = await getSessionUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const { attemptId, filename } = await context.params;
  if (!/^[a-z0-9]+\.webm$/i.test(filename)) {
    return new NextResponse("Invalid", { status: 400 });
  }

  const attempt = await prisma.attempt.findUnique({ where: { id: attemptId } });
  if (!attempt) return new NextResponse("Not found", { status: 404 });
  if (user.role !== "ADMIN" && attempt.userId !== user.userId) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const filepath = path.join(process.cwd(), "uploads", attemptId, filename);
  try {
    const data = await readFile(filepath);
    return new NextResponse(data, {
      headers: { "Content-Type": "audio/webm" },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
