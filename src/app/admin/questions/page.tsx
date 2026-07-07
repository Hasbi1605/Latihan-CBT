"use client";

import { useCallback, useEffect, useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { ConfirmDialog } from "@/components/ui/Dialog";
import { Input, Label, Select, Textarea } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/StatCard";

type Subtest = { id: string; kode: string; nama: string };
type Question = {
  id: string;
  subtestId: string;
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
  opsi: Array<{ teks: string; benar: boolean }>;
};

const PAGE_SIZE = 25;

const defaultOpsi = () => [
  { teks: "", benar: true },
  { teks: "", benar: false },
  { teks: "", benar: false },
  { teks: "", benar: false },
];

const emptyForm = {
  subtestId: "",
  subkategori: "",
  teks: "",
  tipe: "PG",
  arahTeks: "LTR",
  tingkat: "SEDANG",
  pembahasan: "",
  gambarUrl: "",
  opsi: defaultOpsi(),
};

function normalizeOpsi(opsi: Array<{ teks: string; benar: boolean }>) {
  const filled = opsi.filter((o) => o.teks.trim());
  const base = filled.length > 0 ? filled : defaultOpsi();
  while (base.length < 4) base.push({ teks: "", benar: false });
  if (!base.some((o) => o.benar)) base[0] = { ...base[0], benar: true };
  return base.slice(0, 5);
}

export default function AdminQuestionsPage() {
  const [subtests, setSubtests] = useState<Subtest[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/questions");
      if (!res.ok) throw new Error("Gagal memuat data.");
      const data = await res.json();
      setSubtests(data.subtests ?? []);
      setQuestions(data.questions ?? []);
    } catch {
      setError("Gagal memuat bank soal. Muat ulang halaman.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = questions.filter((q) => {
    if (filter && q.subtestKode !== filter) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      return (
        q.teks.toLowerCase().includes(s) ||
        (q.subkategori ?? "").toLowerCase().includes(s) ||
        q.subtestKode.toLowerCase().includes(s)
      );
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);
  const pageItems = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setError(null);
    setSaving(true);
    try {
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
        setError(d.error || "Gagal menyimpan.");
        return;
      }
      setForm(emptyForm);
      setEditId(null);
      setMsg(editId ? "Soal diperbarui." : "Soal ditambahkan.");
      load();
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  }

  async function hapus() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/questions/${deleteId}`, { method: "DELETE" });
      setMsg("Soal dihapus.");
      setDeleteId(null);
      if (editId === deleteId) {
        setEditId(null);
        setForm(emptyForm);
      }
      load();
    } catch {
      setError("Gagal menghapus soal.");
    } finally {
      setDeleting(false);
    }
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
    try {
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
    } catch {
      setError("File JSON tidak valid.");
    }
    e.target.value = "";
  }

  function startEdit(q: Question) {
    setEditId(q.id);
    setForm({
      subtestId: q.subtestId,
      subkategori: q.subkategori ?? "",
      teks: q.teks,
      tipe: q.tipe,
      arahTeks: q.arahTeks,
      tingkat: q.tingkat,
      pembahasan: q.pembahasan ?? "",
      gambarUrl: q.gambarUrl ?? "",
      opsi: normalizeOpsi(q.opsi),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Konten"
        title="Bank Soal"
        description="Kelola soal per subtes, import/export JSON, dan opsi jawaban."
      />

      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(0);
          }}
          className="w-auto min-w-[10rem]"
        >
          <option value="">Semua subtes</option>
          {subtests.map((s) => (
            <option key={s.id} value={s.kode}>
              {s.kode} — {s.nama}
            </option>
          ))}
        </Select>
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          placeholder="Cari soal…"
          className="max-w-xs"
        />
        <Button variant="secondary" size="sm" onClick={exportJson}>
          Export JSON
        </Button>
        <label className="inline-flex h-8 cursor-pointer items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--muted)]">
          Import JSON
          <input type="file" accept=".json" className="hidden" onChange={importJson} />
        </label>
        <span className="text-sm text-[var(--muted-foreground)]">
          {filtered.length} soal
        </span>
      </div>

      {msg && <Alert tone="success">{msg}</Alert>}
      {error && <Alert tone="error">{error}</Alert>}

      <Card>
        <CardBody>
          <form onSubmit={submit} className="space-y-4">
            <h2 className="font-semibold">{editId ? "Edit Soal" : "Tambah Soal"}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label htmlFor="subtest">Subtes</Label>
                <Select
                  id="subtest"
                  required
                  value={form.subtestId}
                  onChange={(e) => setForm({ ...form, subtestId: e.target.value })}
                >
                  <option value="">Pilih subtes</option>
                  {subtests.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.kode}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="tipe">Tipe</Label>
                <Select
                  id="tipe"
                  value={form.tipe}
                  onChange={(e) => setForm({ ...form, tipe: e.target.value })}
                >
                  <option value="PG">Pilihan Ganda</option>
                  <option value="REKAMAN">Rekaman (BTQ)</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="arah">Arah teks</Label>
                <Select
                  id="arah"
                  value={form.arahTeks}
                  onChange={(e) => setForm({ ...form, arahTeks: e.target.value })}
                >
                  <option value="LTR">Kiri ke kanan (LTR)</option>
                  <option value="RTL">Kanan ke kiri (RTL / Arab)</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="tingkat">Tingkat</Label>
                <Select
                  id="tingkat"
                  value={form.tingkat}
                  onChange={(e) => setForm({ ...form, tingkat: e.target.value })}
                >
                  <option value="MUDAH">Mudah</option>
                  <option value="SEDANG">Sedang</option>
                  <option value="SULIT">Sulit</option>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="subkategori">Subkategori</Label>
              <Input
                id="subkategori"
                value={form.subkategori}
                onChange={(e) => setForm({ ...form, subkategori: e.target.value })}
                placeholder="Contoh: Penalaran, Nahwu, dll."
              />
            </div>
            <div>
              <Label htmlFor="teks">Teks soal</Label>
              <Textarea
                id="teks"
                required
                rows={3}
                value={form.teks}
                onChange={(e) => setForm({ ...form, teks: e.target.value })}
                dir={form.arahTeks === "RTL" ? "rtl" : "ltr"}
                className={form.arahTeks === "RTL" ? "arabic" : undefined}
              />
            </div>
            {form.tipe === "PG" &&
              form.opsi.map((o, i) => (
                <div key={i} className="flex flex-wrap items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <Label htmlFor={`opsi-${i}`}>Opsi {String.fromCharCode(65 + i)}</Label>
                    <Input
                      id={`opsi-${i}`}
                      value={o.teks}
                      onChange={(e) => {
                        const opsi = [...form.opsi];
                        opsi[i] = { ...opsi[i], teks: e.target.value };
                        setForm({ ...form, opsi });
                      }}
                    />
                  </div>
                  <label className="mt-6 flex shrink-0 items-center gap-2 text-sm font-medium">
                    <input
                      type="radio"
                      name="benar"
                      checked={o.benar}
                      onChange={() => {
                        const opsi = form.opsi.map((x, j) => ({ ...x, benar: j === i }));
                        setForm({ ...form, opsi });
                      }}
                      className="accent-[var(--primary)]"
                    />
                    Benar
                  </label>
                </div>
              ))}
            <div>
              <Label htmlFor="pembahasan">Pembahasan (opsional)</Label>
              <Textarea
                id="pembahasan"
                rows={2}
                value={form.pembahasan}
                onChange={(e) => setForm({ ...form, pembahasan: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="gambar">URL gambar (opsional)</Label>
              <Input
                id="gambar"
                value={form.gambarUrl}
                onChange={(e) => setForm({ ...form, gambarUrl: e.target.value })}
                placeholder="https://…"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Menyimpan…" : editId ? "Simpan Perubahan" : "Tambah Soal"}
              </Button>
              {editId && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setEditId(null);
                    setForm(emptyForm);
                  }}
                >
                  Batal
                </Button>
              )}
            </div>
          </form>
        </CardBody>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--muted)] text-left text-[var(--muted-foreground)]">
              <tr>
                <th className="px-4 py-3 font-medium">Subtes</th>
                <th className="px-4 py-3 font-medium">Tipe</th>
                <th className="px-4 py-3 font-medium">Soal</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[var(--muted-foreground)]">
                    Memuat soal…
                  </td>
                </tr>
              ) : pageItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[var(--muted-foreground)]">
                    Tidak ada soal.
                  </td>
                </tr>
              ) : (
                pageItems.map((q) => (
                  <tr key={q.id} className="hover:bg-[var(--muted)]/50">
                    <td className="px-4 py-3">{q.subtestKode}</td>
                    <td className="px-4 py-3">{q.tipe}</td>
                    <td className="max-w-md px-4 py-3" title={q.teks}>
                      <span
                        className="line-clamp-2"
                        dir={q.arahTeks === "RTL" ? "rtl" : "ltr"}
                      >
                        {q.teks}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => startEdit(q)}>
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => setDeleteId(q.id)}>
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-3 text-sm">
            <span className="text-[var(--muted-foreground)]">
              Halaman {safePage + 1} dari {totalPages} ({filtered.length} soal)
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={safePage === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              >
                Sebelumnya
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={safePage >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                Berikutnya
              </Button>
            </div>
          </div>
        )}
      </Card>

      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={hapus}
        title="Hapus soal?"
        description="Soal yang dihapus tidak dapat dikembalikan."
        confirmLabel="Ya, hapus"
        loading={deleting}
      />
    </div>
  );
}
