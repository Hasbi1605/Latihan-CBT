import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import type { SessionPayload } from "@/lib/session";

type AdminResult =
  | { user: SessionPayload; error?: never }
  | { user?: never; error: NextResponse };

export async function requireAdmin(): Promise<AdminResult> {
  const user = await getSessionUser();
  if (!user) {
    return {
      error: NextResponse.json({ error: "Tidak masuk." }, { status: 401 }),
    };
  }
  if (user.role !== "ADMIN") {
    return {
      error: NextResponse.json({ error: "Akses admin ditolak." }, { status: 403 }),
    };
  }
  return { user };
}

export async function requireAdminPage() {
  const user = await getSessionUser();
  if (!user) return { redirect: "/login?next=/admin" as const };
  if (user.role !== "ADMIN") return { redirect: "/dashboard" as const };
  return { user };
}
