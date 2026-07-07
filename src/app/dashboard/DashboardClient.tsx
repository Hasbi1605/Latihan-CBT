"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PackageSection = {
  kode: string;
  nama: string;
  jumlahSoal: number;
  menit: number;
};
type ExamPackage = {
  id: string;
  nama: string;
  mode: string;
  deskripsi: string | null;
  totalSoal: number;
  totalMenit: number;
  sections: PackageSection[];
};
type Attempt = {
  id: string;
  packageNama: string;
  status: string;
  mulaiAt: string;
  selesaiAt: string | null;
  skorTotal: number | null;
};

function formatTanggal(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function DashboardClient({ nama }: { nama: string }) {
  const router = useRouter();
  const [packages, setPackages] = useState<ExamPackage[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePkg, setActivePkg] = useState<ExamPackage | null>(null);
  const [token, setToken] = useState("");
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [p, a] = await Promise.all([
      fetch("/api/packages").then((r) => r.json()),
      fetch("/api/attempts").then((r) => r.json()),
    ]);
    setPackages(p.packages ?? []);
    setAttempts(a.attempts ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function mulai() {
    if (!activePkg) return;
    setStarting(true);
    setError(null);
    try {
      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: activePkg.id, token }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal memulai ujian.");
        return;
      }
      router.push(`/ujian/${data.attemptId}`);
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setStarting(false);
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-bold text-slate-900">
          Assalamualaikum, {nama} 👋
        </h1>
        <p className="mt-1 text-slate-600">
          Pilih paket simulasi di bawah ini untuk mulai berlatih.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-800">
          Paket Simulasi
        </h2>
        {loading ? (
          <p className="text-slate-500">Memuat…</p>
        ) : packages.length === 0 ? (
          <p className="text-slate-500">Belum ada paket ujian.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{pkg.nama}</h3>
                  <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    {pkg.mode === "REPLIKA_2026" ? "Replika 2026" : pkg.mode}
                  </span>
                </div>
                {pkg.deskripsi && (
                  <p className="mt-2 text-sm text-slate-500">{pkg.deskripsi}</p>
                )}
                <div className="mt-3 flex gap-4 text-sm text-slate-600">
                  <span>
                    <strong>{pkg.totalSoal}</strong> soal
                  </span>
                  <span>
                    <strong>{pkg.totalMenit}</strong> menit
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-slate-500">
                  {pkg.sections.map((s) => (
                    <li key={s.kode} className="flex justify-between">
                      <span>{s.nama}</span>
                      <span className="text-slate-400">
                        {s.jumlahSoal} soal · {s.menit}′
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setActivePkg(pkg);
                    setToken("");
                    setError(null);
                  }}
                  className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Mulai Ujian
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-800">
          Riwayat Latihan
        </h2>
        {loading ? (
          <p className="text-slate-500">Memuat…</p>
        ) : attempts.length === 0 ? (
          <p className="text-slate-500">Belum ada riwayat. Ayo mulai latihan!</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Paket</th>
                  <th className="px-4 py-3 font-medium">Mulai</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attempts.map((a) => (
                  <tr key={a.id}>
                    <td className="px-4 py-3 text-slate-800">{a.packageNama}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {formatTanggal(a.mulaiAt)}
                    </td>
                    <td className="px-4 py-3">
                      {a.status === "SELESAI" ? (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          Selesai
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                          Berlangsung
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {a.status === "SELESAI" ? (
                        <Link
                          href={`/hasil/${a.id}`}
                          className="font-medium text-emerald-600 hover:underline"
                        >
                          Lihat Hasil
                        </Link>
                      ) : (
                        <Link
                          href={`/ujian/${a.id}`}
                          className="font-medium text-amber-600 hover:underline"
                        >
                          Lanjutkan
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {activePkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">
              Mulai: {activePkg.nama}
            </h3>
            <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              <p>
                Ujian terdiri dari <strong>{activePkg.totalSoal} soal</strong> dalam{" "}
                <strong>{activePkg.totalMenit} menit</strong>, dikerjakan{" "}
                <strong>berurutan per subtes</strong>. Setiap subtes memiliki timer
                sendiri dan tidak dapat diulang setelah waktunya habis.
              </p>
            </div>
            <label className="mt-4 block text-sm font-medium text-slate-700">
              Token Ujian
            </label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Masukkan token dari pengawas"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 uppercase tracking-wider outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
            <p className="mt-1 text-xs text-slate-400">
              Token demo: <span className="font-mono">UINSSC2026</span>
            </p>

            {error && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setActivePkg(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                onClick={mulai}
                disabled={starting || !token}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {starting ? "Memulai…" : "Mulai Sekarang"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
