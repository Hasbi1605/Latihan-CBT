"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  X,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonSizes, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { StudyCard, StudyDeck } from "@/lib/study";

const ARABIC_RE = /[\u0600-\u06FF]/;
const isArabic = (s: string) => ARABIC_RE.test(s);

type Mark = "known" | "unknown" | null;

function tingkatTone(tingkat: string): "success" | "warning" | "danger" | "default" {
  if (tingkat === "MUDAH") return "success";
  if (tingkat === "SEDANG") return "warning";
  if (tingkat === "SULIT") return "danger";
  return "default";
}

export default function StudySessionClient({
  initialDeck,
  initialCards,
  subtestId,
  subkategori,
  limit,
  nama,
}: {
  initialDeck: StudyDeck;
  initialCards: StudyCard[];
  subtestId: string;
  subkategori: string | null;
  limit: number;
  nama: string;
}) {
  const [deck, setDeck] = useState(initialDeck);
  const [cards, setCards] = useState(initialCards);
  const [sessionCards, setSessionCards] = useState(initialCards);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [marks, setMarks] = useState<Record<string, Mark>>({});
  const [fullscreen, setFullscreen] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isReviewPass, setIsReviewPass] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        subtestId,
        limit: String(limit || 20),
      });
      if (subkategori) params.set("subkategori", subkategori);
      const res = await fetch(`/api/study/cards?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memuat kartu.");
      setDeck(data.deck);
      setCards(data.cards ?? []);
      setSessionCards(data.cards ?? []);
      setFinished(false);
      setIsReviewPass(false);
      setIndex(0);
      setFlipped(false);
      setShowExplain(false);
      setMarks({});
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat kartu.");
    } finally {
      setLoading(false);
    }
  }, [subtestId, subkategori, limit]);

  const card = sessionCards[index] ?? null;
  const knownCount = useMemo(
    () => Object.values(marks).filter((m) => m === "known").length,
    [marks],
  );
  const unknownCount = useMemo(
    () => Object.values(marks).filter((m) => m === "unknown").length,
    [marks],
  );

  const go = useCallback(
    (dir: -1 | 1) => {
      setFlipped(false);
      setShowExplain(false);
      setIndex((i) => {
        const next = i + dir;
        if (next < 0) return 0;
        if (next >= sessionCards.length) return i;
        return next;
      });
    },
    [sessionCards.length],
  );

  const markCurrent = useCallback(
    (value: "known" | "unknown") => {
      if (!card) return;
      setMarks((prev) => ({ ...prev, [card.id]: value }));
      setFlipped(false);
      setShowExplain(false);
      if (index >= sessionCards.length - 1) {
        setFinished(true);
        return;
      }
      setIndex((i) => i + 1);
    },
    [card, index, sessionCards.length],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (loading || finished || !card) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "1") {
        e.preventDefault();
        markCurrent("unknown");
      } else if (e.key === "2") {
        e.preventDefault();
        markCurrent("known");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [loading, finished, card, go, markCurrent]);

  function ulangUnknown() {
    const unknown = cards.filter((c) => marks[c.id] === "unknown");
    if (unknown.length === 0) return;
    const nextMarks: Record<string, Mark> = {};
    for (const c of unknown) nextMarks[c.id] = null;
    setSessionCards(unknown);
    setMarks(nextMarks);
    setIsReviewPass(true);
    setIndex(0);
    setFlipped(false);
    setShowExplain(false);
    setFinished(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--muted-foreground)]">
        Menyiapkan kartu…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--background)] px-4">
        <p className="text-[var(--danger)]">{error}</p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={reload}>
            Coba lagi
          </Button>
          <Link href="/belajar" className={cn(buttonVariants.secondary, buttonSizes.md, "rounded-xl")}>
            Kembali
          </Link>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--background)] px-4">
        <p className="text-[var(--muted-foreground)]">Tidak ada kartu untuk filter ini.</p>
        <Link href="/belajar" className={cn(buttonVariants.secondary, buttonSizes.md, "rounded-xl")}>
          Pilih deck lain
        </Link>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-10">
        <div className="w-full max-w-lg rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-center shadow-[var(--shadow-card)]">
          <p className="text-sm font-medium text-[var(--primary)]">Sesi selesai</p>
          <h1 className="mt-2 text-2xl font-bold">{deck.nama}</h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Bagus, {nama.split(" ")[0]}! Ringkasan sesi belajarmu:
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[var(--success-soft)] px-4 py-5">
              <p className="text-3xl font-bold text-[var(--success)]">{knownCount}</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">Sudah paham</p>
            </div>
            <div className="rounded-2xl bg-[var(--danger-soft)] px-4 py-5">
              <p className="text-3xl font-bold text-[var(--danger)]">{unknownCount}</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">Perlu diulang</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            {unknownCount > 0 && (
              <Button onClick={ulangUnknown}>
                <RotateCcw className="h-4 w-4" />
                Ulangi yang belum
              </Button>
            )}
            <Button variant="secondary" onClick={reload}>
              Sesi baru
            </Button>
            <Link
              href="/belajar"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition",
                buttonVariants.ghost,
                buttonSizes.md,
              )}
            >
              Ganti deck
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!card) return null;

  const rtl = card.arahTeks === "RTL" || isArabic(card.teks);
  const correct = card.opsi.filter((o) => o.benar);

  return (
    <div
      className={cn(
        "study-session flex min-h-screen flex-col bg-[var(--background)]",
        fullscreen && "fixed inset-0 z-50",
      )}
    >
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="min-w-0">
          <p className="text-xs text-[var(--muted-foreground)]">
            Mode Belajar {isReviewPass ? "· Ulangan" : ""}
          </p>
          <h1 className="truncate text-lg font-bold sm:text-xl">{deck.nama}</h1>
          {subkategori && (
            <p className="truncate text-sm text-[var(--muted-foreground)]">{subkategori}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setFullscreen((f) => !f)}
            className="rounded-full border border-[var(--border)] bg-[var(--card)] p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            aria-label={fullscreen ? "Keluar layar penuh" : "Layar penuh"}
          >
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <Link
            href="/belajar"
            className="rounded-full border border-[var(--border)] bg-[var(--card)] p-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            aria-label="Tutup sesi"
          >
            <X className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-8 sm:px-6">
        <div className="study-glow relative flex flex-1 flex-col justify-center">
          <button
            type="button"
            key={card.id}
            onClick={() => setFlipped((f) => !f)}
            className={cn(
              "study-card group relative w-full min-h-[22rem] rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 text-left shadow-[var(--shadow-card)] transition duration-300 sm:min-h-[26rem] sm:p-8",
              "hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
              flipped && "study-card-flipped",
            )}
            aria-label={flipped ? "Sembunyikan jawaban" : "Lihat jawaban"}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-[var(--muted-foreground)]">
                {index + 1}/{sessionCards.length}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {card.subkategori && <Badge>{card.subkategori}</Badge>}
                <Badge tone={tingkatTone(card.tingkat)}>{card.tingkat}</Badge>
              </div>
            </div>

            {!flipped ? (
              <div className="mt-8 flex flex-1 flex-col">
                <div
                  className={cn(
                    "exam-text whitespace-pre-line text-xl font-semibold leading-relaxed sm:text-2xl",
                    rtl && "arabic",
                  )}
                  dir={rtl ? "rtl" : "ltr"}
                >
                  {card.teks}
                </div>
                {card.gambarUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={card.gambarUrl}
                    alt="Gambar soal"
                    className="mt-6 max-h-48 w-auto self-center rounded-xl border border-[var(--border)]"
                  />
                )}
                <p className="mt-auto pt-10 text-center text-sm text-[var(--muted-foreground)] transition group-hover:text-[var(--foreground)]">
                  Ketuk untuk lihat jawaban
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                    Jawaban
                  </p>
                  <div className="mt-2 space-y-2">
                    {correct.map((o) => {
                      const ar = isArabic(o.teks);
                      return (
                        <div
                          key={o.label}
                          className="rounded-2xl border border-[var(--success-border)] bg-[var(--success-soft)] px-4 py-3"
                        >
                          <p
                            className={cn(
                              "text-lg font-semibold text-[var(--foreground)] sm:text-xl",
                              ar && "arabic",
                            )}
                            dir={ar ? "rtl" : "ltr"}
                          >
                            {o.teks}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {card.pembahasan && (
                  <div className="rounded-2xl bg-[var(--muted)] px-4 py-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    <span className="font-semibold text-[var(--foreground)]">Pembahasan: </span>
                    {showExplain
                      ? card.pembahasan
                      : card.pembahasan.length > 180
                        ? `${card.pembahasan.slice(0, 180)}…`
                        : card.pembahasan}
                  </div>
                )}
              </div>
            )}
          </button>

          {flipped && card.pembahasan && card.pembahasan.length > 180 && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setShowExplain((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--muted)]"
              >
                <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
                {showExplain ? "Ringkas" : "Jelaskan"}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--primary)] shadow-sm transition hover:bg-[var(--muted)] disabled:opacity-40"
            aria-label="Kartu sebelumnya"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => markCurrent("unknown")}
            className="inline-flex h-12 min-w-[4.5rem] items-center justify-center gap-2 rounded-full border border-[var(--danger-border)] bg-[var(--danger-soft)] px-4 font-bold text-[var(--danger)] shadow-sm transition hover:brightness-95"
            aria-label="Belum paham"
          >
            <XCircle className="h-5 w-5" />
            {unknownCount}
          </button>

          <button
            type="button"
            onClick={() => markCurrent("known")}
            className="inline-flex h-12 min-w-[4.5rem] items-center justify-center gap-2 rounded-full border border-[var(--success-border)] bg-[var(--success-soft)] px-4 font-bold text-[var(--success)] shadow-sm transition hover:brightness-95"
            aria-label="Sudah paham"
          >
            <Check className="h-5 w-5" />
            {knownCount}
          </button>

          <button
            type="button"
            onClick={() => {
              if (index >= sessionCards.length - 1) {
                setFinished(true);
                return;
              }
              go(1);
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--primary)] shadow-sm transition hover:bg-[var(--muted)]"
            aria-label="Kartu berikutnya"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-[var(--muted-foreground)]">
          Spasi: balik kartu · ← → navigasi · 1 belum paham · 2 sudah paham
        </p>
      </main>
    </div>
  );
}
