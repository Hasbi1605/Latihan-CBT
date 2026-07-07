"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ClipboardList,
  Mic,
  Package,
} from "lucide-react";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/questions", label: "Bank Soal", icon: ClipboardList },
  { href: "/admin/packages", label: "Paket Ujian", icon: Package },
  { href: "/admin/btq", label: "Penilaian BTQ", icon: Mic },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-4">
      {links.map((l) => {
        const active = path === l.href;
        const Icon = l.icon;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition",
              active
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                : "bg-[var(--muted)] text-[var(--foreground)] hover:brightness-95",
            )}
          >
            <Icon className="h-4 w-4" />
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
