"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Layers,
  Sparkles,
  Play,
} from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonSizes, buttonVariants } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/StatCard";
import { cn } from "@/lib/cn";
import type { StudyDeck } from "@/lib/study";

const LIMIT_OPTIONS = [10, 20, 30, 40] as const;

export default function BelajarClient({ initialDecks }: { initialDecks: StudyDeck[] }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(
    initialDecks[0]?.subtestId ?? null,
  );
  const [topic, setTopic] = useState<string>("ALL");
  const [limit, setLimit] = useState<(typeof LIMIT_OPTIONS)[number]>(20);

  const selected = useMemo(
    () => initialDecks.find((d) => d.subtestId === selectedId) ?? null,
    [initialDecks, selectedId],
  );

  const availableCount = useMemo(() => {
    if (!selected) return 0;
    if (topic === "ALL") return selected.jumlahKartu;
    return selected.subkategori.find((t) => t.nama === topic)?.jumlah ?? 0;
  }, [selected, topic]);

  function mulai() {
    if (!selected || availableCount === 0) return;
    const params = new URLSearchParams({
      subtestId: selected.subtestId,
      limit: String(Math.min(limit, availableCount)),
    });
    if (topic !== "ALL") params.set("subkategori", topic);
    router.push(`/belajar/sesi?${params.toString()}`);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/dashboard"
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition",
            buttonVariants.secondary,
            buttonSizes.sm,
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>
      </div>

      <PageHeader
        eyebrow="Mode Belajar"
        title="Kartu Tanya Jawab"
        description="Latih pemahaman tanpa timer ujian. Balik kartu, cek pembahasan, lalu tandai sudah paham atau perlu diulang."
      />

      <Alert tone="info">
        <p className="font-semibold">Belajar ≠ ujian resmi</p>
        <p className="mt-1 text-[var(--foreground)]/80">
          Mode ini menampilkan kunci dan pembahasan untuk latihan. Untuk simulasi hari H,
          gunakan paket ujian berwaktu di dashboard.
        </p>
      </Alert>

      {initialDecks.length === 0 ? (
        <Card>
          <CardBody className="py-10 text-center text-[var(--muted-foreground)]">
            Belum ada soal yang bisa dijadikan kartu.
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
              Pilih subtes
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {initialDecks.map((deck) => {
                const active = deck.subtestId === selectedId;
                return (
                  <button
                    key={deck.subtestId}
                    type="button"
                    onClick={() => {
                      setSelectedId(deck.subtestId);
                      setTopic("ALL");
                    }}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition",
                      active
                        ? "border-[var(--primary)] bg-[var(--primary-soft)] shadow-[var(--shadow-card)]"
                        : "border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary-border)] hover:bg-[var(--muted)]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Badge tone={active ? "success" : "default"}>{deck.kode}</Badge>
                        <p className="mt-2 font-bold text-[var(--foreground)]">{deck.nama}</p>
                      </div>
                      <Layers
                        className={cn(
                          "h-5 w-5",
                          active ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]",
                        )}
                      />
                    </div>
                    <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                      {deck.jumlahKartu} kartu siap dipelajari
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--primary)]" />
                <h2 className="font-bold">Atur sesi</h2>
              </div>
            </CardHeader>
            <CardBody className="space-y-5">
              {selected ? (
                <>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                      Deck
                    </p>
                    <p className="mt-1 font-semibold">{selected.nama}</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                      Topik
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                    >
                      <option value="ALL">Semua topik ({selected.jumlahKartu})</option>
                      {selected.subkategori.map((t) => (
                        <option key={t.nama} value={t.nama}>
                          {t.nama} ({t.jumlah})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                      Jumlah kartu
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {LIMIT_OPTIONS.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setLimit(n)}
                          className={cn(
                            "rounded-xl px-3 py-1.5 text-sm font-semibold transition",
                            limit === n
                              ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                              : "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--border)]",
                          )}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-[var(--muted-foreground)]">
                      Tersedia {availableCount} kartu untuk filter ini.
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={mulai}
                    disabled={availableCount === 0}
                  >
                    <Play className="h-4 w-4" />
                    Mulai belajar
                  </Button>
                </>
              ) : (
                <p className="text-sm text-[var(--muted-foreground)]">
                  Pilih subtes di sebelah kiri untuk memulai.
                </p>
              )}
            </CardBody>
          </Card>
        </div>
      )}

      <Card>
        <CardBody className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <BookOpen className="mt-0.5 h-5 w-5 text-[var(--primary)]" />
            <div>
              <p className="font-semibold">Tips sesi kartu</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Baca soal dulu, tebak jawaban di kepala, baru balik kartu. Tandai ✕ jika belum
                yakin — kamu bisa mengulang hanya kartu itu di akhir sesi.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
