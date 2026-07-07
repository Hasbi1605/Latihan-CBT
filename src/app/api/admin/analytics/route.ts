import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminAnalytics } from "@/lib/analytics";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.error) return auth.error;
  const data = await getAdminAnalytics();
  return NextResponse.json(data);
}
