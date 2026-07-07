import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, BookOpen, Trophy } from "lucide-react";
import { getSessionUser } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { ExamError, getResult } from "@/lib/exam";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/StatCard";

export default async function HasilPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const { id } = await params;

  let result;
  try {
    result = await getResult(id, user.userId);
  } catch (e) {
    if (e instanceof ExamError) redirect("/dashboard");
    throw e;
  }

  const lulusWarna =
    result.nilaiTotal >= 70
      ? "text-emerald-600 dark:text-emerald-400"
      : result.nilaiTotal >= 50
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";

  return (
    <>
      <AppHeader nama={user.nama} nomorPeserta={user.nomorPeserta} role={user.role} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <PageHeader
          eyebrow="Hasil Simulasi"
          title={result.packageNama}
          action={
            <Link href="/dashboard">
              <Button variant="secondary" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          }
        />

        {result.tabSwitchCount > 0 && (
          <Alert tone="warning" className="mb-4">
            Terdeteksi {result.tabSwitchCount} kali pindah tab/jendela selama ujian.
          </Alert>
        )}

        <Card className="overflow-hidden text-center">
          <div className="hero-gradient px-6 py-4 text-white">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Trophy className="h-6 w-6" />
            </div>
            <p className="mt-3 text-sm font-medium text-emerald-100">Nilai Total (PG)</p>
          </div>
          <CardBody className="py-8">
            <p className={`text-6xl font-bold tabular-nums ${lulusWarna}`}>
              {result.nilaiTotal}
            </p>
            <p className="mt-2 text-[var(--muted-foreground)]">
              Benar <strong>{result.totalBenar}</strong> dari{" "}
              <strong>{result.totalSoal}</strong> soal pilihan ganda
            </p>
          </CardBody>
        </Card>

        <h2 className="mb-3 mt-8 text-lg font-bold">Rincian per Subtes</h2>
        <div className="space-y-3">
          {result.sections.map((s) => (
            <Card key={s.kode}>
              <CardBody>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{s.nama}</span>
                  <Badge tone="success">
                    {s.benar}/{s.total} · {s.nilai}%
                  </Badge>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--muted)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    style={{ width: `${s.nilai}%` }}
                  />
                </div>
                <div className="mt-2 flex gap-4 text-xs text-[var(--muted-foreground)]">
                  <span className="text-emerald-600">Benar: {s.benar}</span>
                  <span className="text-red-500">Salah: {s.salah}</span>
                  <span>Kosong: {s.kosong}</span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {result.btqRecordings.length > 0 && (
          <section className="mt-8">
            <PageHeader
              eyebrow="BTQ"
              title="Rekaman Bacaan"
              description="Nilai BTQ dinilai manual — tidak masuk skor PG otomatis."
            />
            <div className="space-y-3">
              {result.btqRecordings.map((r) => (
                <Card key={r.id}>
                  <CardBody>
                    <Badge tone="violet">{r.subkategori}</Badge>
                    <p className="mt-2 text-sm text-[var(--muted-foreground)]">{r.teks}…</p>
                    {r.audioUrl && (
                      <audio controls src={r.audioUrl} className="mt-3 w-full max-w-md" />
                    )}
                    <p className="mt-2 text-sm font-semibold">
                      {r.dinilai ? (
                        <span className="text-[var(--primary)]">Nilai penguji: {r.nilaiManual}</span>
                      ) : (
                        <span className="text-amber-600">Menunggu penilaian admin</span>
                      )}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/hasil/${id}/review`}>
            <Button>
              <BookOpen className="h-4 w-4" />
              Lihat Pembahasan
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
