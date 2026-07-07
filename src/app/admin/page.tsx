"use client";

import { useEffect, useState } from "react";

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

  if (!data) return <p className="text-slate-500">Memuat analitik…</p>;

  const s = data.summary;
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Peserta", s.totalUsers],
          ["Total Percobaan", s.totalAttempts],
          ["Selesai", s.completedAttempts],
          ["Soal", s.totalQuestions],
          ["Paket Aktif", s.activePackages],
          ["BTQ Menunggu Nilai", s.pendingRecordings],
        ].map(([label, val]) => (
          <div
            key={label as string}
            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-bold">{val as number}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-3 font-semibold">Performa per Subtes</h2>
        <div className="space-y-2">
          {data.subtestPerformance.map((st) => (
            <div
              key={st.kode}
              className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex justify-between text-sm">
                <span>{st.nama}</span>
                <span className="font-semibold">{st.rataRata}%</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${st.rataRata}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {data.weakSubkategori.length > 0 && (
        <section>
          <h2 className="mb-3 font-semibold">Subkategori Perlu Perhatian</h2>
          <ul className="space-y-1 text-sm">
            {data.weakSubkategori.map((w) => (
              <li key={w.subkategori} className="flex justify-between rounded bg-amber-50 px-3 py-2 dark:bg-amber-950/30">
                <span>{w.subkategori}</span>
                <span>{w.rataRata}% ({w.total} jawaban)</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-3 font-semibold">Percobaan Terbaru</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left dark:bg-slate-800">
              <tr>
                <th className="px-3 py-2">Peserta</th>
                <th className="px-3 py-2">Paket</th>
                <th className="px-3 py-2">Skor</th>
              </tr>
            </thead>
            <tbody>
              {data.recentAttempts.map((a) => (
                <tr key={a.id} className="border-t border-slate-100 dark:border-slate-700">
                  <td className="px-3 py-2">{a.nama}</td>
                  <td className="px-3 py-2">{a.packageNama}</td>
                  <td className="px-3 py-2">{a.skorTotal ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
