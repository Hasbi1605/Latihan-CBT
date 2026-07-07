"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  Mic,
  Package,
  Users,
} from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";

type Analytics = {
  summary: {
    totalUsers: number;
    totalAttempts: number;
    completedAttempts: number;
    totalQuestions: number;
    activePackages: number;
    pendingRecordings: number;
  };
  subtestPerformance: Array<{
    kode: string;
    nama: string;
    rataRata: number;
    benar: number;
    total: number;
  }>;
  weakSubkategori: Array<{ subkategori: string; rataRata: number; total: number }>;
  recentAttempts: Array<{
    id: string;
    nama: string;
    nomorPeserta: string;
    packageNama: string;
    skorTotal: number | null;
    selesaiAt: string | null;
  }>;
};

export default function AdminDashboard() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <Card>
        <CardBody className="py-12 text-center text-[var(--muted-foreground)]">
          Memuat analitik…
        </CardBody>
      </Card>
    );
  }

  const s = data.summary;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Peserta" value={s.totalUsers} icon={Users} tone="sky" />
        <StatCard
          label="Total Percobaan"
          value={s.totalAttempts}
          icon={BarChart3}
          tone="emerald"
          sub={`${s.completedAttempts} selesai`}
        />
        <StatCard label="Bank Soal" value={s.totalQuestions} icon={BookOpen} tone="violet" />
        <StatCard label="Paket Aktif" value={s.activePackages} icon={Package} tone="amber" />
        <StatCard
          label="BTQ Menunggu"
          value={s.pendingRecordings}
          icon={Mic}
          tone="rose"
        />
        <StatCard
          label="Tingkat Selesai"
          value={
            s.totalAttempts
              ? `${Math.round((s.completedAttempts / s.totalAttempts) * 100)}%`
              : "—"
          }
          icon={ClipboardCheck}
          tone="emerald"
        />
      </div>

      <Card>
        <CardBody>
          <h2 className="mb-4 font-bold">Performa per Subtes</h2>
          <div className="space-y-3">
            {data.subtestPerformance.map((st) => (
              <div key={st.kode}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{st.nama}</span>
                  <span className="font-bold text-[var(--primary)]">{st.rataRata}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[var(--muted)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    style={{ width: `${st.rataRata}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {data.weakSubkategori.length > 0 && (
        <Card>
          <CardBody>
            <h2 className="mb-3 font-bold">Subkategori Perlu Perhatian</h2>
            <ul className="space-y-2">
              {data.weakSubkategori.map((w) => (
                <li
                  key={w.subkategori}
                  className="flex justify-between rounded-xl bg-amber-500/10 px-3 py-2 text-sm"
                >
                  <span>{w.subkategori}</span>
                  <span className="font-semibold text-amber-700 dark:text-amber-300">
                    {w.rataRata}% · {w.total} jawaban
                  </span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardBody className="overflow-x-auto p-0 sm:p-0">
          <div className="border-b border-[var(--border)] px-5 py-4">
            <h2 className="font-bold">Percobaan Terbaru</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-[var(--muted)] text-left text-[var(--muted-foreground)]">
              <tr>
                <th className="px-4 py-3 font-medium">Peserta</th>
                <th className="px-4 py-3 font-medium">Paket</th>
                <th className="px-4 py-3 font-medium">Skor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {data.recentAttempts.map((a) => (
                <tr key={a.id} className="hover:bg-[var(--muted)]/40">
                  <td className="px-4 py-3 font-medium">{a.nama}</td>
                  <td className="px-4 py-3 text-[var(--muted-foreground)]">{a.packageNama}</td>
                  <td className="px-4 py-3 font-semibold">{a.skorTotal ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
