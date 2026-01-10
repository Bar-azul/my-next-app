"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // מונע hydration warning
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 rounded border px-3 py-1 text-sm transition
                 border-black/20 hover:border-black/40
                 dark:border-white/20 dark:hover:border-white/40"
      aria-label="Toggle theme"
    >
      <span className="text-lg">
        {isDark ? "☀️" : "🌙"}
      </span>
      <span>
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
}
