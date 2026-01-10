"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="rounded border border-white/25 px-3 py-1 text-sm opacity-70"
        aria-label="Toggle theme"
      >
        Theme
      </button>
    );
  }

  const current = theme === "system" ? systemTheme : theme;

  function cycleTheme() {
    // System -> Dark -> Light -> System
    if (theme === "system") return setTheme("dark");
    if (theme === "dark") return setTheme("light");
    return setTheme("system");
  }

  return (
    <button
      onClick={cycleTheme}
      className="rounded border border-white/25 px-3 py-1 text-sm hover:border-white/60 transition"
      aria-label="Toggle theme"
      title={`Theme: ${theme} (current: ${current})`}
    >
      {theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}
