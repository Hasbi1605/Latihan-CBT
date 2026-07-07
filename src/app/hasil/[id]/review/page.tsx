import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { ExamError, getReview } from "@/lib/exam";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/StatCard";

const ARABIC_RE = /[\u0600-\u06FF]/;
const isArabic = (s: string) => ARABIC_RE.test(s);

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const { id } = await params;

  let review;
  try {
    review = await getReview(id, user.userId);
  } catch (e) {
    if (e instanceof ExamError) redirect("/dashboard");
    throw e;
  }

  return (
    <>
      <AppHeader nama={user.nama} nomorPeserta={user.nomorPeserta} role={user.role} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <PageHeader
          eyebrow="Pembahasan"
          title={review.packageNama}
          action={
            <Link href={`/hasil/${id}`}>
              <Button variant="secondary" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Hasil
              </Button>
            </Link>
          }
        />

        {review.sections.map((sec) => (
          <section key={sec.kode} className="mt-8">
            <h2 className="mb-3 border-b border-[var(--border)] pb-2 text-lg font-bold">
              {sec.nama}
            </h2>
            <div className="space-y-4">
              {sec.soal.map((s) => (
                <Card key={s.urutan}>
                  <CardBody>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">
                      Soal {s.urutan}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        s.tipe === "REKAMAN"
                          ? s.dijawab
                            ? "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"
                            : "bg-slate-100 text-slate-500"
                          : !s.dijawab
                            ? "bg-slate-100 text-slate-500"
                            : s.dijawabBenar
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                      }`}
                    >
                      {s.tipe === "REKAMAN"
                        ? s.dijawab
                          ? s.nilaiManual !== null
                            ? `Nilai BTQ: ${s.nilaiManual}`
                            : "Rekaman terkirim"
                          : "Belum direkam"
                        : !s.dijawab
                          ? "Tidak dijawab"
                          : s.dijawabBenar
                            ? "Benar"
                            : "Salah"}
                    </span>
                  </div>

                  <div
                    className={`mt-2 whitespace-pre-line text-slate-900 ${
                      s.arahTeks === "RTL" || isArabic(s.teks) ? "arabic" : ""
                    }`}
                    dir={s.arahTeks === "RTL" || isArabic(s.teks) ? "rtl" : "ltr"}
                  >
                    {s.teks}
                  </div>

                  <div className="mt-3 space-y-2">
                    {s.tipe === "REKAMAN" ? (
                      s.audioUrl ? (
                        <audio controls src={s.audioUrl} className="w-full max-w-md" />
                      ) : (
                        <p className="text-sm text-slate-500">Tidak ada rekaman.</p>
                      )
                    ) : (
                      s.options.map((o) => {
                      const ar = isArabic(o.teks);
                      let cls = "border-slate-200 bg-white text-slate-700";
                      if (o.benar)
                        cls = "border-emerald-400 bg-emerald-50 text-emerald-800";
                      else if (o.dipilih && !o.benar)
                        cls = "border-red-400 bg-red-50 text-red-800";
                      return (
                        <div
                          key={o.id}
                          className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm ${cls}`}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/70 text-xs font-bold">
                            {o.label}
                          </span>
                          <span className={ar ? "arabic" : ""} dir={ar ? "rtl" : "ltr"}>
                            {o.teks}
                          </span>
                          {o.benar && (
                            <span className="ml-auto text-xs font-semibold text-emerald-600">
                              Kunci
                            </span>
                          )}
                          {o.dipilih && !o.benar && (
                            <span className="ml-auto text-xs font-semibold text-red-600">
                              Jawabanmu
                            </span>
                          )}
                        </div>
                      );
                    })
                    )}
                  </div>

                  {s.pembahasan && (
                    <div className="mt-3 rounded-xl bg-[var(--muted)] p-3 text-sm text-[var(--muted-foreground)]">
                      <span className="font-semibold text-[var(--foreground)]">
                        Pembahasan:{" "}
                      </span>
                      {s.pembahasan}
                    </div>
                  )}
                  </CardBody>
                </Card>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-8">
          <Link href="/dashboard">
            <Button variant="secondary">Kembali ke Dashboard</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
