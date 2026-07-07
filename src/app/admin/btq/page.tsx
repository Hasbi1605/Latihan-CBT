"use client";

import { useCallback, useEffect, useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/StatCard";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/recordings");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRecordings(data.recordings ?? []);
    } catch {
      setError("Gagal memuat rekaman BTQ.");
    } finally {
      setLoading(false);
    }
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
    setSavingId(r.id);
    try {
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
    } catch {
      setError("Gagal menyimpan nilai.");
    } finally {
      setSavingId(null);
    }
  }

  const pending = recordings.filter((r) => !r.dinilai);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Penilaian"
        title="Penilaian BTQ"
        description="Dengarkan rekaman peserta dan beri skor rubrik kelancaran, tajwid, makhraj."
      />

      {error && <Alert tone="error">{error}</Alert>}

      <p className="text-sm text-[var(--muted-foreground)]">
        {pending.length} rekaman menunggu penilaian · {recordings.length} total
      </p>

      {loading ? (
        <p className="text-[var(--muted-foreground)]">Memuat rekaman…</p>
      ) : recordings.length === 0 ? (
        <Card>
          <CardBody className="py-10 text-center text-[var(--muted-foreground)]">
            Belum ada rekaman BTQ.
          </CardBody>
        </Card>
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
            const teksPreview =
              r.teks.length > 120 ? `${r.teks.slice(0, 120)}…` : r.teks;
            return (
              <Card key={r.id}>
                <CardBody>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{r.peserta}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {r.packageNama} · {r.subkategori}
                      </p>
                      <p className="mt-1 text-sm">{teksPreview}</p>
                    </div>
                    {r.dinilai ? (
                      <Badge tone="success">Nilai: {r.nilaiManual}</Badge>
                    ) : (
                      <Badge tone="warning">Menunggu</Badge>
                    )}
                  </div>

                  {r.audioUrl && (
                    <audio controls src={r.audioUrl} className="mt-3 w-full max-w-md" />
                  )}

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {(["k", "t", "m"] as const).map((key, i) => (
                      <div key={key}>
                        <Label htmlFor={`${r.id}-${key}`}>
                          {["Kelancaran", "Tajwid", "Makhraj"][i]} (1–5)
                        </Label>
                        <Input
                          id={`${r.id}-${key}`}
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
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Label htmlFor={`${r.id}-catatan`}>Catatan penguji</Label>
                    <Textarea
                      id={`${r.id}-catatan`}
                      rows={2}
                      value={d.catatan}
                      onChange={(e) =>
                        setDraft({ ...draft, [r.id]: { ...d, catatan: e.target.value } })
                      }
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-sm text-[var(--muted-foreground)]">
                      Preview nilai: {preview}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => simpanNilai(r)}
                      disabled={savingId === r.id}
                    >
                      {savingId === r.id ? "Menyimpan…" : "Simpan Nilai"}
                    </Button>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
