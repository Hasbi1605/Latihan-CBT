"use client";

import { Moon, Sun } from "lucide-react";
import { usePreferences } from "./PreferencesProvider";
import { Button } from "./ui/Button";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { darkMode, setDarkMode } = usePreferences();
  return (
    <Button
      type="button"
      variant="secondary"
      size={compact ? "sm" : "md"}
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? "Mode terang" : "Mode gelap"}
      className="!px-2.5"
    >
      {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {!compact && <span className="hidden sm:inline">{darkMode ? "Terang" : "Gelap"}</span>}
    </Button>
  );
}
