"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AppHeader({
  nama,
  nomorPeserta,
}: {
  nama: string;
  nomorPeserta: string;
}) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 font-bold text-white">
            C
          </span>
          <span className="font-semibold text-slate-800">Simulasi CBT UIN SSC</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-800">{nama}</p>
            <p className="text-xs text-slate-500">No. {nomorPeserta}</p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Keluar
          </button>
        </div>
      </div>
    </header>
  );
}
