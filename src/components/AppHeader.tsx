"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/Button";

export default function AppHeader({
  nama,
  nomorPeserta,
  role = "PESERTA",
}: {
  nama: string;
  nomorPeserta: string;
  role?: "PESERTA" | "ADMIN";
}) {
  const isAdmin = role === "ADMIN";
  const router = useRouter();
  const initials = nama
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm">
            <GraduationCap className="h-4 w-4" />
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-none">Simulasi CBT</p>
            <p className="text-[11px] text-[var(--muted-foreground)]">UIN Siber Cirebon</p>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAdmin && (
            <Link
              href="/dashboard"
              className="hidden text-sm font-medium text-[var(--primary)] hover:underline sm:inline"
            >
              Mode Peserta
            </Link>
          )}
          <ThemeToggle compact />
          <div className="hidden items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--muted)] px-2.5 py-1.5 sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)]/15 text-xs font-bold text-[var(--primary)]">
              {initials}
            </span>
            <div className="text-right leading-tight">
              <p className="max-w-[9rem] truncate text-sm font-semibold">{nama}</p>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                {isAdmin ? "Administrator" : `No. ${nomorPeserta}`}
              </p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={logout} className="!px-2.5">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
