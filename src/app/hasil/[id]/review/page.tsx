import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { ExamError, getReview } from "@/lib/exam";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonSizes, buttonVariants } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/StatCard";
import { cn } from "@/lib/cn";

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
            <Link
              href={`/hasil/${id}`}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition",
                buttonVariants.secondary,
                buttonSizes.sm,
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Hasil
            </Link>
          }
        />

        {review.sections.map((sec) => (
          <section key={sec.kode} className="mt-8">
            <h2 className="mb-3 border-b border-[var(--border)] pb-2 text-lg font-bold text-[var(--foreground)]">
              {sec.nama}
            </h2>
            <div className="space-y-4">
              {sec.soal.map((s) => (
                <Card key={s.urutan}>
                  <CardBody>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[var(--foreground)]">
                        Soal {s.urutan}
                      </span>
                      <Badge
                        tone={
                          s.tipe === "REKAMAN"
                            ? s.dijawab
                              ? "violet"
                              : "default"
                            : !s.dijawab
                              ? "default"
                              : s.dijawabBenar
                                ? "success"
                                : "danger"
                        }
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
                      </Badge>
                    </div>

                    <div
                      className={cn(
                        "exam-text mt-3 whitespace-pre-line",
                        (s.arahTeks === "RTL" || isArabic(s.teks)) && "arabic",
                      )}
                      dir={s.arahTeks === "RTL" || isArabic(s.teks) ? "rtl" : "ltr"}
                    >
                      {s.teks}
                    </div>

                    <div className="mt-4 space-y-2">
                      {s.tipe === "REKAMAN" ? (
                        s.audioUrl ? (
                          <audio controls src={s.audioUrl} className="w-full max-w-md" />
                        ) : (
                          <p className="text-sm text-[var(--muted-foreground)]">
                            Tidak ada rekaman.
                          </p>
                        )
                      ) : (
                        s.options.map((o) => {
                          const ar = isArabic(o.teks);
                          let cls =
                            "border-[var(--exam-option-border)] bg-[var(--exam-option)] text-[var(--foreground)]";
                          if (o.benar)
                            cls =
                              "border-[var(--success-border)] bg-[var(--success-soft)] text-[var(--foreground)]";
                          else if (o.dipilih && !o.benar)
                            cls =
                              "border-[var(--danger-border)] bg-[var(--danger-soft)] text-[var(--foreground)]";
                          return (
                            <div
                              key={o.id}
                              className={cn(
                                "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm",
                                cls,
                              )}
                            >
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--muted)] text-xs font-bold text-[var(--foreground)]">
                                {o.label}
                              </span>
                              <span
                                className={cn("text-[var(--foreground)]", ar && "arabic")}
                                dir={ar ? "rtl" : "ltr"}
                              >
                                {o.teks}
                              </span>
                              {o.benar && (
                                <span className="ml-auto text-xs font-semibold text-[var(--success)]">
                                  Kunci
                                </span>
                              )}
                              {o.dipilih && !o.benar && (
                                <span className="ml-auto text-xs font-semibold text-[var(--danger)]">
                                  Jawabanmu
                                </span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>

                    {s.pembahasan && (
                      <div className="mt-4 rounded-xl bg-[var(--muted)] p-3 text-sm text-[var(--muted-foreground)]">
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
