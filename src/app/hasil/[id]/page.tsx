import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { ExamError, getResult } from "@/lib/exam";

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
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
        <p className="text-sm text-slate-500 dark:text-slate-400">Hasil Simulasi</p>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {result.packageNama}
        </h1>

        {result.tabSwitchCount > 0 && (
          <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
            ⚠ Terdeteksi {result.tabSwitchCount} kali pindah tab/jendela selama ujian.
          </p>
        )}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Nilai Total (PG)
          </p>
          <p className={`mt-1 text-6xl font-bold ${lulusWarna}`}>{result.nilaiTotal}</p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Menjawab benar <strong>{result.totalBenar}</strong> dari{" "}
            <strong>{result.totalSoal}</strong> soal pilihan ganda
          </p>
        </div>

        <h2 className="mt-8 mb-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
          Rincian per Subtes
        </h2>
        <div className="space-y-3">
          {result.sections.map((s) => (
            <div
              key={s.kode}
              className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {s.nama}
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {s.benar}/{s.total} · {s.nilai}%
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${s.nilai}%` }}
                />
              </div>
              <div className="mt-2 flex gap-4 text-xs text-slate-500">
                <span className="text-emerald-600 dark:text-emerald-400">
                  Benar: {s.benar}
                </span>
                <span className="text-red-500">Salah: {s.salah}</span>
                <span>Kosong: {s.kosong}</span>
              </div>
            </div>
          ))}
        </div>

        {result.btqRecordings.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-lg font-semibold text-slate-800 dark:text-slate-200">
              Rekaman BTQ
            </h2>
            <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
              Nilai BTQ dinilai manual oleh penguji (tidak masuk skor PG otomatis).
            </p>
            <div className="space-y-3">
              {result.btqRecordings.map((r) => (
                <div
                  key={r.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
                >
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {r.subkategori}
                  </p>
                  <p className="text-sm text-slate-500">{r.teks}…</p>
                  {r.audioUrl && (
                    <audio controls src={r.audioUrl} className="mt-2 w-full max-w-md" />
                  )}
                  <p className="mt-2 text-sm">
                    {r.dinilai ? (
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        Nilai penguji: {r.nilaiManual}
                      </span>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400">
                        Menunggu penilaian admin
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/hasil/${id}/review`}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Lihat Pembahasan
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </main>
    </>
  );
}
