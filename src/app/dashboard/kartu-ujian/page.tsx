import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import PrintButton from "@/components/PrintButton";

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
            className="text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            ← Dashboard
          </Link>
          <PrintButton />
        </div>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-8 shadow-lg dark:border-slate-600 dark:bg-slate-800">
          <div className="border-b-2 border-slate-200 pb-4 text-center dark:border-slate-600">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Kartu Peserta Ujian
            </p>
            <h1 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              SPMB Mandiri UIN Siber Syekh Nurjati Cirebon
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Simulasi CBT — Tahun 2026</p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-[8rem_1fr] gap-2 text-sm">
              <span className="font-medium text-slate-500">Nama</span>
              <span className="font-semibold text-slate-900 dark:text-white">{user.nama}</span>
              <span className="font-medium text-slate-500">Nomor Peserta</span>
              <span className="font-mono font-semibold">{user.nomorPeserta}</span>
              <span className="font-medium text-slate-500">Program Studi</span>
              <span>Akuntansi Syariah (FEBI)</span>
              <span className="font-medium text-slate-500">Tanggal</span>
              <span>{today}</span>
            </div>

            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Mata Ujian (Replika 2026)
              </p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
                <li>Tes Potensi Akademik (TPA)</li>
                <li>Kebahasaan</li>
                <li>Keislaman</li>
              </ol>
            </div>

            <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center dark:border-slate-600">
              <p className="text-xs text-slate-500">Area Tanda Tangan Peserta</p>
              <div className="mt-8 border-t border-slate-300 pt-2 text-sm dark:border-slate-600">
                {user.nama}
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Dokumen simulasi latihan — bukan kartu resmi SPMB UIN SSC
          </p>
        </div>

        <p className="no-print mt-4 text-sm text-slate-500">
          Gunakan tombol cetak di atas untuk menyimpan sebagai PDF. Kartu ini hanya untuk
          simulasi pengalaman ujian.
        </p>
      </main>
    </>
  );
}
