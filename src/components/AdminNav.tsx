"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/questions", label: "Bank Soal" },
  { href: "/admin/packages", label: "Paket Ujian" },
  { href: "/admin/btq", label: "Penilaian BTQ" },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 dark:border-slate-700">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
            path === l.href
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
          }`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
