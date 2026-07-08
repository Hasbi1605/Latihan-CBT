"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mic,
  Square,
  Star,
} from "lucide-react";
import { ExamPrefsToolbar } from "@/components/PreferencesProvider";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { cn } from "@/lib/cn";

type Opt = { id: string; label: string; teks: string };
type Question = {
  answerId: string;
  questionId: string;
  urutan: number;
  tipe: string;
  subkategori: string | null;
  teks: string;
  arahTeks: string;
  gambarUrl: string | null;
  options: Opt[];
  pilihanOptionId: string | null;
  ragu: boolean;
  audioUrl: string | null;
  hasRecording: boolean;
};
type ActiveSection = {
  sectionId: string;
  kode: string;
  nama: string;
  urutan: number;
  totalSections: number;
  durasiDetik: number;
  serverNowMs: number;
  deadlineMs: number;
  questions: Question[];
};
type State = {
  attemptId: string;
  status: string;
  finished: boolean;
  packageNama: string;
  tabSwitchCount: number;
  active: ActiveSection | null;
};

const ARABIC_RE = /[\u0600-\u06FF]/;
const isArabic = (s: string) => ARABIC_RE.test(s);

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function isAnswered(q: Question) {
  if (q.tipe === "REKAMAN") return q.hasRecording;
  return Boolean(q.pilihanOptionId);
}

