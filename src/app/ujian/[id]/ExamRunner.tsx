"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ExamPrefsToolbar } from "@/components/PreferencesProvider";

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
    <div className="mt-6 space-y-3 rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-950/30">
      <p className="text-sm font-semibold text-violet-800 dark:text-violet-200">
        Soal Bacaan — Rekam suara bacaan Al-Qur&apos;an
      </p>
      {question.audioUrl && (
        <div>
          <p className="mb-1 text-xs text-slate-500">Rekaman tersimpan:</p>
          <audio controls src={question.audioUrl} className="w-full" />
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {!recording ? (
          <button
            type="button"
            onClick={mulaiRekam}
            disabled={uploading}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
          >
            {question.hasRecording ? "Rekam Ulang" : "🎙 Mulai Rekam"}
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRekam}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            ⏹ Stop & Unggah
          </button>
        )}
        {uploading && <span className="text-sm text-slate-500">Mengunggah…</span>}
      </div>
      {err && <p className="text-sm text-red-600 dark:text-red-400">{err}</p>}
    </div>
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

  // Deteksi tab blur / pindah jendela
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
        <div className="rounded-xl bg-white p-6 text-center shadow ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={() => router.replace("/dashboard")}
            className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </main>
    );
  }

  if (!state?.active || transisi) {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-slate-500">
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
    <main className="flex flex-1 flex-col">
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {state.packageNama}
            </p>
            <p className="truncate font-semibold text-slate-800 dark:text-slate-100">
              Subtes {active.urutan} dari {active.totalSections}: {active.nama}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ExamPrefsToolbar />
            <div
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-lg font-bold ${
                low
                  ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
              }`}
              aria-live="polite"
            >
              <span aria-hidden>⏱</span>
              {fmt(remaining)}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_20rem]">
        <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              Soal {q.urutan} / {active.questions.length}
              {q.tipe === "REKAMAN" && " · Rekaman"}
            </span>
            {q.subkategori && (
              <span className="text-xs text-slate-400">{q.subkategori}</span>
            )}
          </div>

          <div
            className={`exam-text mt-4 whitespace-pre-line leading-relaxed text-slate-900 dark:text-slate-100 ${
              q.arahTeks === "RTL" || isArabic(q.teks) ? "arabic" : ""
            }`}
            dir={q.arahTeks === "RTL" || isArabic(q.teks) ? "rtl" : "ltr"}
          >
            {q.teks}
          </div>

          {q.gambarUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={q.gambarUrl}
              alt="Ilustrasi soal"
              className="mt-4 max-h-64 rounded-lg border border-slate-200 dark:border-slate-600"
            />
          )}

          {q.tipe === "REKAMAN" ? (
            <RecordingPanel
              attemptId={attemptId}
              question={q}
              onUploaded={(url) => onRecordingUploaded(q.answerId, url)}
            />
          ) : (
            <div className="mt-6 space-y-3">
              {q.options.map((o) => {
                const selected = q.pilihanOptionId === o.id;
                const ar = isArabic(o.teks);
                return (
                  <button
                    key={o.id}
                    onClick={() => pilihJawaban(q, selected ? null : o.id)}
                    className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                      selected
                        ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200 dark:bg-emerald-950/30 dark:ring-emerald-800"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        selected
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {o.label}
                    </span>
                    <span className={ar ? "arabic" : ""} dir={ar ? "rtl" : "ltr"}>
                      {o.teks}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
            {q.tipe !== "REKAMAN" && (
              <button
                onClick={() => toggleRagu(q)}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  q.ragu
                    ? "border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-950/30"
                    : "border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {q.ragu ? "★ Ditandai ragu-ragu" : "☆ Tandai ragu-ragu"}
              </button>
            )}
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
                disabled={idx === 0}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                ← Sebelumnya
              </button>
              <button
                onClick={() =>
                  setIdx((i) => Math.min(active.questions.length - 1, i + 1))
                }
                disabled={idx === active.questions.length - 1}
                className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-900 disabled:opacity-40 dark:bg-slate-600"
              >
                Selanjutnya →
              </button>
            </div>
          </div>
        </section>

        <aside className="rounded-xl border border-slate-200 bg-white p-5 lg:sticky lg:top-20 lg:self-start dark:border-slate-700 dark:bg-slate-800">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Navigasi Soal
          </h3>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded bg-emerald-500" /> Terjawab
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded bg-amber-400" /> Ragu
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-3 w-3 rounded border border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900" />{" "}
              Kosong
            </span>
          </div>

          <div className="mt-4 grid grid-cols-6 gap-2 lg:grid-cols-5">
            {active.questions.map((x, i) => {
              const isCur = i === idx;
              let cls = "border border-slate-300 bg-white text-slate-600 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300";
              if (x.ragu) cls = "bg-amber-400 text-white border-amber-400";
              else if (isAnswered(x))
                cls = "bg-emerald-500 text-white border-emerald-500";
              return (
                <button
                  key={x.answerId}
                  onClick={() => setIdx(i)}
                  className={`h-9 rounded text-sm font-semibold transition ${cls} ${
                    isCur ? "ring-2 ring-slate-800 ring-offset-1 dark:ring-slate-300" : ""
                  }`}
                >
                  {x.urutan}
                </button>
              );
            })}
          </div>

          <div className="mt-4 space-y-1 text-sm text-slate-500">
            <p>
              Terjawab:{" "}
              <strong className="text-slate-700 dark:text-slate-200">
                {terjawab}/{active.questions.length}
              </strong>
            </p>
            {raguCount > 0 && <p className="text-amber-600">Ragu-ragu: {raguCount}</p>}
            {state.tabSwitchCount > 0 && (
              <p className="text-amber-600">⚠ Tab blur: {state.tabSwitchCount}×</p>
            )}
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            className="mt-5 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {active.urutan === active.totalSections
              ? "Selesaikan Ujian"
              : "Selesai & Lanjut Subtes"}
          </button>
        </aside>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Akhiri subtes {active.nama}?
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Kamu sudah menjawab <strong>{terjawab}</strong> dari{" "}
              <strong>{active.questions.length}</strong> soal.
              {terjawab < active.questions.length && (
                <> Masih ada {active.questions.length - terjawab} soal kosong.</>
              )}
              {raguCount > 0 && <> Masih ada {raguCount} soal ditandai ragu-ragu.</>}
              <br />
              <span className="mt-2 block text-slate-500">
                Subtes yang telah diselesaikan tidak dapat dibuka kembali.
              </span>
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  submitSection(active.sectionId);
                }}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Ya, Akhiri
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
