"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  CreditCard,
  History,
  Layers,
  Play,
  Sparkles,
  SquareStack,
} from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonSizes, buttonVariants } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Dialog } from "@/components/ui/Dialog";
import { Input, Label } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/StatCard";
import { SegmentedControl } from "@/components/PreferencesProvider";
import { cn } from "@/lib/cn";

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
  packageMode: string;
  status: string;
  mulaiAt: string;
  selesaiAt: string | null;
  skorTotal: number | null;
  tabSwitchCount: number;
};

function modeLabel(mode: string) {
  if (mode === "REPLIKA_2026") return "Replika 2026";
  if (mode === "LATIHAN_INTENSIF") return "Intensif";
  if (mode === "LATIHAN_LENGKAP") return "Latihan + BTQ";
  return mode;
}

function modeBadgeTone(mode: string): "success" | "violet" | "default" | "warning" {
  if (mode === "REPLIKA_2026") return "success";
  if (mode === "LATIHAN_INTENSIF") return "warning";
  if (mode === "LATIHAN_LENGKAP") return "violet";
  return "default";
}

function tokenHint(mode: string) {
  if (mode === "LATIHAN_LENGKAP") return "LATIHANBTQ";
  if (mode === "LATIHAN_INTENSIF") return "INTENSIF";
  return "UINSSC2026";
}

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
  const [modeFilter, setModeFilter] = useState<
    "ALL" | "REPLIKA_2026" | "LATIHAN_INTENSIF" | "LATIHAN_LENGKAP"
  >("ALL");

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

  const visible =
    modeFilter === "ALL" ? packages : packages.filter((p) => p.mode === modeFilter);
  const selesai = attempts.filter((a) => a.status === "SELESAI").length;

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
      <Card className="overflow-hidden">
        <div className="hero-gradient px-6 py-6 text-white sm:px-8 sm:py-7">
          <p className="text-sm font-medium text-emerald-100">Assalamualaikum</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{nama}</h1>
          <p className="mt-2 max-w-xl text-sm text-emerald-50/90">
            Siap berlatih hari ini? Pilih paket simulasi, masukkan token, dan rasakan
            pengalaman ujian seperti hari H.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/belajar"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition",
                buttonVariants.secondary,
                buttonSizes.sm,
                "!border-white/20 !bg-white/10 !text-white hover:!bg-white/20",
              )}
            >
              <SquareStack className="h-4 w-4" />
              Mode Belajar
            </Link>
            <Link
              href="/dashboard/kartu-ujian"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition",
                buttonVariants.secondary,
                buttonSizes.sm,
                "!border-white/20 !bg-white/10 !text-white hover:!bg-white/20",
              )}
            >
              <CreditCard className="h-4 w-4" />
              Kartu Ujian
            </Link>
          </div>
        </div>
        <CardBody className="grid gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl bg-[var(--muted)] px-4 py-3">
            <Layers className="h-5 w-5 text-[var(--primary)]" />
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Paket tersedia</p>
              <p className="font-bold">{packages.length}</p>
            </div>
          </div>
            <div className="flex items-center gap-3 rounded-xl bg-[var(--muted)] px-4 py-3">
            <History className="h-5 w-5 text-[var(--primary)]" />
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Percobaan selesai</p>
              <p className="font-bold">{selesai}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-[var(--muted)] px-4 py-3">
            <Sparkles className="h-5 w-5 text-[var(--primary)]" />
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Mode BTQ</p>
              <p className="font-bold">Opsional</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Alert tone="info">
        <p className="font-semibold">Soal latihan — bukan soal resmi SPMB</p>
        <p className="mt-1 text-[var(--foreground)]/80">
          Bank soal dikurasi bergaya UM-PTKIN untuk latihan. Bukan soal resmi SPMB UIN Siber
          Cirebon. Setiap percobaan mengacak subset dari bank (~100 soal per subtes).
        </p>
      </Alert>

      <Card hover className="overflow-hidden">
        <CardBody className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
              <SquareStack className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold">Mode Belajar — Kartu Tanya Jawab</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Latih soal tanpa timer. Balik kartu, baca pembahasan, tandai yang sudah paham.
              </p>
            </div>
          </div>
          <Link
            href="/belajar"
            className={cn(
              "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold transition",
              buttonVariants.primary,
              buttonSizes.md,
            )}
          >
            <Play className="h-4 w-4" />
            Mulai belajar
          </Link>
        </CardBody>
      </Card>

      <section>
        <PageHeader
          eyebrow="Simulasi"
          title="Paket Ujian"
          description="Filter berdasarkan mode latihan yang kamu butuhkan."
          action={
            <SegmentedControl
              value={modeFilter}
              onChange={setModeFilter}
              options={[
                { value: "ALL", label: "Semua" },
                { value: "REPLIKA_2026", label: "Replika" },
                { value: "LATIHAN_INTENSIF", label: "Intensif" },
                { value: "LATIHAN_LENGKAP", label: "Lengkap+BTQ" },
              ]}
            />
          }
        />

        {loading ? (
          <p className="text-[var(--muted-foreground)]">Memuat paket…</p>
        ) : visible.length === 0 ? (
          <Card>
            <CardBody className="py-10 text-center text-[var(--muted-foreground)]">
              Belum ada paket ujian.
            </CardBody>
          </Card>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {visible.map((pkg) => (
              <Card key={pkg.id} hover className="flex flex-col">
                <CardHeader className="flex items-start justify-between gap-2 !py-4">
                  <div>
                    <Badge tone={modeBadgeTone(pkg.mode)}>{modeLabel(pkg.mode)}</Badge>
                    <h3 className="mt-2 font-bold">{pkg.nama}</h3>
                  </div>
                  <BookOpen className="h-5 w-5 text-[var(--muted-foreground)]" />
                </CardHeader>
                <CardBody className="flex flex-1 flex-col pt-0">
                  {pkg.deskripsi && (
                    <p className="text-sm text-[var(--muted-foreground)]">{pkg.deskripsi}</p>
                  )}
                  <div className="mt-3 flex gap-4 text-sm">
                    <span className="flex items-center gap-1.5 font-medium">
                      <BookOpen className="h-4 w-4 text-[var(--primary)]" />
                      {pkg.totalSoal} soal
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="h-4 w-4 text-[var(--primary)]" />
                      {pkg.totalMenit} menit
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {pkg.sections.map((s) => (
                      <li
                        key={s.kode}
                        className="flex items-center justify-between rounded-lg bg-[var(--muted)] px-3 py-2 text-sm"
                      >
                        <span>{s.nama}</span>
                        <span className="text-[var(--muted-foreground)]">
                          {s.jumlahSoal} soal · {s.menit} menit
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-auto w-full"
                    onClick={() => {
                      setActivePkg(pkg);
                      setToken("");
                      setError(null);
                    }}
                  >
                    <Play className="h-4 w-4" />
                    Mulai Ujian
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <PageHeader eyebrow="Riwayat" title="Latihan Sebelumnya" />
        {loading ? (
          <p className="text-[var(--muted-foreground)]">Memuat riwayat…</p>
        ) : attempts.length === 0 ? (
          <Card>
            <CardBody className="py-10 text-center text-[var(--muted-foreground)]">
              Belum ada riwayat. Ayo mulai latihan pertama!
            </CardBody>
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[var(--border)] bg-[var(--muted)] text-left text-[var(--muted-foreground)]">
                  <tr>
                    <th className="px-4 py-3 font-medium">Paket</th>
                    <th className="px-4 py-3 font-medium">Mulai</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {attempts.map((a) => (
                    <tr key={a.id} className="hover:bg-[var(--muted)]/50">
                      <td className="px-4 py-3 font-medium">
                        {a.packageNama}
                        {a.tabSwitchCount > 0 && (
                          <Badge tone="warning" className="ml-2">
                            {a.tabSwitchCount}× blur
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">
                        {formatTanggal(a.mulaiAt)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone={a.status === "SELESAI" ? "success" : "warning"}>
                          {a.status === "SELESAI" ? "Selesai" : "Berlangsung"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={
                            a.status === "SELESAI" ? `/hasil/${a.id}` : `/ujian/${a.id}`
                          }
                          className={cn(
                            "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition",
                            buttonVariants.outline,
                            buttonSizes.sm,
                          )}
                        >
                          {a.status === "SELESAI" ? "Hasil" : "Lanjutkan"}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </section>

      <Dialog
        open={activePkg !== null}
        onClose={() => setActivePkg(null)}
        title={activePkg ? `Mulai: ${activePkg.nama}` : ""}
        description={
          activePkg
            ? `${activePkg.totalSoal} soal · ${activePkg.totalMenit} menit · subtes berurutan`
            : undefined
        }
      >
        {activePkg && (
          <div className="space-y-4">
            <div className="rounded-xl bg-[var(--muted)] p-3 text-sm text-[var(--muted-foreground)]">
              Setiap subtes memiliki timer sendiri. Subtes yang selesai tidak dapat dibuka
              kembali.
            </div>
            <div>
              <Label htmlFor="token">Token Ujian</Label>
              <Input
                id="token"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Masukkan token"
                className="uppercase tracking-wider"
              />
              <p className="mt-1.5 text-xs text-[var(--muted-foreground)]">
                Demo:{" "}
                <span className="font-mono font-semibold">
                  {tokenHint(activePkg.mode)}
                </span>
              </p>
            </div>
            {error && <Alert tone="error">{error}</Alert>}
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setActivePkg(null)}>
                Batal
              </Button>
              <Button onClick={mulai} disabled={starting || !token}>
                {starting ? "Memulai…" : "Mulai Sekarang"}
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