function RecordingPanel({
  attemptId,
  question,
  onUploaded,
}: {
  attemptId: string;
  question: Question;
  onUploaded: (audioUrl: string) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function mulaiRekam() {
    setErr(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setUploading(true);
        const form = new FormData();
        form.append("answerId", question.answerId);
        form.append("audio", blob, "recording.webm");
        const res = await fetch(`/api/attempts/${attemptId}/recording`, {
          method: "POST",
          body: form,
        });
        setUploading(false);
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          setErr(d.error || "Gagal mengunggah rekaman.");
          return;
        }
        const d = await res.json();
        onUploaded(d.audioUrl);
      };
      mediaRef.current = rec;
      rec.start();
      setRecording(true);
    } catch {
      setErr("Mikrofon tidak tersedia. Pastikan izin mikrofon diberikan.");
    }
  }

  function stopRekam() {
    mediaRef.current?.stop();
    setRecording(false);
  }

  return (
    <div className="mt-6 space-y-3 rounded-xl border border-[var(--primary-border)] bg-[var(--primary-soft)] p-4">
      <p className="text-sm font-semibold text-[var(--foreground)]">
        Soal Bacaan — Rekam suara bacaan Al-Qur&apos;an
      </p>
      {question.audioUrl && (
        <div>
          <p className="mb-1 text-xs text-[var(--muted-foreground)]">Rekaman tersimpan:</p>
          <audio controls src={question.audioUrl} className="w-full" />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {!recording ? (
          <Button size="sm" onClick={mulaiRekam} disabled={uploading}>
            <Mic className="h-4 w-4" />
            {question.hasRecording ? "Rekam Ulang" : "Mulai Rekam"}
          </Button>
        ) : (
          <Button size="sm" variant="danger" onClick={stopRekam}>
            <Square className="h-4 w-4" />
            Stop & Unggah
          </Button>
        )}
        {uploading && (
          <span className="text-sm text-[var(--muted-foreground)]">Mengunggah…</span>
        )}
      </div>
      {err && <p className="text-sm text-[var(--danger)]">{err}</p>}
    </div>
  );
}

function navCellClass(x: Question, isCur: boolean) {
  if (x.ragu) {
    return cn(
      "border-2 border-[var(--warning-border)] bg-[var(--warning-soft)] text-[var(--warning)]",
      isCur && "ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--card)]",
    );
  }
  if (isAnswered(x)) {
    return cn(
      "border-2 border-[var(--success-border)] bg-[var(--success-soft)] text-[var(--success)]",
      isCur && "ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--card)]",
    );
  }
  return cn(
    "border border-[var(--exam-option-border)] bg-[var(--exam-option)] text-[var(--foreground)]",
    isCur && "ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--card)]",
  );
}

export default function ExamRunner({ attemptId }: { attemptId: string }) {
  const router = useRouter();
  const [state, setState] = useState<State | null>(null);
  const [idx, setIdx] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [showConfirm, setShowConfirm] = useState(false);
  const [transisi, setTransisi] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timingRef = useRef<{
    deadlineMs: number;
    serverNowMs: number;
    clientRecvMs: number;
  } | null>(null);
  const submittingRef = useRef(false);

  const loadState = useCallback(async () => {
    const res = await fetch(`/api/attempts/${attemptId}/state`, {
      cache: "no-store",
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || "Gagal memuat ujian.");
      return;
    }
    const data: State = await res.json();
    if (data.finished || !data.active) {
      router.replace(`/hasil/${attemptId}`);
      return;
    }
    timingRef.current = {
      deadlineMs: data.active.deadlineMs,
      serverNowMs: data.active.serverNowMs,
      clientRecvMs: Date.now(),
    };
    submittingRef.current = false;
    setState(data);
    setIdx(0);
    setTransisi(false);
  }, [attemptId, router]);

  useEffect(() => {
    loadState();
  }, [loadState]);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!state?.active) return;
    function logBlur() {
      fetch(`/api/attempts/${attemptId}/tab-blur`, { method: "POST" }).catch(() => {});
    }
    function onVis() {
      if (document.visibilityState === "hidden") logBlur();
    }
    window.addEventListener("blur", logBlur);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("blur", logBlur);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [attemptId, state?.active]);

  const remaining = (() => {
    const tm = timingRef.current;
    if (!tm) return 0;
    const estServerNow = tm.serverNowMs + (now - tm.clientRecvMs);
    return Math.max(0, Math.ceil((tm.deadlineMs - estServerNow) / 1000));
  })();

  const submitSection = useCallback(
    async (sectionId: string) => {
      if (submittingRef.current) return;
      submittingRef.current = true;
      setTransisi(true);
      try {
        await fetch(`/api/attempts/${attemptId}/submit-section`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sectionId }),
        });
      } catch {
        /* diabaikan */
      }
      await loadState();
    },
    [attemptId, loadState],
  );

  useEffect(() => {
    if (!state?.active) return;
    if (remaining <= 0 && !submittingRef.current) {
      submitSection(state.active.sectionId);
    }
  }, [remaining, state, submitSection]);

  async function pilihJawaban(q: Question, optionId: string | null) {
    if (!state?.active) return;
    setState((prev) => {
      if (!prev?.active) return prev;
      const questions = prev.active.questions.map((x) =>
        x.answerId === q.answerId ? { ...x, pilihanOptionId: optionId } : x,
      );
      return { ...prev, active: { ...prev.active, questions } };
    });
    const res = await fetch(`/api/attempts/${attemptId}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answerId: q.answerId, optionId }),
    });
    if (res.status === 409) {
      submitSection(state.active.sectionId);
    }
  }

  async function toggleRagu(q: Question) {
    if (!state?.active) return;
    const nilai = !q.ragu;
    setState((prev) => {
      if (!prev?.active) return prev;
      const questions = prev.active.questions.map((x) =>
        x.answerId === q.answerId ? { ...x, ragu: nilai } : x,
      );
      return { ...prev, active: { ...prev.active, questions } };
    });
    await fetch(`/api/attempts/${attemptId}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answerId: q.answerId,
        optionId: q.pilihanOptionId,
        ragu: nilai,
      }),
    });
  }

  function onRecordingUploaded(answerId: string, audioUrl: string) {
    setState((prev) => {
      if (!prev?.active) return prev;
      const questions = prev.active.questions.map((x) =>
        x.answerId === answerId ? { ...x, audioUrl, hasRecording: true } : x,
      );
      return { ...prev, active: { ...prev.active, questions } };
    });
  }

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center shadow-[var(--shadow-card)]">
          <p className="text-[var(--danger)]">{error}</p>
          <Button className="mt-4" onClick={() => router.replace("/dashboard")}>
            Kembali ke Dashboard
          </Button>
        </div>
      </main>
    );
  }

  if (!state?.active || transisi) {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-[var(--muted-foreground)]">
          {transisi ? "Menyimpan & memuat subtes berikutnya…" : "Memuat ujian…"}
        </p>
      </main>
    );
  }

  const active = state.active;
  const q = active.questions[idx];
  const terjawab = active.questions.filter(isAnswered).length;
  const raguCount = active.questions.filter((x) => x.ragu).length;
  const low = remaining <= 60;

  return (
    <main className="flex flex-1 flex-col bg-[var(--background)] text-[var(--foreground)]">
      <div className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--card)]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-xs text-[var(--muted-foreground)]">{state.packageNama}</p>
            <p className="truncate font-semibold text-[var(--foreground)]">
              Subtes {active.urutan}/{active.totalSections}: {active.nama}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ExamPrefsToolbar />
            <div
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-lg font-bold tabular-nums",
                low
                  ? "bg-[var(--danger-soft)] text-[var(--danger)]"
                  : "bg-[var(--primary-soft)] text-[var(--primary)]",
              )}
              aria-live="polite"
            >
              <Clock className="h-5 w-5" aria-hidden />
              {fmt(remaining)}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_18rem]">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-[var(--card-foreground)] shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-[var(--muted)] px-3 py-1 text-sm font-semibold text-[var(--foreground)]">
              Soal {q.urutan} / {active.questions.length}
              {q.tipe === "REKAMAN" && " · Rekaman"}
            </span>
            {q.subkategori && (
              <span className="text-xs font-medium text-[var(--muted-foreground)]">
                {q.subkategori}
              </span>
            )}
          </div>

          <div
            className={cn(
              "exam-text mt-5 whitespace-pre-line leading-relaxed",
              q.arahTeks === "RTL" || isArabic(q.teks) ? "arabic" : "",
            )}
            dir={q.arahTeks === "RTL" || isArabic(q.teks) ? "rtl" : "ltr"}
          >
            {q.teks}
          </div>

          {q.gambarUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={q.gambarUrl}
              alt="Ilustrasi soal"
              className="mt-4 max-h-64 rounded-xl border border-[var(--border)]"
            />
          )}

          {q.tipe === "REKAMAN" ? (
            <RecordingPanel
              attemptId={attemptId}
              question={q}
              onUploaded={(url) => onRecordingUploaded(q.answerId, url)}
            />
          ) : (
            <div className="mt-6 space-y-2.5">
              {q.options.map((o) => {
                const selected = q.pilihanOptionId === o.id;
                const ar = isArabic(o.teks);
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => pilihJawaban(q, selected ? null : o.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition",
                      selected
                        ? "border-[var(--success-border)] bg-[var(--success-soft)] ring-2 ring-[var(--success-border)]/40"
                        : "border-[var(--exam-option-border)] bg-[var(--exam-option)] text-[var(--foreground)] hover:border-[var(--primary-border)] hover:bg-[var(--exam-option-hover)]",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                        selected
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                          : "bg-[var(--muted)] text-[var(--muted-foreground)]",
                      )}
                    >
                      {o.label}
                    </span>
                    <span
                      className={cn("text-[var(--foreground)]", ar && "arabic")}
                      dir={ar ? "rtl" : "ltr"}
                    >
                      {o.teks}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-5">
            {q.tipe !== "REKAMAN" && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toggleRagu(q)}
                className={cn(
                  q.ragu &&
                    "border-[var(--warning-border)] bg-[var(--warning-soft)] text-[var(--warning)]",
                )}
              >
                <Star className={cn("h-4 w-4", q.ragu && "fill-current")} />
                {q.ragu ? "Ditandai ragu-ragu" : "Tandai ragu-ragu"}
              </Button>
            )}
            <div className="ml-auto flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
                disabled={idx === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                Sebelumnya
              </Button>
              <Button
                size="sm"
                onClick={() => setIdx((i) => Math.min(active.questions.length - 1, i + 1))}
                disabled={idx === active.questions.length - 1}
              >
                Selanjutnya
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-[var(--card-foreground)] shadow-[var(--shadow-card)] lg:sticky lg:top-20 lg:self-start">
          <h3 className="text-sm font-semibold text-[var(--foreground)]">Navigasi Soal</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded border-2 border-[var(--success-border)] bg-[var(--success-soft)]" />
              Terjawab
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded border-2 border-[var(--warning-border)] bg-[var(--warning-soft)]" />
              Ragu
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded border border-[var(--exam-option-border)] bg-[var(--exam-option)]" />
              Kosong
            </span>
          </div>

          <div className="mt-4 grid grid-cols-6 gap-2 lg:grid-cols-5">
            {active.questions.map((x, i) => {
              const isCur = i === idx;
              return (
                <button
                  key={x.answerId}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={cn(
                    "h-9 rounded-lg text-sm font-bold tabular-nums transition",
                    navCellClass(x, isCur),
                  )}
                >
                  {x.urutan}
                </button>
              );
            })}
          </div>

          <div className="mt-4 space-y-1 text-sm text-[var(--muted-foreground)]">
            <p>
              Terjawab:{" "}
              <strong className="text-[var(--foreground)]">
                {terjawab}/{active.questions.length}
              </strong>
            </p>
            {raguCount > 0 && (
              <p className="text-[var(--warning)]">Ragu-ragu: {raguCount}</p>
            )}
            {state.tabSwitchCount > 0 && (
              <p className="flex items-center gap-1 text-[var(--warning)]">
                <AlertTriangle className="h-3.5 w-3.5" />
                Tab blur: {state.tabSwitchCount}×
              </p>
            )}
          </div>

          <Button className="mt-5 w-full" onClick={() => setShowConfirm(true)}>
            {active.urutan === active.totalSections
              ? "Selesaikan Ujian"
              : "Selesai & Lanjut Subtes"}
          </Button>
        </aside>
      </div>

      <Dialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        title={`Akhiri subtes ${active.nama}?`}
        description={`Kamu sudah menjawab ${terjawab} dari ${active.questions.length} soal.${
          terjawab < active.questions.length
            ? ` Masih ada ${active.questions.length - terjawab} soal kosong.`
            : ""
        }${raguCount > 0 ? ` Masih ada ${raguCount} soal ditandai ragu-ragu.` : ""} Subtes yang telah diselesaikan tidak dapat dibuka kembali.`}
      >
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Batal
          </Button>
          <Button
            onClick={() => {
              setShowConfirm(false);
              submitSection(active.sectionId);
            }}
          >
            Ya, Akhiri
          </Button>
        </div>
      </Dialog>
    </main>
  );
}
