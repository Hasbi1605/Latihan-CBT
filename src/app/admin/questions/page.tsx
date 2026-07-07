"use client";

import { useCallback, useEffect, useState } from "react";

type Subtest = { id: string; kode: string; nama: string };
type Question = {
  id: string;
  subtestKode: string;
  subtestNama: string;
  subkategori: string | null;
  teks: string;
  tipe: string;
  arahTeks: string;
  tingkat: string;
  pembahasan: string | null;
  gambarUrl: string | null;
  optionCount: number;
};

const emptyForm = {
  subtestId: "",
  subkategori: "",
  teks: "",
  tipe: "PG",
  arahTeks: "LTR",
  tingkat: "SEDANG",
  pembahasan: "",
  gambarUrl: "",
  opsi: [
    { teks: "", benar: true },
    { teks: "", benar: false },
    { teks: "", benar: false },
    { teks: "", benar: false },
  ],
};

export default function AdminQuestionsPage() {
  const [subtests, setSubtests] = useState<Subtest[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    const data = await fetch("/api/admin/questions").then((r) => r.json());
    setSubtests(data.subtests ?? []);
    setQuestions(data.questions ?? []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = filter
    ? questions.filter((q) => q.subtestKode === filter)
    : questions;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    const payload = {
      ...form,
      opsi: form.tipe === "PG" ? form.opsi.filter((o) => o.teks.trim()) : [],
    };
    const url = editId ? `/api/admin/questions/${editId}` : "/api/admin/questions";
    const method = editId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const d = await res.json();
      setMsg(d.error || "Gagal menyimpan.");
      return;
    }
    setForm(emptyForm);
    setEditId(null);
    setMsg(editId ? "Soal diperbarui." : "Soal ditambahkan.");
    load();
  }

  async function hapus(id: string) {
    if (!confirm("Hapus soal ini?")) return;
    await fetch(`/api/admin/questions/${id}`, { method: "DELETE" });
    load();
  }

  async function exportJson() {
    const url = filter
      ? `/api/admin/questions/import-export?subtest=${filter}`
      : "/api/admin/questions/import-export";
    const data = await fetch(url).then((r) => r.json());
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `soal-${filter || "semua"}.json`;
    a.click();
  }

  async function importJson(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const parsed = JSON.parse(text);
    const res = await fetch("/api/admin/questions/import-export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questions: parsed.questions ?? parsed }),
    });
    const d = await res.json();
    setMsg(`Import: ${d.imported}/${d.total} soal.`);
    load();
    e.target.value = "";
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        >
          <option value="">Semua subtes</option>
          {subtests.map((s) => (
            <option key={s.id} value={s.kode}>
              {s.kode} — {s.nama}
            </option>
          ))}
        </select>
        <button
          onClick={exportJson}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600"
        >
          Export JSON
        </button>
        <label className="cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600">
          Import JSON
          <input type="file" accept=".json" className="hidden" onChange={importJson} />
        </label>
        <span className="text-sm text-slate-500">{filtered.length} soal</span>
      </div>

      {msg && (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          {msg}
        </p>
      )}

      <form
        onSubmit={submit}
        className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
      >
        <h2 className="font-semibold">{editId ? "Edit Soal" : "Tambah Soal"}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <select
            required
            value={form.subtestId}
            onChange={(e) => setForm({ ...form, subtestId: e.target.value })}
            className="rounded border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          >
            <option value="">Pilih subtes</option>
            {subtests.map((s) => (
              <option key={s.id} value={s.id}>
                {s.kode}
              </option>
            ))}
          </select>
          <select
            value={form.tipe}
            onChange={(e) => setForm({ ...form, tipe: e.target.value })}
            className="rounded border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          >
            <option value="PG">Pilihan Ganda</option>
            <option value="REKAMAN">Rekaman (BTQ)</option>
          </select>
        </div>
        <input
          placeholder="Subkategori"
          value={form.subkategori}
          onChange={(e) => setForm({ ...form, subkategori: e.target.value })}
          className="w-full rounded border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
        />
        <textarea
          required
          placeholder="Teks soal"
          rows={3}
          value={form.teks}
          onChange={(e) => setForm({ ...form, teks: e.target.value })}
          className="w-full rounded border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
        />
        {form.tipe === "PG" &&
          form.opsi.map((o, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder={`Opsi ${String.fromCharCode(65 + i)}`}
                value={o.teks}
                onChange={(e) => {
                  const opsi = [...form.opsi];
                  opsi[i] = { ...opsi[i], teks: e.target.value };
                  setForm({ ...form, opsi });
                }}
                className="flex-1 rounded border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
              />
              <label className="flex items-center gap-1 text-sm">
                <input
                  type="radio"
                  name="benar"
                  checked={o.benar}
                  onChange={() => {
                    const opsi = form.opsi.map((x, j) => ({ ...x, benar: j === i }));
                    setForm({ ...form, opsi });
                  }}
                />
                Benar
              </label>
            </div>
          ))}
        <textarea
          placeholder="Pembahasan (opsional)"
          rows={2}
          value={form.pembahasan}
          onChange={(e) => setForm({ ...form, pembahasan: e.target.value })}
          className="w-full rounded border px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
          >
            {editId ? "Simpan" : "Tambah"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm(emptyForm);
              }}
              className="rounded-lg border px-4 py-2 text-sm"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left dark:bg-slate-800">
            <tr>
              <th className="px-3 py-2">Subtes</th>
              <th className="px-3 py-2">Tipe</th>
              <th className="px-3 py-2">Soal</th>
              <th className="px-3 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 50).map((q) => (
              <tr key={q.id} className="border-t border-slate-100 dark:border-slate-700">
                <td className="px-3 py-2">{q.subtestKode}</td>
                <td className="px-3 py-2">{q.tipe}</td>
                <td className="max-w-md truncate px-3 py-2">{q.teks}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => {
                      setEditId(q.id);
                      setForm({
                        subtestId: subtests.find((s) => s.kode === q.subtestKode)?.id ?? "",
                        subkategori: q.subkategori ?? "",
                        teks: q.teks,
                        tipe: q.tipe,
                        arahTeks: q.arahTeks,
                        tingkat: q.tingkat,
                        pembahasan: q.pembahasan ?? "",
                        gambarUrl: q.gambarUrl ?? "",
                        opsi: emptyForm.opsi,
                      });
                    }}
                    className="mr-2 text-emerald-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button onClick={() => hapus(q.id)} className="text-red-600 hover:underline">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 50 && (
          <p className="p-3 text-xs text-slate-500">Menampilkan 50 dari {filtered.length} soal.</p>
        )}
      </div>
    </div>
  );
}
