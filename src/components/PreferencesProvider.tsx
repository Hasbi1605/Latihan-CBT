"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type FontSize = "sm" | "md" | "lg";

type Prefs = {
  darkMode: boolean;
  fontSize: FontSize;
  setDarkMode: (v: boolean) => void;
  setFontSize: (v: FontSize) => void;
};

const Ctx = createContext<Prefs | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkModeState] = useState(false);
  const [fontSize, setFontSizeState] = useState<FontSize>("md");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const dm = localStorage.getItem("cbt-dark") === "1";
    const fs = (localStorage.getItem("cbt-font") as FontSize) || "md";
    setDarkModeState(dm);
    setFontSizeState(fs);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("dark", darkMode);
    document.documentElement.dataset.fontSize = fontSize;
    localStorage.setItem("cbt-dark", darkMode ? "1" : "0");
    localStorage.setItem("cbt-font", fontSize);
  }, [darkMode, fontSize, ready]);

  const setDarkMode = (v: boolean) => setDarkModeState(v);
  const setFontSize = (v: FontSize) => setFontSizeState(v);

  return (
    <Ctx.Provider value={{ darkMode, fontSize, setDarkMode, setFontSize }}>
      {children}
    </Ctx.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePreferences must be inside PreferencesProvider");
  return ctx;
}

export function ExamPrefsToolbar() {
  const { darkMode, fontSize, setDarkMode, setFontSize } = usePreferences();
  return (
    <div className="flex items-center gap-2 text-xs">
      <button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        className="rounded border border-slate-300 px-2 py-1 dark:border-slate-600 dark:text-slate-200"
      >
        {darkMode ? "☀ Terang" : "🌙 Gelap"}
      </button>
      <select
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value as FontSize)}
        className="rounded border border-slate-300 px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
      >
        <option value="sm">Font kecil</option>
        <option value="md">Font normal</option>
        <option value="lg">Font besar</option>
      </select>
    </div>
  );
}
