"use client";

import { useCallback, useEffect, useState } from "react";

type Subtest = { id: string; kode: string; nama: string };
type Section = {
  id: string;
  urutan: number;
  jumlahSoal: number;
  durasiDetik: number;
  acakSoal: boolean;
  acakOpsi: boolean;
  subtest: { kode: string; nama: string };
};
type Pkg = {
  id: string;
  nama: string;
  mode: string;
  token: string;
  deskripsi: string | null;
  aktif: boolean;
  sections: Section[];
  _count: { attempts: number };
};

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Pkg[]>([]);
  const [subtests, setSubtests] = useState<Subtest[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    const data = await fetch("/api/admin/packages").then((r) => r.json());
    setPackages(data.packages ?? []);
    setSubtests(data.subtests ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleAktif(pkg: Pkg) {
    await fetch(`/api/admin/packages/${pkg.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...pkg, aktif: !pkg.aktif }),
    });
    load();
  }

  async function buatPaketDemo() {
    if (subtests.length < 3) return;
    const res = await fetch("/api/admin/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: "Paket Latihan Cepat",
        mode: "LATIHAN_LENGKAP",
        token: "CEPAT2026",
        deskripsi: "5 soal per subtes, 10 menit masing-masing.",
        sections: subtests.slice(0, 3).map((s, i) => ({
          subtestId: s.id,
          urutan: i + 1,
          jumlahSoal: 5,
          durasiDetik: 600,
        })),
      }),
    });
    if (res.ok) {
      setMsg("Paket latihan cepat dibuat (token: CEPAT2026).");
      load();
    }
  }

  return (
    <div className="space-y-6">
      {msg && (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950/40">
          {msg}
        </p>
      )}

      <button
        onClick={buatPaketDemo}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
      >
        + Buat Paket Latihan Cepat
      </button>

      <div className="space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{pkg.nama}</h3>
                <p className="text-sm text-slate-500">
                  Mode: {pkg.mode} · Token:{" "}
                  <span className="font-mono">{pkg.token}</span> · {pkg._count.attempts}{" "}
                  percobaan
                </p>
                {pkg.deskripsi && (
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {pkg.deskripsi}
                  </p>
                )}
              </div>
              <button
                onClick={() => toggleAktif(pkg)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  pkg.aktif
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {pkg.aktif ? "Aktif" : "Nonaktif"}
              </button>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              {pkg.sections.map((s) => (
                <li key={s.id} className="flex justify-between">
                  <span>
                    {s.urutan}. {s.subtest.nama}
                  </span>
                  <span>
                    {s.jumlahSoal} soal · {Math.round(s.durasiDetik / 60)}′
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
