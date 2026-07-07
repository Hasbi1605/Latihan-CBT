"use client";

import { useCallback, useEffect, useState } from "react";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/StatCard";

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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/packages");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPackages(data.packages ?? []);
      setSubtests(data.subtests ?? []);
    } catch {
      setError("Gagal memuat paket ujian.");
    } finally {
      setLoading(false);
    }
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
    setCreating(true);
    try {
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
      } else {
        setError("Gagal membuat paket.");
      }
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Konfigurasi"
        title="Paket Ujian"
        description="Kelola paket simulasi, token akses, dan status aktif."
      />

      {msg && <Alert tone="success">{msg}</Alert>}
      {error && <Alert tone="error">{error}</Alert>}

      <Button onClick={buatPaketDemo} disabled={creating || subtests.length < 3}>
        {creating ? "Membuat…" : "+ Buat Paket Latihan Cepat"}
      </Button>

      {loading ? (
        <p className="text-[var(--muted-foreground)]">Memuat paket…</p>
      ) : packages.length === 0 ? (
        <Card>
          <CardBody className="py-10 text-center text-[var(--muted-foreground)]">
            Belum ada paket ujian.
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {packages.map((pkg) => (
            <Card key={pkg.id}>
              <CardBody>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{pkg.nama}</h3>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                      Mode: {pkg.mode} · Token:{" "}
                      <span className="font-mono font-semibold text-[var(--foreground)]">
                        {pkg.token}
                      </span>{" "}
                      · {pkg._count.attempts} percobaan
                    </p>
                    {pkg.deskripsi && (
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                        {pkg.deskripsi}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleAktif(pkg)}
                    className="shrink-0"
                  >
                    <Badge tone={pkg.aktif ? "success" : "default"}>
                      {pkg.aktif ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </button>
                </div>
                <ul className="mt-4 space-y-2">
                  {pkg.sections.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between rounded-lg bg-[var(--muted)] px-3 py-2 text-sm"
                    >
                      <span>
                        {s.urutan}. {s.subtest.nama}
                      </span>
                      <span className="text-[var(--muted-foreground)]">
                        {s.jumlahSoal} soal · {Math.round(s.durasiDetik / 60)} menit
                      </span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
