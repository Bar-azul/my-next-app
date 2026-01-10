"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
    [
      "text-sm transition hover:opacity-70",
      pathname === href ? "font-semibold" : "",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold"
          onClick={() => setOpen(false)}
        >
          Bar Azul
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link className={linkClass("/#about")} href="/#about">
            About
          </Link>
          <Link className={linkClass("/projects")} href="/projects">
            Projects
          </Link>
          <Link className={linkClass("/contact")} href="/contact">
            Contact
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            className="hidden sm:inline text-sm hover:opacity-70"
            href="https://github.com/Bar-azul"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            className="hidden sm:inline rounded-md border border-black/20 px-3 py-1 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            href="/cv.pdf"
          >
            CV
          </a>

          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-md border border-black/20 p-2 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-black/10 dark:border-white/10">
          <nav className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-4">
            <Link
              href="/#about"
              className="text-sm"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-sm"
              onClick={() => setOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="text-sm"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>

            <div className="pt-3 flex items-center gap-3">
              <a
                className="text-sm hover:opacity-70"
                href="https://github.com/Bar-azul"
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
              >
                GitHub
              </a>
              <a
                className="rounded-md border border-black/20 px-3 py-1 text-sm hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
                href="/cv.pdf"
                onClick={() => setOpen(false)}
              >
                CV
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
