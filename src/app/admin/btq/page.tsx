"use client";

import { useCallback, useEffect, useState } from "react";

type Recording = {
  id: string;
  audioUrl: string | null;
  nilaiManual: number | null;
  rubrikKelancaran: number | null;
  rubrikTajwid: number | null;
  rubrikMakhraj: number | null;
  catatanPenguji: string | null;
  peserta: string;
  nomorPeserta: string;
  packageNama: string;
  subkategori: string | null;
  teks: string;
  dinilai: boolean;
};

export default function AdminBtqPage() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [draft, setDraft] = useState<
    Record<string, { k: number; t: number; m: number; catatan: string }>
  >({});

  const load = useCallback(async () => {
    const data = await fetch("/api/admin/recordings").then((r) => r.json());
    setRecordings(data.recordings ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function simpanNilai(r: Recording) {
    const d = draft[r.id] ?? {
      k: r.rubrikKelancaran ?? 3,
      t: r.rubrikTajwid ?? 3,
      m: r.rubrikMakhraj ?? 3,
      catatan: r.catatanPenguji ?? "",
    };
    await fetch("/api/admin/recordings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: r.id,
        rubrikKelancaran: d.k,
        rubrikTajwid: d.t,
        rubrikMakhraj: d.m,
        catatanPenguji: d.catatan,
      }),
    });
    load();
  }

  const pending = recordings.filter((r) => !r.dinilai);

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-500">
        {pending.length} rekaman menunggu penilaian · {recordings.length} total
      </p>

      {recordings.length === 0 ? (
        <p className="text-slate-500">Belum ada rekaman BTQ.</p>
      ) : (
        <div className="space-y-4">
          {recordings.map((r) => {
            const d = draft[r.id] ?? {
              k: r.rubrikKelancaran ?? 3,
              t: r.rubrikTajwid ?? 3,
              m: r.rubrikMakhraj ?? 3,
              catatan: r.catatanPenguji ?? "",
            };
            const preview = Math.round(((d.k + d.t + d.m) / 15) * 100);
            return (
              <div
                key={r.id}
                className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold">{r.peserta}</p>
                    <p className="text-sm text-slate-500">
                      {r.packageNama} · {r.subkategori}
                    </p>
                    <p className="mt-1 text-sm">{r.teks.slice(0, 120)}…</p>
                  </div>
                  {r.dinilai ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                      Nilai: {r.nilaiManual}
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700">
                      Menunggu
                    </span>
                  )}
                </div>

                {r.audioUrl && (
                  <audio controls src={r.audioUrl} className="mt-3 w-full max-w-md" />
                )}

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {(["k", "t", "m"] as const).map((key, i) => (
                    <label key={key} className="text-sm">
                      {["Kelancaran", "Tajwid", "Makhraj"][i]} (1–5)
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={d[key]}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            [r.id]: { ...d, [key]: Number(e.target.value) },
                          })
                        }
                        className="mt-1 w-full rounded border px-2 py-1 dark:border-slate-600 dark:bg-slate-900"
                      />
                    </label>
                  ))}
                </div>
                <textarea
                  placeholder="Catatan penguji"
                  rows={2}
                  value={d.catatan}
                  onChange={(e) =>
                    setDraft({ ...draft, [r.id]: { ...d, catatan: e.target.value } })
                  }
                  className="mt-3 w-full rounded border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
                />
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">Preview nilai: {preview}</span>
                  <button
                    onClick={() => simpanNilai(r)}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Simpan Nilai
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
