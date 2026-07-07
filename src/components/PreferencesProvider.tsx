"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Moon, Sun, Type } from "lucide-react";
import { cn } from "@/lib/cn";

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
    <div className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1 text-xs">
      <button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 font-medium text-[var(--foreground)] hover:bg-[var(--muted)]"
      >
        {darkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        <span className="hidden sm:inline">{darkMode ? "Terang" : "Gelap"}</span>
      </button>
      <div className="flex items-center gap-1 border-l border-[var(--border)] pl-1.5">
        <Type className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value as FontSize)}
          className="rounded-lg bg-transparent py-1.5 pr-1 text-xs font-medium outline-none"
        >
          <option value="sm">Kecil</option>
          <option value="md">Normal</option>
          <option value="lg">Besar</option>
        </select>
      </div>
    </div>
  );
}

/** Toggle pill untuk filter/tab kecil */
export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Array<{ value: T; label: string }>;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-1 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1", className)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
            value === o.value
              ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
              : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
