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
      ? "text-emerald-600"
      : result.nilaiTotal >= 50
        ? "text-amber-600"
        : "text-red-600";

  return (
    <>
      <AppHeader nama={user.nama} nomorPeserta={user.nomorPeserta} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
        <p className="text-sm text-slate-500">Hasil Simulasi</p>
        <h1 className="text-2xl font-bold text-slate-900">{result.packageNama}</h1>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-500">Nilai Total</p>
          <p className={`mt-1 text-6xl font-bold ${lulusWarna}`}>
            {result.nilaiTotal}
          </p>
          <p className="mt-2 text-slate-600">
            Menjawab benar <strong>{result.totalBenar}</strong> dari{" "}
            <strong>{result.totalSoal}</strong> soal
          </p>
        </div>

        <h2 className="mt-8 mb-3 text-lg font-semibold text-slate-800">
          Rincian per Subtes
        </h2>
        <div className="space-y-3">
          {result.sections.map((s) => (
            <div
              key={s.kode}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-800">{s.nama}</span>
                <span className="text-sm font-semibold text-slate-700">
                  {s.benar}/{s.total} · {s.nilai}
                </span>
              </div>
              <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${s.nilai}%` }}
                />
              </div>
              <div className="mt-2 flex gap-4 text-xs text-slate-500">
                <span className="text-emerald-600">Benar: {s.benar}</span>
                <span className="text-red-500">Salah: {s.salah}</span>
                <span>Kosong: {s.kosong}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/hasil/${id}/review`}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Lihat Pembahasan
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </main>
    </>
  );
}
