import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import PrintButton from "@/components/PrintButton";
import { Card, CardBody } from "@/components/ui/Card";

export default async function KartuUjianPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <AppHeader nama={user.nama} nomorPeserta={user.nomorPeserta} role={user.role} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-8">
        <div className="no-print mb-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-[var(--primary)] hover:underline"
          >
            ← Dashboard
          </Link>
          <PrintButton />
        </div>

        <Card className="border-2 shadow-[var(--shadow-card-hover)]">
          <CardBody className="p-8">
            <div className="border-b-2 border-[var(--border)] pb-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                Kartu Peserta Ujian
              </p>
              <h1 className="mt-1 text-lg font-bold">
                SPMB Mandiri UIN Siber Syekh Nurjati Cirebon
              </h1>
              <p className="text-sm text-[var(--muted-foreground)]">
                Simulasi CBT — Tahun 2026
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-[8rem_1fr] gap-2 text-sm">
                <span className="font-medium text-[var(--muted-foreground)]">Nama</span>
                <span className="font-semibold">{user.nama}</span>
                <span className="font-medium text-[var(--muted-foreground)]">Nomor Peserta</span>
                <span className="font-mono font-semibold">{user.nomorPeserta}</span>
                <span className="font-medium text-[var(--muted-foreground)]">Program Studi</span>
                <span>Akuntansi Syariah (FEBI)</span>
                <span className="font-medium text-[var(--muted-foreground)]">Tanggal</span>
                <span>{today}</span>
              </div>

              <div className="rounded-lg bg-[var(--muted)] p-4">
                <p className="text-sm font-semibold">Mata Ujian (Replika 2026)</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--muted-foreground)]">
                  <li>Tes Potensi Akademik (TPA)</li>
                  <li>Kebahasaan</li>
                  <li>Keislaman</li>
                </ol>
              </div>

              <div className="rounded-lg border border-dashed border-[var(--border)] p-4 text-center">
                <p className="text-xs text-[var(--muted-foreground)]">
                  Area Tanda Tangan Peserta
                </p>
                <div className="mt-8 border-t border-[var(--border)] pt-2 text-sm">
                  {user.nama}
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-[var(--muted-foreground)]">
              Dokumen simulasi latihan — bukan kartu resmi SPMB UIN SSC
            </p>
          </CardBody>
        </Card>

        <p className="no-print mt-4 text-sm text-[var(--muted-foreground)]">
          Gunakan tombol cetak di atas untuk menyimpan sebagai PDF. Kartu ini hanya untuk
          simulasi pengalaman ujian.
        </p>
      </main>
    </>
  );
}
